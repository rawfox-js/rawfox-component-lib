# Button

按钮

```html
<rf-button>Button</rf-button>
```

不同类型的按钮：

```html
<rf-button size="small">Button</rf-button>
<rf-button size="small" type="outlined">Button</rf-button>
<rf-button size="small" type="error">Button</rf-button>
<rf-button size="small" type="text">Button</rf-button>
```

> [!CAUTION]
>
> 如果启用了加载状态（`loading=true`）时并且插入了起始图标，加载模式图标不会显示。

## 属性

| 名称     | 可选 | 类型                               | 默认值  | 介绍     |
| -------- | ---- | ---------------------------------- | ------- | -------- |
| disabled | 是   | boolean                            | false   | 禁用状态 |
| loading  | 是   | boolean                            | false   | 加载状态 |
| type     | 是   | normal\| outlined \| error \| text | normal  | 按钮类型 |
| size     | 是   | default\| large \| small           | default | 按钮尺寸 |

## 插槽

| 名称     | 介绍         |
| -------- | ------------ |
| start    | 起始位置图标 |
| 默认插槽 | 按钮文本     |
| end      | 结束位置图标 |
