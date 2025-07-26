import { defineCustomElement } from 'vue';
import icon from '../components/icon.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(icon, { shadowRoot: true }),
  defineCustomProps([])
)

window.customElements.define('rf-icon', Element);