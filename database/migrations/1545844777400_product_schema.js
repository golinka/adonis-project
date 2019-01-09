/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProductSchema extends Schema {
  up() {
    this.create('types', table => {
      table.increments();
      table.string('name', 30).notNullable();
    });

    this.create('products', table => {
      table.increments();
      table.string('title', 50).notNullable();
      table.string('description', 255).notNullable();
      table
        .integer('price')
        .notNullable()
        .default(0);
      table
        .integer('type_id')
        .notNullable()
        .index();
      table
        .foreign('type_id')
        .references('id')
        .on('types')
        .onDelete('cascade');
      table
        .integer('user_id')
        .notNullable()
        .index();
      table
        .foreign('user_id')
        .references('id')
        .on('users')
        .onDelete('cascade');
      table.timestamp('created_at').defaultTo(this.fn.now());
    });
  }

  down() {
    this.drop('products');
    this.drop('types');
  }
}

module.exports = ProductSchema;
