import React from 'react';
import {
  Box,
  Button,
  Heading,
  VStack,
} from 'native-base';

import AbstractFormBuilder from './FormBuilder';

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
            case 'button':
              return (
                <Button
                  key={key}
                  {...element.props}>
                  {element.text}
                </Button>
              );
            case 'checkbox':
              return (
                <React.Fragment key={key}>
                  {element.section}
                </React.Fragment>
              );
            case 'heading':
              return (
                <Heading key={key} {...element.props}>{element.text}</Heading>
              );
            case 'input':
              return (
                <React.Fragment key={key}>
                  {element.section}
                </React.Fragment>
              );
            case 'component':
              return (
                <React.Fragment key={key}>
                  {element.component}
                </React.Fragment>
              );
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
 * Builder for a {@link VerticalForm}. This form has a header, footer, and other form building
 * functionality. Header always be at the top, footer always be at the bottom.
 */
class VerticalFormBuilder extends AbstractFormBuilder {
  constructor(props) {
    super(props);
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
