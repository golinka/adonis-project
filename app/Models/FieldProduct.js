/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class FieldProduct extends Model {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  fields() {
    return this.belongsToMany('App/Models/Product').withPivot(['field_id']);
  }
}

module.exports = FieldProduct;
