const Product = use('App/Models/Product');

class ProductController {
  async index({ request, response }) {
    const filter = request.get();
    const result = await Product.getProducts(filter);

    if (result.length > 0) {
      response.json(result);
    } else {
      response.status(204).json(null);
    }
  }

  async store({ request, response }) {
    const product = await Product.saveProduct(request);
    response.status(201).json(product);
  }

  async show({ params, response }) {
    const { pid } = params;
    const product = await Product.showProduct(pid);
    if (product) {
      response.json(product);
    } else {
      response.status(204).json(null);
    }
  }

  async update({ params, request, response }) {
    const { pid } = params;
    const product = await Product.updateProduct(pid, request);
    response.json(product);
  }

  async delete({ params, response }) {
    const { pid } = params;
    const product = await Product.findOrFail(pid);
    await product.delete();
    response.status(204).json(null);
  }
}

module.exports = ProductController;
