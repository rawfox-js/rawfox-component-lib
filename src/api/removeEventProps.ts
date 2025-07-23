import { computed, useAttrs } from "vue"
export function getOuterRemoveEventAttrs() {
  const attrs = useAttrs()
  const filteredProps = computed(() => {
    const rst: Record<string, unknown> = {}
    for (const i in attrs) {
      if (!i.startsWith("on")) {
        rst[i] = attrs[i]
      }
    }
    return rst
  })
  return filteredProps
}
