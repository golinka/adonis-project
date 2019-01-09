const Role = use('App/Models/Role');
const Factory = use('Factory');

class UserSeeder {
  async run() {
    const userRole = await Role.findBy('name', 'user');
    const adminRole = await Role.findBy('name', 'admin');

    await Factory.model('App/Models/User').createMany(3, { role_id: userRole.id });
    await Factory.model('App/Models/User').create({ role_id: adminRole.id });
  }
}

module.exports = UserSeeder;
