const Type = use('App/Models/Type');
const Field = use('App/Models/Field');

class FieldRepository {
  static async getFields(params) {
    const { tid } = params;

    const type = await Type.findOrFail(tid);
    const fields = await type.fields().fetch();

    return fields;
  }

  static async saveField(params, request) {
    const { tid } = params;
    const { name } = request.only(['name']);

    const type = await Type.findOrFail(tid);
    const field = new Field();
    field.name = name;
    await field.save();
    await type.fields().save(field);

    return field;
  }

  static async getField(params) {
    const { tid, fid } = params;

    const type = await Type.findOrFail(tid);
    const { rows: fields } = await type
      .fields()
      .where('id', fid)
      .fetch();

    return fields[0];
  }

  static async updateField(params, request) {
    const { tid, fid } = params;
    const data = request.only(['name', 'type_id']);

    const type = await Type.findOrFail(tid);
    const { rows: fields } = await type
      .fields()
      .where('id', fid)
      .fetch();
    const field = fields[0];

    field.merge(data);
    await field.save();

    return field;
  }

  static async deleteField(params) {
    const { tid, fid } = params;

    const type = await Type.findOrFail(tid);
    const { rows: fields } = await type
      .fields()
      .where('id', fid)
      .fetch();

    await fields[0].delete();
  }
}

module.exports = FieldRepository;
