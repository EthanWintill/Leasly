import React from 'react';
import {
  FormControl,
  Input,
} from 'native-base';

import {AbstractFormSectionBuilder} from './FormSection';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

/**
 * Represents a group of user text inputs and feedback for said inputs. Can be
 * any of the following inputs:
 *
 * 'label': {@link FormControl.Label}
 * 'error': {@link FormControl.ErrorMessage}
 * 'help':  {@link FormControl.HelperText}
 * 'input': {@link Input}
 *
 * @param {*} props
 * @return {FormInput}
 */
export default function FormInput(props) {
  const createComponent = (element, key, invalidMap) => {
    switch (element.element) {
      case 'label':
        return (
          <FormControl.Label
            key={key}
            {...element.props}>
            {element.text}
          </FormControl.Label>
        );
      case 'error':
        const {enablesOn, ...errorProps} = element.props;
        return (
          <FormControl key={key} isInvalid={enablesOn.some((cond) => invalidMap[cond]())}>
            <FormControl.ErrorMessage
              {...errorProps}>
              {element.text}
            </FormControl.ErrorMessage>
          </FormControl>
        );
      case 'help':
        return (
          <FormControl.HelperText
            key={key}
            {...element.props}>
            {element.text}
          </FormControl.HelperText>
        );
      case 'input':
        const {errorsOn, ...inputProps} = element.props;
        return (
          <FormControl key={key} isInvalid={errorsOn.some((cond) => invalidMap[cond]())}>
            <Input {...inputProps}/>
          </FormControl>
        );
    }
  };

  const {elements, form} = props;
  return (
    <FormControl {...form}>
      {
        elements.map((element, key) => {
          return createComponent(element, key, form.invalidConditions);
        })
      }
    </FormControl>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Builders                                  */
/* -------------------------------------------------------------------------- */

/**
 * Builder for a form group property map. Does not return a component, but tells
 * a form builder how to construct the group.
 */
class FormInputBuilder extends AbstractFormSectionBuilder {
  constructor(props) {
    super(props);
  }

  /**
   * Adds a {@link FormControl.Label} to the group.
   *
   * Components are rendered in the order they are added, where the first element
   * is rendered at the top, second added is the second element below the first,
   * and so on.
   *
   * @param {*} text
   * @param {*} props
   * @return {FormInputBuilder}
   */
  addLabel(text, props) {
    this.elements.push({
      element: 'label',
      text,
      props,
    });
    return this;
  }

  /**
   * Adds a {@link FormControl.Input} to the group that has `type="text"`.
   *
   * Components are rendered in the order they are added, where the first element
   * is rendered at the top, second added is the second element below the first,
   * and so on.
   *
   * @param {*} listener The setter specified by second return of `useState()`
   * @param {*} invalidConditions
   * @param {*} props
   * @return {FormInputBuilder}
   */
  addTextInput(listener, invalidConditions, props) {
    props = this.getOrCreateProps(props);
    props.onChangeText = (text) => listener(text);
    props.errorsOn = invalidConditions;
    props.type = 'text';
    this.elements.push({
      element: 'input',
      props,
    });
    return this;
  }

  /**
   * Adds a {@link FormControl.Input} to the group that has `type="password"`.
   *
   * Components are rendered in the order they are added, where the first element
   * is rendered at the top, second added is the second element below the first,
   * and so on.
   *
   * @param {*} listener The setter specified by second return of `useState()`
   * @param {*} invalidConditions
   * @param {*} props
   * @return {FormInputBuilder}
   */
  addPasswordInput(listener, invalidConditions, props) {
    props = this.getOrCreateProps(props);
    props.onChangeText = (text) => listener(text);
    props.errorsOn = invalidConditions;
    props.type = 'password';
    this.elements.push({
      element: 'input',
      props,
    });
    return this;
  }

  /**
   * Adds a {@link FormControl.ErrorMessage} to the group.
   *
   * Components are rendered in the order they are added, where the first element
   * is rendered at the top, second added is the second element below the first,
   * and so on.
   *
   * @param {*} text
   * @param {*} enabledConditions
   * @param {*} props
   * @return {FormInputBuilder}
   */
  addError(text, enabledConditions, props) {
    props = this.getOrCreateProps(props);
    props.enablesOn = enabledConditions;
    this.elements.push({
      element: 'error',
      text,
      props,
    });
    return this;
  }

  /**
   * Adds a {@link FormControl.HelperText} to the group.
   *
   * Components are rendered in the order they are added, where the first element
   * is rendered at the top, second added is the second element below the first,
   * and so on.
   *
   * @param {*} text
   * @param {*} props
   * @return {FormInputBuilder}
   */
  addHelperText(text, props) {
    this.elements.push({
      element: 'helper',
      text,
      props,
    });
    return this;
  }

  /**
   * Builds the property map.
   *
   * @return {FormInput}
   */
  build() {
    return (
      <FormInput form={this.props} elements={this.elements}/>
    );
  }
}

export {
  FormInput,
  FormInputBuilder,
};
