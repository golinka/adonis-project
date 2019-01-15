const Field = use('App/Models/Field');

class FieldController {
  async index({ params, response }) {
    const fields = await Field.getFields(params);
    response.json(fields);
  }

  async store({ params, request, response }) {
    const field = await Field.saveField(params, request);
    response.status(201).json(field);
  }

  async show({ params, response }) {
    const field = await Field.getField(params);

    if (!field) {
      response.status(204).json(null);
    } else {
      response.json(field);
    }
  }

  async update({ params, request, response }) {
    const field = await Field.updateField(params, request);
    response.json(field);
  }

  async delete({ params, response }) {
    await Field.deleteField(params);
    response.status(204).json(null);
  }
}

module.exports = FieldController;
