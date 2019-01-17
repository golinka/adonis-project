class CheckType {
  get rules() {
    return {
      name: 'unique:types|max:30'
    };
  }
}

module.exports = CheckType;
