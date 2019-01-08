/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('roles', table => {
      table.increments();
      table.string('name', 20).notNullable().unique();
      table.timestamps();
    });

    this.create('users', table => {
      table.increments();
      table.string('first_name', 20).notNullable();
      table.string('last_name', 20).notNullable();
      table.string('password', 255).notNullable();
      table
        .integer('role_id')
        .notNullable()
        .index();
      table
        .foreign('role_id')
        .references('id')
        .on('roles')
        .onDelete('cascade');
        table.timestamps();
    });
  }

  down() {
    this.drop('users');
    this.drop('roles');
  }
}

module.exports = UserSchema;
