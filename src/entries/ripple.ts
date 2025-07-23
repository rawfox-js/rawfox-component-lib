import { defineCustomElement } from 'vue';
import ripple from '../components/ripple.vue';
window.customElements.define('rf-ripple', defineCustomElement(ripple,{shadowRoot: true}));
