/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FieldSchema extends Schema {
  up() {
    this.create('fields', table => {
      table.increments();
      table.string('name', 30).notNullable();
      table.string('field_type', 30).notNullable();
    });

    this.create('field_type', table => {
      table.increments();
      table
        .integer('type_id')
        .unsigned()
        .index('type_id');
      table
        .integer('field_id')
        .unsigned()
        .index('field_id');
      table
        .foreign('type_id')
        .references('id')
        .on('types')
        .onDelete('cascade');
      table
        .foreign('field_id')
        .references('id')
        .on('fields')
        .onDelete('cascade');
    });
  }

  down() {
    this.drop('field_type');
    this.drop('fields');
  }
}

module.exports = FieldSchema;
