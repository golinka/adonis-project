const Model = use('Model');

class Boot extends Model {
  static boot() {
    super.boot();
    this.addTrait('App/Models/Traits/Repository');
  }
}

module.exports = Boot;
