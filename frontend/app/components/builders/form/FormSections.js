import {FormCheckboxBuilder} from './sections/FormCheckbox';
import {FormInputBuilder} from './sections/FormInput';
import {FormRadioBuilder} from './sections/FormRadio';

export default class FormSections {
  constructor() {
    if (this.constructor === FormSections) {
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
}

export {
  FormSections,
};
