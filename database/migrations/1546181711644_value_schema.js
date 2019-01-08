/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ValueSchema extends Schema {
  up() {
    this.create('field_value', table => {
      table.increments();
      table.string('value', 255).notNullable();
      table.string('value_type', 20).notNullable();
      table
        .integer('field_id')
        .notNullable()
        .index();
      table
        .integer('product_id')
        .notNullable()
        .index();
      table
        .foreign('field_id')
        .references('id')
        .on('fields')
        .onDelete('cascade');
      table
        .foreign('product_id')
        .references('id')
        .on('products')
        .onDelete('cascade');
      table.timestamps();
    });

    this.table('field_value', table => {
      table.dropColumn('created_at');
      table.dropColumn('updated_at');
    });
  }

  down() {
    this.drop('field_value');
  }
}

module.exports = ValueSchema;
