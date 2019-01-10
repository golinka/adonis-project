/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  static get updatedAtColumn() {
    return null;
  }

  type() {
    return this.belongsTo('App/Models/Type');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  fields() {
    return this.belongsToMany('App/Models/Field')
      .pivotTable('field_products')
      .pivotModel('App/Models/FieldProduct');
  }
}

module.exports = Product;
