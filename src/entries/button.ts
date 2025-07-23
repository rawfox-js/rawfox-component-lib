import { defineCustomElement } from 'vue';
import button from '../components/button.vue';
window.customElements.define('rf-button', defineCustomElement(button,{shadowRoot: true}));
