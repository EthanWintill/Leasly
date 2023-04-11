import React from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
} from 'native-base';

import {AbstractFormGroupBuilder, formComponentFromElement} from '../FormGroup';

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

/**
 * Represent a {@link VStack} of form elements.
 *
 * @param {Map} props
 * @return {VerticalFormBuilder}
 */
function VerticalForm(props) {
  const {form, elements} = props;
  return (
    <VStack {...form.vstack}>
      {
        elements.map((element, key) => {
          switch (element.element) {
            case 'heading':
              return (
                <Heading key={key} {...element.props}>{element.text}</Heading>
              );
            case 'button':
              return (
                <Button key={key} {...element.props}>{element.text}</Button>
              );
            case 'group':
              return formComponentFromElement(element, key);
            case 'component':
              return element.component;
          }
        })
      }
    </VStack>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Builders                                  */
/* -------------------------------------------------------------------------- */

/**
 * Builds a {@link VerticalForm} property map. Abstract as it does not build
 * a component.
 *
 * @abstract
 */
class AbstractVerticalFormBuilder extends AbstractFormGroupBuilder {
  constructor(props) {
    super(props);
    if (this.constructor === AbstractVerticalFormBuilder) {
      throw new Error('Abstract classes can\'t be instantiated.');
    }
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

/**
 * Builder for a {@link VerticalForm}. This form has a header, footer, and other form building
 * functionality. Header always be at the top, footer always be at the bottom.
 */
class VerticalFormBuilder extends AbstractVerticalFormBuilder {
  constructor(props) {
    super(props);
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
   * Builds the component.
   *
   * @return {VerticalForm}
   */
  build() {
    const {box, vstack} = this.props;
    const vFormProps = super.build();
    return (
      <Box {...box}>
        <VStack {...vstack}>
          {this.header}
          <VerticalForm {...vFormProps}/>
          {this.footer}
        </VStack>
      </Box>
    );
  }
}

export {
  VerticalFormBuilder,
};
