const Product = use('App/Models/Product');

class ProductController {
  async index({ request }) {
    return Product.getProducts(request.only(['user_id', 'type_id', 'title']), request.only(['price', 'created_at']));
  }

  async store({ request, response, auth }) {
    const { id: userId } = await auth.getUser();
    const data = request.only(['title', 'description', 'price', 'type_id']);
    const { fields } = request.post();
    response.status(201);
    return Product.saveProduct(userId, data, fields);
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
