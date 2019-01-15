const Validator = use('Validator');
const Type = use('App/Models/Type');

const fieldsFn = async (data, field, message) => {
  const { type_id, fields } = data;
  const type = await Type.findOrFail(type_id);
  const { rows: typeFields } = await type.fields().fetch();
  const fieldCount = fields.filter(fieldItem => typeof fieldItem !== 'undefined').length;

  let fails = typeFields.length !== fieldCount;
  typeFields.forEach(typeField => {
    fails = fails || typeof fields[typeField.id] === 'undefined';
  });

  if (fails) throw message;
};

Validator.extend('fields', fieldsFn);

class CheckProduct {
  get rules() {
    return {
      title: 'required|max:50',
      description: 'required|max:255',
      price: 'required',
      type_id: 'required',
      fields: 'required|fields'
    };
  }
}

module.exports = CheckProduct;
