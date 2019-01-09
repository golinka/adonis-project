/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FieldProductSchema extends Schema {
  up() {
    this.create('field_product', table => {
      table.increments();
      table.string('value').notNullable();
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
    });
  }

  down() {
    this.drop('field_product');
  }
}

module.exports = FieldProductSchema;
