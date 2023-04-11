import AbstractBuilder from './AbstractBuilder';

/**
 * An abstract builder that can add components. This class should not be
 * instantiated.
 */
export default class AbstractComponentBuilder extends AbstractBuilder {
  constructor(props) {
    super(props);
    if (this.constructor === AbstractComponentBuilder) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
    this.elements = [];
  }

  /**
   * Adds a component to the builder.
   *
   * @param {*} component
   * @return {*}
   */
  addComponent(component) {
    this.elements.push({
      element: 'component',
      component,
    });
    return this;
  }
}

export {
  AbstractComponentBuilder,
};

