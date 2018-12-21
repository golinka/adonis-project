class FieldController {
  async index() {
    return {
      data: [
        { id: 1, name: 'year', format: 'integer' },
        { id: 2, name: 'model', format: 'varchar' },
        { id: 3, name: 'diagonal', format: 'integer' },
        { id: 4, name: 'fuel_type', format: 'varchar' },
        { id: 5, name: 'body_type', format: 'varchar' }
      ]
    };
  }

  async store({ request, response }) {
    return response.status(201).json(request.body);
  }

  async show() {
    return {
      data: [{ id: 3, name: 'diagonal', format: 'integer' }]
    };
  }

  async update() {
    return {
      data: [{ id: 3, name: 'diagonal', format: 'integer' }]
    };
  }

  async delete({ response }) {
    return response.status(204).json(null);
  }
}

module.exports = FieldController;
