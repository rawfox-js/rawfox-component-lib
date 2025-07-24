import { defineCustomElement } from 'vue';
import ripple from '../components/ripple.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(ripple, { shadowRoot: true }),
  defineCustomProps([])
)

window.customElements.define('rf-ripple', Element);