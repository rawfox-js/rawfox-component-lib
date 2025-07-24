import { defineCustomElement } from 'vue';
import circularProgress from '../components/circular-progress.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(circularProgress, { shadowRoot: true }),
  defineCustomProps([])
)

window.customElements.define('rf-circular-progress', Element);