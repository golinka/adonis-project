const { Command } = require('@adonisjs/ace');

const User = use('App/Models/User');
const Role = use('App/Models/Role');
const Database = use('Database');

class CreateUser extends Command {
  static get signature() {
    return 'create:user';
  }

  static get description() {
    return 'Create a new user through the terminal';
  }

  async handle() {
    const data = {
      username: await this.ask('Enter username:'),
      email: await this.ask('Enter email:'),
      password: await this.secure('Enter password:')
    };
    const roleName = await this.choice('Select user role', ['admin', 'user'], 'user');

    const role = await Role.query()
      .where('slug', roleName)
      .firstOrFail();
    const user = await User.create(data);
    await user.roles().attach([role.id]);

    this.success(`${this.icon('success')} Success: user @${user.username} was created!`);
    Database.close();
  }
}

module.exports = CreateUser;
