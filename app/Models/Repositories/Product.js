const Product = use('App/Models/Product');
const User = use('App/Models/User');
const Field = use('App/Models/Field');

class ProductRepository {
  static async getProducts(filter) {
    const query = Product.query()
      .with('user')
      .with('type');

    if (filter.type) {
      query.with('type', typeQuery => {
        typeQuery.where('name', filter.type);
      });
    }

    if (filter.title) {
      query.where('title', 'LIKE', `%${filter.title}%`);
    }

    if (filter.author) {
      query.with('user', userQuery => {
        userQuery.where('first_name', 'LIKE', `%${filter.author}%`).orWhere('last_name', 'LIKE', `%${filter.author}%`);
      });
    }

    if (filter.price) {
      query.orderBy('price', filter.price);
    }

    if (filter.date) {
      query.orderBy('created_at', filter.date);
    }

    const { rows: products } = await query.fetch();
    return products.filter(item => item.toJSON().user).filter(item => item.toJSON().type);
  }

  static async saveProduct(request) {
    const { rows: users } = await User.all();
    const random = Math.floor(Math.random() * users.length);
    const user = users[random];

    const data = request.only(['title', 'description', 'price', 'type_id']);
    const { fields } = request.post();

    const product = await Product.create({ ...data, user_id: user.id });
    const fieldsIds = await Field.ids().where('type_id', data.type_id);

    await product.fields().attach(fieldsIds, row => {
      row.value = fields[row.field_id];
    });

    return Product.query()
      .where('id', product.id)
      .with('user')
      .with('type', typeQuery => typeQuery.with('fields', fieldQuery => fieldQuery.with('value')))
      .fetch();
  }

  static async showProduct(pid) {
    return Product.query()
      .where('id', pid)
      .with('user')
      .with('type', typeQuery => typeQuery.with('fields', fieldQuery => fieldQuery.with('value')))
      .fetch();
  }

  static async updateProduct(pid, request) {
    const data = request.only(['title', 'description', 'price', 'type_id']);
    const { fields } = request.post();

    const product = await Product.findOrFail(pid);
    const fieldsIds = await Field.ids().where('type_id', data.type_id);

    if (product.type_id !== data.type_id) {
      await product.fields().detach();
      await product.fields().attach(fieldsIds, row => {
        row.value = fields[row.field_id];
      });
    } else {
      await Promise.all(
        fields.map((value, index) =>
          product
            .fields()
            .pivotQuery()
            .where('field_id', fieldsIds[index])
            .update({ value })
        )
      );
    }

    product.merge(data);
    await product.save();

    return Product.query()
      .where('id', pid)
      .with('user')
      .with('type', typeQuery => typeQuery.with('fields', fieldQuery => fieldQuery.with('value')))
      .fetch();
  }
}

module.exports = ProductRepository;
