import AbstractComponentBuilder from '../../AbstractComponentBuilder';

/* -------------------------------------------------------------------------- */
/*                                  Builders                                  */
/* -------------------------------------------------------------------------- */

/**
 * A holder class for adding form components to our form builders. Abstract as
 * it does not implement `build()`.
 *
 * @abstract
 */
class AbstractFormComponentBuilder extends AbstractComponentBuilder {
  constructor(props) {
    super(props);
    if (this.constructor === AbstractFormComponentBuilder) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
  }
}

export {
  AbstractFormComponentBuilder,
};
