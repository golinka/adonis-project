class CheckType {
  get rules() {
    return {
      name: 'required|unique:types|max:30'
    };
  }
}

module.exports = CheckType;
