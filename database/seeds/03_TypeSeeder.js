const Type = use('App/Models/Type');
const Factory = use('Factory');

class TypeSeeder {
  async run() {
    await Type.query().delete();

    const fieldsPromises = [];
    const types = await Factory.model('App/Models/Type').createMany(5);
    types.forEach(type => {
      fieldsPromises.push(
        Factory.model('App/Models/Field').createMany(3, {
          type_id: type.id
        })
      );
    });

    await Promise.all(fieldsPromises);
  }
}

module.exports = TypeSeeder;
