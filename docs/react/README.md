---
sidebar: auto
---

# React

## 生命周期

## Fiber

## setState

```bash
    setState
       ||
 enqueueSetState
       ||
合并 partialState 及 _pendingStateQueue 更新队列
       ||
enqueueUpdate ===>  -----|
                         |
                         | 是否处于批量更新模式？
                         |
  dirtyComponents <--- Y - N ---> batchedUpdates ===> 遍历 dirtyComponents
                                                              ||
                                                       updateComponent
                                                              ||
                                                   更新 pending state or props
```

setState 中还涉及事务及事件系统，请参考以下文章：

- [React Transaction 机制](https://front-ender.cn/react/react-transaction.html)
- [setState 及事件系统](https://front-ender.cn/react/react-tips.html)

## diff 算法

### diff 策略

- DOM 节点跨层级的移动操作特别少，可以忽略不计
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
- 对于同一层级的一组子节点，可以通过唯一 id 进行区分

### tree diff

> 对树进行分层比较，两棵树只会对同一层次的节点进行比较

开发组件时，保持稳定的 DOM 结构有助于性能的提升。建议不要进行 DOM 节点跨层次操作。

### component diff

- 同一类型的组件，按照原策略继续比较 Virtual DOM 树
- 不是同一类型的组件，将该组件判断为 dirtyComponent，进而替换整个组件下的所有子节点
- 同一类型的组件，可通过 shouldComponentUpdate() 判断该组件是否需要进行 diff 算法分析

### element diff

当节点处于同一层级时，diff 提供了 3 种节点操作，分别为 INSERT_MARKUP、MOVE_MARKUP 和 REMOVE_MARKUP。

尽量避免将最后一个节点移动到列表首部的操作。

### Patch 方法

遍历差异队列时，通过更新类型进行相应的操作，包括：新节点的插入、已有节点的移动和移除等。