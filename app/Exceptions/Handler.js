const BaseExceptionHandler = use('BaseExceptionHandler');

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { response }) {
    switch (error.name) {
      case 'ValidationException':
        response.status(error.status).json({
          error: {
            messages: error.messages,
            code: error.status
          }
        });
        break;
      case 'UserNotFoundException':
        response.status(404).json({
          error: {
            message: error.message,
            code: 404
          }
        });
        break;
      default:
        response.status(error.status).json({
          error: {
            message: error.message,
            code: error.status
          }
        });
        break;
    }
  }
}

module.exports = ExceptionHandler;
