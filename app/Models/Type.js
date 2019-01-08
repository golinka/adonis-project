/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Type extends Model {
  products() {
    return this.hasMany('App/Models/Product');
  }

  fields() {
    return this.hasMany('App/Models/Field');
  }
}

module.exports = Type;
