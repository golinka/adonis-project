const { Command } = require('@adonisjs/ace');

const { validateAll } = use('Validator');

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
    const rules = {
      username: 'required|unique:users|min:4|max:80',
      email: 'required|unique:users|max:255|email',
      password: 'required|min:6|max:12'
    };
    const data = {
      username: await this.ask('Enter username:'),
      email: await this.ask('Enter email:'),
      password: await this.secure('Enter password:')
    };

    const validation = await validateAll(data, rules);
    if (validation.fails()) {
      validation.messages().forEach(error => {
        this.error(`${this.icon('error')} Error: ${error.message}`);
      });
      process.exit(-1);
    }

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
