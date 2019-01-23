/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Product = use('App/Models/Product');
const User = use('App/Models/User');

class EditProduct {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ params, auth }, next) {
    const { user_id: productUserId } = await Product.findOrFail(params.pid);
    const { id: userId } = await auth.getUser();

    if (productUserId !== userId) {
      const user = await User.findOrFail(userId);
      const { rows: userRoles } = await user.roles().fetch();

      const fails = userRoles.map(role => role.slug !== 'admin').reduce((prev, current) => prev && current);
      if (fails) {
        const error = new Error('This user does not have access to this product');
        error.status = 403;
        throw error;
      }
    }

    await next();
  }
}

module.exports = EditProduct;
