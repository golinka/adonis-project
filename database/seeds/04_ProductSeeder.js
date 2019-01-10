const User = use('App/Models/User');
const Type = use('App/Models/Type');
const Field = use('App/Models/Field');
const Product = use('App/Models/Product');
const Factory = use('Factory');

class ProductSeeder {
  async run() {
    await Product.query().delete();

    const { rows: types } = await Type.all();
    const { rows: users } = await User.all();

    await Promise.all(
      users.map(user => {
        const typeId = Math.floor(Math.random() * (types.length - 1));
        return Factory.model('App/Models/Product').create({
          user_id: user.id,
          type_id: types[typeId].id
        });
      })
    );

    const { rows: products } = await Product.all();
    const { rows: fields } = await Field.all();

    await Promise.all(
      products.map(product =>
        Promise.all(
          fields.filter(field => field.type_id === product.type_id).map(field =>
            Factory.model('App/Models/FieldProduct').create({
              product_id: product.id,
              field_id: field.id
            })
          )
        )
      )
    );
  }
}

module.exports = ProductSeeder;
