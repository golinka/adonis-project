const Role = use('App/Models/Role');
const Factory = use('Factory');

class UserSeeder {
  async run() {
    const userRole = await Role.findBy('name', 'user');
    const adminRole = await Role.findBy('name', 'admin');

    const users = await Factory.model('App/Models/User').makeMany(3);
    const admins = await Factory.model('App/Models/User').makeMany(1);
    await userRole.users().saveMany(users);
    await adminRole.users().saveMany(admins);
  }
}

module.exports = UserSeeder;
