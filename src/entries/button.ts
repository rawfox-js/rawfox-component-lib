import { defineCustomElement } from 'vue';
import button from '../components/button.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(button, { shadowRoot: true }),
  defineCustomProps([])
)

window.customElements.define('rf-button', Element);