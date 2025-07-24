# Input

输入框


```html
<rf-input>Input</rf-input>
```

不同类型的输入框

```html
<rf-input type="text"></rf-input>
<rf-input type="number"></rf-input>
<rf-input type="password"></rf-input>
```

事件监听

```js
const input = document.querySelector("rf-input")
input.oninput = e => {
	console.log(e.target.value)
}
```

## 属性

| 名称     | 可选 | 类型                                | 默认值  | 介绍     |
| -------- | ---- | ----------------------------------- | ------- | -------- |
| disabled | 是 | boolean | false | 是否禁用 |
| placeholder | 是 | string | "" | 占位文本 |
| type | 否 | text \| password \| number | 无 | 文本框类型 |
| readonly | 是 | boolean | false | 只读 |
| defaultValue | 是 | string | "" | 默认文本 |
| error | 是 | boolean | false | 错误状态 |
| maxLength | 是 | number | -1 | 最大长度 |
| min | 是 | number | 未知 | 最小值（数字文本框模式） |
| max | 是 | number | 未知 | 最大值（数字文本框模式） |
| inputMode | 是 | string | 无 | 软键盘类型 |

## 插槽

| 名称     | 介绍         |
| -------- | ------------ |
| start | 前置插槽，可插入图标或按钮 |
| end | 后置插槽，可插入图标或按钮 |

## 事件

基于事件冒泡机制，支持input所有事件。
