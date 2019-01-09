const Role = use('App/Models/Role');

class RoleSeeder {
  async run() {
    await Role.query().delete();

    const roles = [{ name: 'user' }, { name: 'admin' }];
    await Role.createMany(roles);
  }
}

module.exports = RoleSeeder;
