## Anchor-UI-Vue

> 基于 Element-UI 二次封装组件库

## 关于组件库文档

组件库文档先利用 `vue-docgen`从源码注释中提取组件文档，然后结合组件示例文档，最终生成最终文档。利用`vuepress`结合自定义插件（文档示例代码不用写两次）渲染出来。 这样做的好处有：

1. 既规范，写好写全组件源码的注释，有利后续的维护。也可以从源码的注释中提取组件文档。
2. 组件的示例 demo 与源码解偶开来，有利于各自的维护
3. 自定义 vuepress 插件可以使写组件示例时，不用重复写两遍一样的代码

## Component Kanban

> 目前提供如下组件

| Components       | 快捷入口                                                                       |
| ---------------- | ------------------------------------------------------------------------------ |
| anchor-table     | [文档实例](https://jackluson.github.io/anchor-ui/components/anchor-table/)     |
| anchor-dialog    | [文档实例](https://jackluson.github.io/anchor-ui/components/anchor-dialog/)    |
| anchor-layout    | [文档实例](https://jackluson.github.io/anchor-ui/components/anchor-layout/)    |
| anchor-separater | [文档实例](https://jackluson.github.io/anchor-ui/components/anchor-separater/) |

## 使用

## 遗留问题

- [] 偶尔出现源码改动，文档不会自动刷新问题
- [] `Failed to execute 'appendChild' on 'Node'` 问题 目前用 ClientOnly 解决， 可参考[这篇文章](https://wxsm.space/posts/2020-10-25-a-difficult-debug-note.html)
