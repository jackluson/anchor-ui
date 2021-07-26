## Anchor-UI

> 基于 Element-UI 二次封装组件库

## 关于组件库文档

组件库文档先利用 `vue-docgen`从源码注释中提取组件文档，然后结合组件示例文档，最终生成最终文档。利用`vuepress`结合自定义插件（文档示例代码不用写两次）渲染出来

## Component Kanban

> 目前提供如下组件

| Components    | 快捷入口                                                                    |
| ------------- | --------------------------------------------------------------------------- |
| pea-table     | [文档实例](https://jackluson.github.io/anchor-ui/components/pea-table/)     |
| pea-dialog    | [文档实例](https://jackluson.github.io/anchor-ui/components/pea-dialog/)    |
| pea-layout    | [文档实例](https://jackluson.github.io/anchor-ui/components/pea-layout/)    |
| pea-separater | [文档实例](https://jackluson.github.io/anchor-ui/components/pea-separater/) |

## 使用

## 遗留问题

- [] 偶尔出现源码改动，文档不会自动刷新问题
- [] `Failed to execute 'appendChild' on 'Node'` 问题 目前用 ClientOnly 解决， 可参考[这篇文章](https://wxsm.space/posts/2020-10-25-a-difficult-debug-note.html)
