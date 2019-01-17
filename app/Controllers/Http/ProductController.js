const Product = use('App/Models/Product');
const User = use('App/Models/User');

class ProductController {
  async index({ request }) {
    return Product.getProducts(request.only(['user_id', 'type_id', 'title']), request.only(['price', 'created_at']));
  }

  async store({ request, response }) {
    const { rows: users } = await User.all();
    const random = Math.floor(Math.random() * users.length);
    const user = users[random];

    const data = request.only(['title', 'description', 'price', 'type_id']);
    const { fields } = request.post();
    response.status(201);
    return Product.saveProduct(user.id, data, fields);
  }

  async show({ params }) {
    const { pid } = params;
    return Product.showProduct(pid);
  }

  async update({ params, request }) {
    const { pid } = params;
    const data = request.only(['title', 'description', 'price', 'type_id']);
    const { fields } = request.post();
    return Product.updateProduct(pid, data, fields);
  }

  async delete({ params, response }) {
    const { pid } = params;
    const product = await Product.findOrFail(pid);
    await product.delete();
    response.status(204).send();
  }
}

module.exports = ProductController;
