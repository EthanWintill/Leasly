import React from 'react';
import {
  FormControl,
  Input,
} from 'native-base';

import AbstractComponentBuilder from '../AbstractComponentBuilder';

/* -------------------------------------------------------------------------- */
/*                             Utility Functions                              */
/* -------------------------------------------------------------------------- */

function formComponentFromElement(element, key, invalidMap) {
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
            key={key}
            {...errorProps}>
            {element.text}
          </FormControl.ErrorMessage>
        </FormControl>
      );
    case 'input':
      const {errorsOn, ...inputProps} = element.props;
      return (
        <FormControl key={key} isInvalid={errorsOn.some((cond) => invalidMap[cond]())}>
          <Input key={key} {...inputProps}/>
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
    case 'group':
      const {group} = element;
      const {invalidConditions, ...form} = group.form;
      return (
        <FormControl
          key={key}
          isInvalid={Object.values(invalidConditions).some((cond) => cond())}
          {...form}>
          {
            group.elements.map((e, k) => {
              return formComponentFromElement(e, k, invalidConditions);
            })
          }
        </FormControl>
      );
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Builders                                  */
/* -------------------------------------------------------------------------- */

/**
 * A holder class for adding form groups to our form builders. Abstract as
 * it does not implement `build()`.
 *
 * @abstract
 */
class AbstractFormGroupBuilder extends AbstractComponentBuilder {
  constructor(props) {
    super(props);
    if (this.constructor === AbstractFormGroupBuilder) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
  }

  /**
   * Adds a {@link FormGroup} to the form.
   *
   * Components are rendered in the order they are added, where the first element
   * is rendered at the top, second added is the second element below the first,
   * and so on.
   *
   * @param {FormGroup|FormGroupBuilder} formGroup
   * @return {AbstractFormGroupBuilder}
   */
  addFormGroup(formGroup) {
    if (formGroup instanceof FormGroupBuilder) {
      formGroup = formGroup.build();
    }
    this.elements.push({
      element: 'group',
      group: formGroup,
    });
    return this;
  }
}

/**
 * Builder for a form group property map. Does not return a component, but tells
 * a form builder how to construct the group.
 */
class FormGroupBuilder extends AbstractFormGroupBuilder {
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
   * @return {FormGroupBuilder}
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
   * @return {FormGroupBuilder}
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
   * @return {FormGroupBuilder}
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
   * @return {FormGroupBuilder}
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
   * @return {FormGroupBuilder}
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
   * @return {FormGroup}
   */
  build() {
    return ({
      element: 'group',
      form: this.props,
      elements: this.elements,
    });
  }
}

export {
  formComponentFromElement,
  AbstractFormGroupBuilder,
  FormGroupBuilder,
};
