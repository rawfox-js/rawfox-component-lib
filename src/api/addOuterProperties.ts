import type { VueElementConstructor } from "vue"
type CustomProps = {
  name: string,
  get: () => any
  set: (v: any) => any
}[]
/**
 * 为组件定义自定义外部属性
 * @param VueElement Vue构建的组件类
 * @param customProps 自定义属性
 * @returns 新的自定义元素类
 */
export function addOuterProperties(VueElement: VueElementConstructor<any>, customProps: CustomProps): VueElementConstructor<any> {
  return class Element extends VueElement {
    constructor(...args: any[]) {
      super(...args)
      for (const item of customProps) {
        const desc = Object.getOwnPropertyDescriptor(this, item.name)
        if (desc && !desc.configurable) {
          // 已经定义且不可配置，跳过避免报错
          continue
        }
        Object.defineProperty(this, item.name, {
          get: item.get,
          set: item.set
        })
      }
    }
  }
}
/**
 * 定义自定义属性，助手函数，用于编译时处理
 * @param customProps 自定义属性
 * @returns
 */
export function defineCustomProps(customProps: CustomProps) {
  return customProps
}

/**辅助函数，用来编译处理 */
export function setProperty(func: () => any) {
  func()
}
