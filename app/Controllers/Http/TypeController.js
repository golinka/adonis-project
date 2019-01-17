const Type = use('App/Models/Type');

class TypeController {
  async index() {
    return Type.all();
  }

  async store({ request, response }) {
    const data = request.only(['name']);
    response.status(201);
    return Type.create(data);
  }

  async show({ params }) {
    const { tid } = params;
    return Type.findOrFail(tid);
  }

  async update({ params, request }) {
    const { tid } = params;
    const type = await Type.findOrFail(tid);
    type.merge(request.only(['name']));
    await type.save();
    return type;
  }

  async delete({ params, response }) {
    const { tid } = params;
    const type = await Type.findOrFail(tid);
    await type.delete();
    response.status(204).send();
  }
}

module.exports = TypeController;
