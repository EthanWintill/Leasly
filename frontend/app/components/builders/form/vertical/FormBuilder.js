import AbstractComponentBuilder from '../../AbstractComponentBuilder';
import { FormCheckboxBuilder } from '../components/FormCheckbox';
import {FormInputBuilder} from '../components/FormInput';

/**
 * Builds a form property map. Abstract as it does not build a component.
 *
 * @abstract
 */
export default class AbstractFormBuilder extends AbstractComponentBuilder {
  constructor(props) {
    super(props);
    if (this.constructor === AbstractFormBuilder) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
    this.header = null;
    this.footer = null;
  }

  /**
   * Sets the header to a component. A form can only have one header.
   *
   * @param {React.Component} component
   * @return {AccountFormBuilder}
   */
  setHeader(component) {
    this.ensureNull(this.header, 'header');
    this.header = component;
    return this;
  }

  /**
   * Sets the footer to a component. A form can only have one header.
   *
   * @param {React.Component} component
   * @return {AccountFormBuilder}
   */
  setFooter(component) {
    this.ensureNull(this.footer, 'footer');
    this.footer = component;
    return this;
  }

  /**
     * Adds a {@link Heading} to the form.
     *
     * Components are rendered in the order they are added, where the first element
     * is rendered at the top, second added is the second element below the first,
     * and so on.
     *
     * @param {String} text
     * @param {Map} props
     * @return {VerticalFormBuilder}
     */
  addHeading(text, props) {
    this.elements.push({
      element: 'heading',
      text,
      props,
    });
    return this;
  }

  /**
     * Adds a {@link Button} to the form.
     *
     * Components are rendered in the order they are added, where the first element
     * is rendered at the top, second added is the second element below the first,
     * and so on.
     *
     * @param {String} text
     * @param {Map} props
     * @return {VerticalFormBuilder}
     */
  addButton(text, props) {
    this.elements.push({
      element: 'button',
      text,
      props,
    });
    return this;
  }

  addInput(formInput) {
    if (formInput instanceof FormInputBuilder) {
      formInput = formInput.build();
    }
    this.elements.push({
      element: 'input',
      formInput,
    });
    return this;
  }

  addCheckbox(formCheckbox) {
    if (formCheckbox instanceof FormCheckboxBuilder) {
      formCheckbox = formCheckbox.build();
    }
    this.elements.push({
      element: 'checkbox',
      formCheckbox,
    });
    return this;
  }

  /**
     * Builds the property map.
     *
     * @return {Map}
     */
  build() {
    return {
      form: this.props.form,
      elements: this.elements,
    };
  }
}

export {
  AbstractFormBuilder,
};
