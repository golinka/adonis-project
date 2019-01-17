const Boot = use('./Boot');

class Product extends Boot {
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
    return this.belongsToMany('App/Models/Field').pivotModel('App/Models/FieldProduct');
  }
}

module.exports = Product;
