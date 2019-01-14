/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => ({ status: 'Ok', version: '1.0.0' }));

Route.group(() => {
  Route.post('/login', 'UserController.login');
  Route.get('/logout', 'UserController.logout');

  Route.get('/products', 'ProductController.index');
  Route.post('/products', 'ProductController.store');
  Route.get('/products/:pid', 'ProductController.show');
  Route.put('/products/:pid', 'ProductController.update');
  Route.delete('/products/:pid', 'ProductController.delete');

  Route.get('/types', 'TypeController.index');
  Route.post('/types', 'TypeController.store');
  Route.get('/types/:tid', 'TypeController.show');
  Route.put('/types/:tid', 'TypeController.update');
  Route.delete('/types/:tid', 'TypeController.delete');

  Route.get('/types/:tid/fields', 'FieldController.index');
  Route.post('/types/:tid/fields', 'FieldController.store');
  Route.get('/types/:tid/fields/:fid', 'FieldController.show');
  Route.put('/types/:tid/fields/:fid', 'FieldController.update');
  Route.delete('/types/:tid/fields/:fid', 'FieldController.delete');
}).prefix('api/v1');
