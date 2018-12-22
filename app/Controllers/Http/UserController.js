class UserController {
  async login({ request, response }) {
    return response.status(200).json(request.body);
  }

  async logout({ response }) {
    return response.status(200).json({ data: 'OK' });
  }
}

module.exports = UserController;
