const Product = use('App/Models/Product');
const User = use('App/Models/User');

class ProductRepository {
  static async getProducts(filter, sort) {
    const defaultSorting = {
      price: 'ASC',
      created_at: 'ASC'
    };
    const query = Product.query()
      .with('user')
      .with('type')
      .with('fields')
      .where(() => {
        Object.keys(filter).forEach(field => {
          this.where(field, filter[field]);
        });
      });

    if (Object.keys(sort).length) {
      Object.keys(sort).forEach(field => query.orderBy(field, sort[field]));
    } else {
      Object.keys(defaultSorting).forEach(field => query.orderBy(field, defaultSorting[field]));
    }

    return query.fetch();
  }

  static async saveProduct(data, fields) {
    const { rows: users } = await User.all();
    const random = Math.floor(Math.random() * users.length);
    const user = users[random];

    const product = await Product.create({ ...data, user_id: user.id });
    await product.fields().attach(Object.keys(fields), row => {
      row.value = fields[row.field_id];
    });

    return this.showProduct(product.id);
  }

  static async showProduct(pid) {
    return Product.query()
      .where('id', pid)
      .with('user')
      .with('type')
      .with('fields', fieldQuery => fieldQuery.with('value'))
      .firstOrFail();
  }

  static async updateProduct(pid, data, fields) {
    const product = await Product.findOrFail(pid);

    if (product.type_id !== data.type_id) {
      await product.fields().detach();
      await product.fields().attach(Object.keys(fields), row => {
        row.value = fields[row.field_id];
      });
    } else {
      await Promise.all(
        Object.keys(fields).map(id =>
          product
            .fields()
            .pivotQuery()
            .where('field_id', id)
            .update({ value: fields[id] })
        )
      );
    }

    product.merge(data);
    await product.save();

    return this.showProduct(pid);
  }
}

module.exports = ProductRepository;
