const Type = use('App/Models/Type');

class FieldRepository {
  static async getFields(tid) {
    const type = await Type.findOrFail(tid);
    return type.fields().fetch();
  }

  static async showField(tid, fid) {
    const type = await Type.findOrFail(tid);
    return type
      .fields()
      .where('id', fid)
      .firstOrFail();
  }

  static async saveField(tid, data) {
    const type = await Type.findOrFail(tid);
    return type.fields().create(data);
  }

  static async updateField(tid, fid, data) {
    const type = await Type.findOrFail(tid);
    const field = await type
      .fields()
      .where('id', fid)
      .firstOrFail();
    field.merge(data);
    await field.save();
    return field;
  }
}

module.exports = FieldRepository;
