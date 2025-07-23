import { defineCustomElement } from 'vue';
import input from '../components/input.vue';
window.customElements.define('rf-input', defineCustomElement(input,{shadowRoot: true}));
