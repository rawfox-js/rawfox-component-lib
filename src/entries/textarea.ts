import { defineCustomElement } from 'vue';
import textarea from '../components/textarea.vue';
import { addOuterProperties, defineCustomProps } from '../api/addOuterProperties';

const Element = addOuterProperties(
  defineCustomElement(textarea, { shadowRoot: true }),
  defineCustomProps([
{
  name: "value",
  get() {
    //@ts-ignore
    return this._instance?.exposed?.value?.value
  },
  set(v) {
    //@ts-ignore
    if (this._instance?.exposed) this._instance.exposed.value.value = v
  }
}
])
)

window.customElements.define('rf-textarea', Element);