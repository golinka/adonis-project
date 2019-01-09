const User = use('App/Models/User');
const Type = use('App/Models/Type');
const Product = use('App/Models/Product');
const Factory = use('Factory');
const faker = require('chance').Chance();

class ProductSeeder {
  async run() {
    await Product.query().delete();

    const { rows: types } = await Type.all();
    const { rows: users } = await User.all();

    const fieldPromises = [];
    const creatingProducts = [];

    users.forEach(user => {
      const typeId = Math.floor(Math.random() * (types.length - 1));
      fieldPromises.push(types[typeId].fields().fetch());
      creatingProducts.push(
        Factory.model('App/Models/Product').create({
          user_id: user.id,
          type_id: types[typeId].id
        })
      );
    });

    await Promise.all(creatingProducts);

    const savingFields = [];
    const { rows: products } = await Product.all();

    const fieldsRows = await Promise.all(fieldPromises);
    fieldsRows.forEach(({ rows: fields }, index) => {
      const fieldIDs = fields.map(field => field.id);
      savingFields.push(
        products[index].fields().attach(fieldIDs, row => {
          row.value = faker.word();
        })
      );
    });

    await Promise.all(savingFields);
  }
}

module.exports = ProductSeeder;
