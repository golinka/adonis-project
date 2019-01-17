const Field = use('App/Models/Field');

class FieldController {
  async index({ params }) {
    const { tid } = params;
    return Field.getFields(tid);
  }

  async store({ params, request, response }) {
    const { tid } = params;
    response.status(201);
    return Field.saveField(tid, request.only(['name']));
  }

  async show({ params }) {
    const { fid } = params;
    return Field.findOrFail(fid);
  }

  async update({ params, request }) {
    const { fid } = params;
    return Field.updateField(fid, request.only(['name', 'type_id']));
  }

  async delete({ params, response }) {
    const { fid } = params;
    const field = await Field.findOrFail(fid);
    await field.delete();
    response.status(204).send();
  }
}

module.exports = FieldController;
