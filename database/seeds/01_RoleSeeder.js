const Role = use('App/Models/Role');

class RoleSeeder {
  async run() {
    await Role.query().delete();

    const roles = [
      { slug: 'user', name: 'User', description: 'Default user' },
      { slug: 'admin', name: 'Administrator', description: 'Has all permissions' }
    ];
    await Role.createMany(roles);
  }
}

module.exports = RoleSeeder;
