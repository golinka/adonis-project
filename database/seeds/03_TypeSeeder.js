const Type = use('App/Models/Type');
const Factory = use('Factory');

class TypeSeeder {
  async run() {
    await Type.query().delete();

    const types = await Factory.model('App/Models/Type').createMany(5);
    await Promise.all(types.map(type => {
      Factory.model('App/Models/Field').createMany(3, {
        type_id: type.id
      })
    }));
  }
}

module.exports = TypeSeeder;
