/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Hash = use('Hash');
const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get hidden() {
    return ['password'];
  }

  static get traits() {
    return ['@provider:Adonis/Acl/HasRole'];
  }

  products() {
    return this.hasMany('App/Models/Product');
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
