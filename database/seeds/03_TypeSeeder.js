const Type = use('App/Models/Type');
const Factory = use('Factory');

class TypeSeeder {
  async run() {
    await Type.query().delete();

    const types = await Factory.model('App/Models/Type').createMany(5);
    types.forEach(async type => {
      const fields = await Factory.model('App/Models/Field').createMany(3);
      await type.fields().saveMany(fields);
    });
  }
}

module.exports = TypeSeeder;
