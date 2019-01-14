/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static get hidden() {
    return ['password'];
  }

  products() {
    return this.hasMany('App/Models/Product');
  }
}

module.exports = User;
