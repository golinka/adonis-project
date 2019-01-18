const Role = use('App/Models/Role');
const User = use('App/Models/User');
const Factory = use('Factory');

class UserSeeder {
  async run() {
    await User.query().delete();

    const userRole = await Role.findBy('slug', 'user');
    const adminRole = await Role.findBy('slug', 'admin');

    const user = await User.create({
      username: 'user123',
      email: 'user123@gmail.com',
      password: '1234567'
    });

    const admin = await User.create({
      username: 'golinka',
      email: 'artem.holinka@gmail.com',
      password: '7654321'
    });

    await user.roles().attach([userRole.id]);
    await admin.roles().attach([adminRole.id]);

    const users = await Factory.model('App/Models/User').createMany(3);
    await Promise.all(users.map(someUser => someUser.roles().attach([userRole.id])));
  }
}

module.exports = UserSeeder;
