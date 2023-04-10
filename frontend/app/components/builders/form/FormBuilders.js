import React from 'react';
import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Text,
  VStack,
  FormControl,
  Input,
} from 'native-base';

import AbstractComponentBuilder from '../AbstractComponentBuilder';

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
  const componentFromElement = (element, key) => {
    switch (element.element) {
      case 'label':
        return (
          <FormControl.Label key={key} {...element.props}>{element.text}</FormControl.Label>
        );
      case 'help':
        return (
          <FormControl.HelperText key={key} {...element.props}>{element.text}</FormControl.HelperText>
        );
      case 'error':
        return (
          <FormControl.ErrorMessage key={key} {...element.props}>{element.text}</FormControl.ErrorMessage>
        );
      case 'input':
        return (
          <Input key={key} {...element.props} />
        );
      case 'group':
        return (
          <FormControl key={key} {...element.form}>
            {
              element.elements.map((groupElement, gKey) => componentFromElement(groupElement, gKey))
            }
          </FormControl>
        );
    }
  };

  const {vstack, control} = props.form;

  return (
    <VStack {...vstack}>
      {
        props.elements.map((element, key) => {
          switch (element.element) {
            case 'heading':
              return (
                <Heading key={key} {...element.props}>{element.text}</Heading>
              );
            case 'form':
              const {elements} = element.props;
              const baseForm = {
                element: 'group',
                elements: elements,
                form: control,
              };
              return componentFromElement(baseForm, key);
            case 'button':
              return (
                <Button key={key} {...element.props}>{element.text}</Button>
              );
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
 * Acts as a builder for a {@link VerticalForm} and statically holds all other
 * sub-builders. Components are rendered in the order they are added, where
 * the first element is rendered at the top, second added is the second element
 * below the first, and so on.
 */
class VerticalFormBuilder extends AbstractComponentBuilder {
  /* ---------------------------------- Base ---------------------------------- */
  constructor(props) {
    super(props);
  }

  /**
   * Adds a {@link Heading} to the form.
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
   * Adds a {@link FormControl} and {@link FormControl.Label} to the form.
   *
   * @param {Map} props
   * @return {VerticalFormBuilder}
   */
  addForm(props) {
    this.elements.push({
      element: 'form',
      props,
    });
    return this;
  }

  /**
   * Adds a {@link Button} to the form.
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

  build() {
    return {
      form: this.props.form,
      elements: this.elements,
    };
  }
}

/**
 * Represents a {@link VerticalFormBuilder} for a {@link VerticalForm}. This form
 * has a header, footer, and third party button fields. Header always exists at the
 * top, footer always at the bottom, and third party elements existing below the footer.
 */
class AccountFormBuilder extends VerticalFormBuilder {
  constructor(props) {
    super(props);
    this.header = null;
    this.footer = null;
  }

  /**
   * Adds a header to the form. There can only be one header. Headers consist of
   * two {@link Heading Headings} inside of a {@link Box}.
   *
   * @param {String} h1
   * @param {Map} h1Props
   * @param {String} h2
   * @param {Map} h2Props
   * @param {Map} boxProps
   * @return {AccountForm}
   */
  setHeader(h1, h1Props, h2, h2Props, boxProps) {
    this.ensureNull(this.header, 'header');
    this.title = (
      <Box {...boxProps}>
        <Heading {...h1Props}>{h1}</Heading>
        <Heading {...h2Props}>{h2}</Heading>
      </Box>
    );
    return this;
  }

  /**
   * Adds a footer to the form. There can only be one footer. Footers consist of
   * a {@link Text} and a {@link Button} inside of a {@link HStack}.
   *
   * @param {String} prompt
   * @param {Map} promptProps
   * @param {String} buttonText
   * @param {Map} buttonProps
   * @param {Map} hStackProps
   * @return {AccountForm}
   */
  setFooter(prompt, promptProps, buttonText, buttonProps, hStackProps) {
    this.ensureNull(this.footer, 'footer');
    this.footer = (
      <HStack {...hStackProps}>
        <Text {...promptProps}>{prompt}</Text>
        <Button {...buttonProps}>{buttonText}</Button>
      </HStack>
    );
    return this;
  }

  build() {
    const {center, box, vstack} = this.props;
    const vFormProps = super.build();
    return (
      <Center {...center}>
        <Box {...box}>
          <VStack {...vstack}>
            {this.title}
            <VerticalForm {...vFormProps}/>
            {this.footer}
          </VStack>
        </Box>
      </Center>
    );
  }
}

/**
 * Holds all {@link VerticalForm} builders statically, granting immediate use on
 * call to a builder.
 *
 * @abstract
 */
export default class FormBuilders {
  static AccountForm(props) {
    return new AccountFormBuilder(props);
  }
}

export {
  FormBuilders,
};