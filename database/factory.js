/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', async (faker, index, data) => ({
  password: data.password || faker.password(),
  username: data.username || faker.username(),
  email: data.email || faker.email({ domain: 'mindk.com' })
}));

Factory.blueprint('App/Models/Type', async (faker, index, data) => ({
  name: data.name || faker.word()
}));

Factory.blueprint('App/Models/Field', async (faker, index, data) => ({
  name: data.name || faker.unique(faker.word, 1)[0],
  type_id: data.type_id || null
}));

Factory.blueprint('App/Models/Product', async (faker, index, data) => ({
  title: data.title || faker.sentence({ words: 5 }),
  description: data.description || faker.paragraph({ sentences: 2 }),
  price: data.price || faker.integer({ min: 50, max: 50000 }),
  user_id: data.user_id || null,
  type_id: data.type_id || null
}));

Factory.blueprint('App/Models/FieldProduct', async (faker, index, data) => ({
  field_id: data.field_id || null,
  product_id: data.product_id || null,
  value: data.value || faker.word()
}));
