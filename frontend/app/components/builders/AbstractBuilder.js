/**
 * Represents an abstract builder. This class should not be
 * instantiated.
 */
export default class AbstractBuilder {
  constructor(props) {
    if (this.constructor === AbstractBuilder) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
    this.props = props;
  }

  /**
   * Ensures the builder does not already have this object.
   *
   * @param {*} obj Object to add
   * @param {*} name Name of object in error report
   */
  ensureNull(obj, name) {
    if (obj != null) {
      throw new Error('Builder already has `' + name + '`');
    }
  }

  /**
   * Instructs the builder to build the component. Children classes
   * must implement this function.
   */
  build() {
    throw new Error('Method \'build()\' must be implemented.');
  }
}

export {
  AbstractBuilder,
};
