import { defineCustomElement } from 'vue';
import iconButton from '../components/icon-button.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(iconButton, { shadowRoot: true }),
  defineCustomProps([])
)

window.customElements.define('rf-icon-button', Element);