const Validator = use('Validator');
const Type = use('App/Models/Type');

const typeFn = async data => {
  const { tid, fid } = data;
  const type = await Type.findOrFail(tid);
  await type
    .fields()
    .where('id', fid)
    .firstOrFail();
};

Validator.extend('type', typeFn);

class UpdateField {
  get data() {
    const body = this.ctx.request.post();
    const { tid, fid } = this.ctx.request.params;
    return Object.assign({}, body, { tid, fid });
  }

  get rules() {
    return {
      name: 'required|unique:fields|max:30|type'
    };
  }
}

module.exports = UpdateField;
