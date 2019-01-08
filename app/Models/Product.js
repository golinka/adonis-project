/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Product extends Model {
  type() {
    return this.belongsTo('App/Models/Type');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = Product;
