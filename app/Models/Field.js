const Boot = use('./Boot');

class Field extends Boot {
  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  type() {
    return this.belongsTo('App/Models/Type');
  }

  value() {
    return this.hasOne('App/Models/FieldProduct');
  }
}

module.exports = Field;
