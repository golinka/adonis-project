class ProductController {
  async index() {
    return {
      data: [
        { id: 1, name: 'iPhone 7', description: 'Some desc', price: 17000, date_added: '12-12-2018' },
        { id: 2, name: 'iPhone 7 Plus', description: 'Some desc 2', price: 21000, date_added: '10-12-2018' },
        { id: 3, name: 'Samsung S9', description: 'Some desc 3', price: 23000, date_added: '10-12-2018' },
        { id: 4, name: 'Samsung Note 9', description: 'Some desc 4', price: 24000, date_added: '09-12-2018' }
      ]
    };
  }

  async store({ request, response }) {
    return response.status(201).json(request.body);
  }

  async show() {
    return {
      data: [{ id: 2, name: 'iPhone 7 Plus', description: 'Some desc 2', price: 21000, date_added: '10-12-2018' }]
    };
  }

  async update() {
    return {
      data: [{ id: 2, name: 'iPhone 7 Plus', description: 'Some desc 2', price: 21000, date_added: '10-12-2018' }]
    };
  }

  async delete({ response }) {
    return response.status(204).json(null);
  }
}

module.exports = ProductController;
