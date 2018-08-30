# Web

## 事件冒泡

## 性能优化

## Html 语义化

Html 语义化是使用一些语义化的标签来定义 html 的结构。语义化有以下好处：

- 使 html 文档 结构更加清晰
- 便于 SEO 搜索引擎识别文档内容，便于爬虫爬取网页内容以获取网页内容
- 便于一些盲人阅读器得到网页结构信息以便于对网页内容换方式重现

## cookie vs localStorage vs sessionStorage

<table>
  <thead>
    <tr>
      <th>特性</th>
      <th>cookie</th>
      <th>localStorage</th>
      <th>sessionStorage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据的生命周期</td>
      <td>一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效</td>
      <td>除非被清除，否则永久保存</td>
      <td>仅在当前会话下有效，关闭页面或浏览器后被清除</td>
    </tr>
    <tr>
      <td>存放数据大小</td>
      <td>4K左右</td>
      <td colspan="2">一般为5MB</td>
    </tr>
    <tr>
      <td>与服务器端通信</td>
      <td>每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题</td>
      <td colspan="2">仅在客户端（即浏览器）中保存，不参与和服务器的通信</td>
    </tr>
    <tr>
      <td>易用性</td>
      <td>需要程序员自己封装，cookie 接口不友好</td>
      <td colspan="2">原生接口可以接受，亦可再次封装来对 Object 和 Array 有更好的支持</td>
    </tr>
  </tbody>
</table>

## 同源策略及 CORS

同源策略是指三个相同：

- 协议相同
- 域名相同
- 端口相同

同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。

如果非同源，共有三种行为受到限制。

- Cookie、LocalStorage 和 IndexDB 无法读取
- DOM 无法获得
- AJAX 请求不能发送

CORS 是跨源资源分享（Cross-Origin Resource Sharing）的缩写。它是 W3C 标准，它允许浏览器向跨源服务器，发出 XMLHttpRequest 请求，从而克服了 AJAX 只能同源使用的限制。相比 JSONP 只能发 GET 请求，CORS 允许任何类型的请求。
