const Validator = use('Validator');
const Type = use('App/Models/Type');

const fieldsFn = async (data, field, message) => {
  // eslint-disable-next-line
  const { type_id: tid, fields } = data;
  const type = await Type.findOrFail(tid);
  const { rows: typeFields } = await type.fields().fetch();

  let fails = typeFields.length !== fields.filter(fieldItem => typeof fieldItem !== 'undefined').length;
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
