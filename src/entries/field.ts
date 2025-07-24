import { defineCustomElement } from 'vue';
import field from '../components/field.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(field, { shadowRoot: true }),
  defineCustomProps([])
)

window.customElements.define('rf-field', Element);