import React from 'react';
import {
  FormControl,
  Radio,
} from 'native-base';

import {AbstractFormSectionBuilder} from './FormSection';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function FormRadio(props) {
  const createComponent = (element, key, invalidMap) => {
    const {errorsOn, ...radioProps} = element.props;
    return (
      <FormControl
        key={key}
        isInvalid={errorsOn.some((cond) => invalidMap[cond]())}
        {...element.props}>
        <Radio value={element.value} {...radioProps}>
          {element.text}
        </Radio>
      </FormControl>
    );
  };

  const {elements, formRadio, invalidConditions} = this.props;
  return (
    <Radio.Group onChange={(val) => this.listener(val)} {...formRadio}>
      {
        elements.map((element, key) => {
          return createComponent(element, key, invalidConditions);
        })
      }
    </Radio.Group>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Builders                                  */
/* -------------------------------------------------------------------------- */

class FormRadioBuilder extends AbstractFormSectionBuilder {
  constructor(props, listener) {
    super(props);
    this.listener = listener;
  }

  radio(text, invalidConditions, props) {
    props = this.getOrCreateProps(props);
    props.errorsOn = invalidConditions;
    this.elements.push({
      element: 'radio',
      text,
      props,
    });
    return this;
  }

  build() {
    return (
      <FormRadio
        listener={this.listener}
        elements={this.elements}
        {...this.props}/>
    );
  }
}

export {
  FormRadio,
  FormRadioBuilder,
};
