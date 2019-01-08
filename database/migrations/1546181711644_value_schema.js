/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FieldProductSchema extends Schema {
  up() {
    this.create('field_products', table => {
      table.increments();
      table.integer('value').notNullable();
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
  }

  down() {
    this.drop('field_products');
  }
}

module.exports = FieldProductSchema;
