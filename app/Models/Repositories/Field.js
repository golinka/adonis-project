const Type = use('App/Models/Type');
const Field = use('App/Models/Field');

class FieldRepository {
  static async getFields(tid) {
    const type = await Type.findOrFail(tid);
    return type.fields().fetch();
  }

  static async saveField(tid, data) {
    const type = await Type.findOrFail(tid);
    return type.fields().create(data);
  }

  static async updateField(fid, data) {
    const field = await Field.findOrFail(fid);
    field.merge(data);
    await field.save();
    return field;
  }
}

module.exports = FieldRepository;
