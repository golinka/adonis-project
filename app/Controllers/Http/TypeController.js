const Type = use('App/Models/Type');

class TypeController {
  async index({ response }) {
    const types = await Type.all();
    response.json(types);
  }

  async store({ request, response }) {
    const { name } = request.only(['name']);
    const type = new Type();

    type.name = name;
    await type.save();

    response.status(201).json(type);
  }

  async show({ params, response }) {
    const { tid } = params;
    const type = await Type.findOrFail(tid);
    response.json(type);
  }

  async update({ params, request, response }) {
    const { tid } = params;
    const data = request.only(['name']);
    const type = await Type.findOrFail(tid);

    type.merge(data);
    await type.save();

    response.json(type);
  }

  async delete({ params, response }) {
    const { tid } = params;

    const type = await Type.findOrFail(tid);
    type.delete();

    response.status(204).json(null);
  }
}

module.exports = TypeController;
