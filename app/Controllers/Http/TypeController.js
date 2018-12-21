class TypeController {
  async index() {
    return {
      data: [{ id: 1, name: 'phone' }, { id: 2, name: 'laptop' }, { id: 3, name: 'car' }, { id: 4, name: 'apartment' }]
    };
  }

  async store({ request, response }) {
    return response.status(201).json(request.body);
  }

  async show() {
    return {
      data: [{ id: 2, name: 'laptop' }]
    };
  }

  async update() {
    return {
      data: [{ id: 2, name: 'laptop' }]
    };
  }

  async delete({ response }) {
    return response.status(204).json(null);
  }
}

module.exports = TypeController;
