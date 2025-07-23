import { defineCustomElement } from 'vue';
import circularProgress from '../components/circular-progress.vue';
window.customElements.define('rf-circular-progress', defineCustomElement(circularProgress,{shadowRoot: true}));
