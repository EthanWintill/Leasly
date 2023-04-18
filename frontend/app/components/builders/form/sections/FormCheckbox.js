import React from 'react';
import {
  Checkbox,
  Icon,
} from 'native-base';

import {AbstractFormSectionBuilder} from './FormSection';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function FormCheckbox(props) {
  const createComponent = (element, key, invalidMap) => {
    const {errorsOn, ...checkProps} = element.props;
    return (
      <React.Fragment key={key}>
        {checkProps.icon &&
          <Checkbox
            {...checkProps}
            isInvalid={errorsOn.some((cond) => invalidMap[cond]())}
            icon={<Icon as={<MaterialCommunityIcons name={checkProps.icon} />} />}>
            {element.text}
          </Checkbox>
        }
        {!checkProps.icon &&
          <Checkbox
            {...checkProps}
            isInvalid={errorsOn.some((cond) => invalidMap[cond]())}>
            {element.text}
          </Checkbox>
        }
      </React.Fragment>
    );
  };

  const {elements, invalidConditions} = props;
  return (
    <>
      {
        elements.map((element, key) => {
          return createComponent(element, key, invalidConditions);
        })
      }
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Builders                                  */
/* -------------------------------------------------------------------------- */

class FormCheckboxBuilder extends AbstractFormSectionBuilder {
  constructor(props, listener) {
    super(props);
    this.listener = listener;
  }

  check(text, listener, invalidConditions, props) {
    props = this.getOrCreateProps(props);
    props.onChange = (val) => listener(val);
    props.errorsOn = invalidConditions;
    this.elements.push({
      element: 'check',
      text,
      props,
    });
    return this;
  }

  build() {
    return (
      <FormCheckbox
        listener={this.listener}
        elements={this.elements}
        {...this.props}/>
    );
  }
}

export {
  FormCheckbox,
  FormCheckboxBuilder,
};
