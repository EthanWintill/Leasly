

/* -------------------------------------------------------------------------- */
/*                              Utility Functions                             */
/* -------------------------------------------------------------------------- */

import AbstractBuilder from "../../AbstractBuilder";
import AbstractComponentBuilder from "../../AbstractComponentBuilder";



/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

function FormCategory(props) {
    const {category, }
}

class FormCategoryBuilder extends AbstractComponentBuilder {
    constructor(props) {
        super(props)
    }

    addCategory(text, props) {
        this.elements.push({
            element: 'category',
            text,
            props
        })
        return this;
    }

    addGroup(formGroup) {
        this.elements.push({
            element: 'group',
            component: formGroup
        })
        return this;
    }
}