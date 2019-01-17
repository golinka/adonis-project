class StoreField {
  get rules() {
    return {
      name: 'required|unique:fields|max:30'
    };
  }
}

module.exports = StoreField;
