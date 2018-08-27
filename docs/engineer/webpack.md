# Webpack

## Loader

Webpack 使用 loader 来处理资源/文件，是一个导出为 function 的 node 模块，可以将匹配到的文件进行一次转换，同时 loader 可以链式传递。loader 函数的参数是 require 的源模块，处理 source 后把返回值交给下一个 loader。

典型的 loader “模版” 应该是这样的：

```javascript
module.exports = function (source) {
    // 处理 source ...
    return handledSource;
}
```

注意：如果是处理顺序排在最后一个的 loader，那么它的返回值将最终交给 webpack 的 require，换句话说，它一定是一段可执行的 JS 脚本 （用字符串来存储），更准确来说，是一个 node 模块的 JS 脚本，我们来看下面的例子。

## Plugin

Webpack plugin 用于扩展 webpack 的功能，是一个具有 apply 方法的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

plugin 是基于 Tapable 的，Tapable 允许你添加和应用插件到 JavaScript 模块中，类似于 NodeJS 的 EventEmitter，可以被继承和 mixin 到其他模块中。

## Loader VS Plugin

Loader 变相的扩展了 webpack，但是它只专注于转化文件（transform）这一个领域。而 plugin 的功能更加的丰富，而不仅局限于资源的加载。

> Loaders work at the individual file level during or before the bundle is generated.

> Plugins work at bundle or chunk level and usually work at the end of the bundle generation process. Plugins can also modify how the bundles themselves are created. Plugins have more powerful control than loaders.
