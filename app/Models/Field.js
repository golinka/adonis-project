/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Field extends Model {
  static boot() {
    super.boot();
    this.addTrait('App/Models/Traits/Repository');
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  type() {
    return this.belongsTo('App/Models/Type');
  }

  products() {
    return this.belongsToMany('App/Models/Product')
      .pivotTable('field_product')
      .pivotModel('App/Models/FieldProduct');
  }

  value() {
    return this.hasOne('App/Models/FieldProduct');
  }
}

module.exports = Field;
