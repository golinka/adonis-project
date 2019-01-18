class CheckField {
  get rules() {
    return {
      name: 'required|unique:fields|max:30'
    };
  }
}

module.exports = CheckField;
