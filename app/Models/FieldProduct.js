/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class FieldProduct extends Model {
  product() {
    return this.belongsTo('App/Models/Product');
  }

  field() {
    return this.belongsTo('App/Models/Field');
  }
}

module.exports = FieldProduct;
