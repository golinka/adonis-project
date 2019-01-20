class CheckType {
  get rules() {
    return {
      name: 'required|unique:types|max:30'
    };
  }

  get messages() {
    return {
      required: '{{ field }} is required',
      unique: '{{ field }} must be unique',
      max: '{{ field }} must be no longer than 30 characters'
    };
  }
}

module.exports = CheckType;
