/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FieldSchema extends Schema {
  up() {
    this.create('fields', table => {
      table.increments();
      table
        .string('name', 30)
        .unique()
        .notNullable();
      table
        .integer('type_id')
        .unsigned()
        .index('type_id');
      table
        .foreign('type_id')
        .references('id')
        .on('types')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('fields');
  }
}

module.exports = FieldSchema;
