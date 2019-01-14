const Field = use('App/Models/Field');

class FieldController {
  async index({ params, response }) {
    const fields = await Field.getFields(params);
    response.status(200).json(fields);
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
      response.status(200).json(field);
    }
  }

  async update({ params, request, response }) {
    const field = await Field.updateField(params, request);
    response.status(200).json(field);
  }

  async delete({ params, response }) {
    const result = await Field.deleteField(params);
    response.status(204).json(result);
  }
}

module.exports = FieldController;
