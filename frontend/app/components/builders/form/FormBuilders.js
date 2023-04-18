import {VerticalFormBuilder} from './vertical/VerticalForm';

/**
 * Holds all {@link FormGroup} builders statically, granting immediate use on
 * call to a builder.
 *
 * @abstract
 */
export default class FormBuilders {
  constructor() {
    if (this.constructor === FormBuilders) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
  }

  /**
   * Creates a new {@link VerticalFormBuilder}.
   *
   * @param {Map} props
   * @return {VerticalFormBuilder}
   */
  static Vertical(props) {
    return new VerticalFormBuilder(props);
  }
}

export {
  FormBuilders,
};
