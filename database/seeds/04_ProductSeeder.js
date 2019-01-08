const User = use('App/Models/User');
const Type = use('App/Models/Type');
const Product = use('App/Models/Product');
const Factory = use('Factory');

class ProductSeeder {
  async run() {
    await Product.query().delete();

    const { rows: types } = await Type.all();
    const { rows: users } = await User.all();
    const typesIds = types.map(type => type.id);

    users.forEach(async user => {
      const typeId = Math.floor(Math.random() * (typesIds.length - 1)) + 1;

      const product = await Factory.model('App/Models/Product').create({
        user_id: user.id,
        type_id: types[typeId].id
      });

      const { rows: fields } = await types[typeId].fields().fetch();
      fields.forEach(async field => {
        await Factory.model('App/Models/FieldProduct').create({
          field_id: field.id,
          product_id: product.id
        });
      });
    });
  }
}

module.exports = ProductSeeder;
