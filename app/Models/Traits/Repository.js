class Repository {
  register(Model, customOptions = {}) {
    const defaultOptions = {
      repositoryClass: `App/Models/Repositories/${Model.name}`
    };
    const options = { ...defaultOptions, ...customOptions };
    const RepositoryClass = use(options.repositoryClass);
    Object.getOwnPropertyNames(RepositoryClass).forEach(prop => {
      if (typeof RepositoryClass[prop] === 'function') {
        Model[prop] = RepositoryClass[prop];
      }
    });
    Object.getOwnPropertyNames(RepositoryClass.prototype).forEach(prop => {
      if (typeof RepositoryClass.prototype[prop] === 'function' && prop !== 'constructor') {
        Model.prototype[prop] = RepositoryClass.prototype[prop];
      }
    });
  }
}

module.exports = Repository;
