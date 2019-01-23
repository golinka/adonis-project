class AuthController {
  async login({ request, auth }) {
    const { username, password } = request.all();
    return auth.attempt(username, password);
  }

  async logout({ auth }) {
    return auth.logout();
  }
}

module.exports = AuthController;
