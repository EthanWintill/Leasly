import { FormCheckboxBuilder } from './components/FormCheckbox';
import {FormInputBuilder} from './components/FormInput';
import {FormRadioBuilder} from './components/FormRadio';
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
   * Creates a new {@link FormCheckboxBuilder}.
   *
   * @param {Map} props
   * @return {FormCheckboxBuilder}
   */
  static Checkbox(props) {
    return new FormCheckboxBuilder(props);
  }

  /**
   * Creates a new {@link FormInputBuilder}.
   *
   * @param {Map} props
   * @return {InputFormBuilder}
   */
  static Input(props) {
    return new FormInputBuilder(props);
  }

  /**
   * Creates a new {@link FormRadioBuilder}.
   *
   * @param {Map} props
   * @return {FormRadioBuilder}
   */
  static Radio(props) {
    return new FormRadioBuilder(props);
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
