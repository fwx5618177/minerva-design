# 关系图

展示人物、组织、服务等实体之间的关系网络。节点由力导向布局（Barnes–Hut 算法，大图在 Web Worker 中计算）、环形布局或弧线图排布；节点和边由 GPU 绘制（WebGPU、WebGL2、WebGL，并可回退到 Canvas2D），数万个节点也能流畅交互。悬停节点高亮其邻居，可拖动节点、在图例中切换分组，也可以用键盘在图中漫游。

Package: minerva-design@1.22.1

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概览

GraphChart 接收节点、边以及可选的分组。分组决定颜色和图例，节点的数值决定圆的大小，边的标签说明关系类型。

布局：力导向（默认），包含连接力、多体斥力、向心力和碰撞力，并使用确定性随机种子；环形布局（按分组排列，边经圆心汇聚）；弧线图；也支持 dag 和树形布局（见“依赖图”和“树图”）。各布局算法也以纯函数导出，可在 Worker 和小程序中使用。

渲染与其他图表共用 GPU 后端，自动按 WebGPU → WebGL2 → WebGL → Canvas2D 回退；当前使用的渲染器通过 onRendererChange 和 data-renderer 属性告知。

标签会自动避让：缩小视图时只保留最重要节点的标签，放大或高亮时显示边的标签。

#### 交互与无障碍

拖动背景平移，按住 Ctrl / ⌘ 滚动或双指捏合缩放，拖动节点移动它（力导向模拟会随之调整），点击选中（Ctrl / ⌘ + 点击可多选），双击背景适应视图。角落的按钮可缩放和适应视图。

聚焦图表后用方向键在节点间移动；Enter 选中，+ 和 - 缩放，0 适应视图，Esc 清除。聚焦的节点会连同其分组和关系数被朗读。

内置文案（摘要、朗读提示、提示框、按钮）提供英文、中文、日文和法文，并跟随页面语言；颜色跟随浅色和深色主题。

刘备

关羽

张飞

诸葛亮

赵云

马超

黄忠

庞统

姜维

刘禅

魏延

法正

曹操

曹丕

司马懿

夏侯惇

夏侯渊

张辽

许褚

郭嘉

荀彧

典韦

曹植

司马昭

邓艾

孙权

孙策

孙坚

周瑜

鲁肃

吕蒙

陆逊

甘宁

黄盖

小乔

大乔

孙尚香

吕布

董卓

貂蝉

袁绍

汉献帝

王允

蜀汉

曹魏

东吴

群雄与汉室

结义兄弟

效力

父子

夫妻

手足

宿敌

师徒

义父

同盟

击败

总角之好

《三国演义》人物关系，按阵营着色

悬停人物或关系，点击选中；按住 Ctrl / ⌘ 滚动可缩放。

已选中：{{name}}

{{source}} → {{target}}：{{relation}}

、

成员 {{id}}

社区 {{n}}

生成的网络：40 个社区共 10,000 名成员

{{nodes}} 个节点 · {{edges}} 条连线 · 渲染器：{{renderer}} ·

正在 Web Worker 中模拟…

布局用时 {{seconds}} 秒

接入层

交易

身份

数据

边经圆心汇聚成束

微服务之间的调用，按业务域分组

系统级

函数式

面向对象

脚本

影响

编程语言之间的影响关系

力导向

环形

弧线图

布局

点击人物使其居中。

{{name}}：{{links}} 条关系

布局：{{layout}}

购物车

待支付

已支付

已发货

已签收

已退款

已取消

下单

修改购物车

支付

重试支付

超时

取消

支付撤回

发货

退款

物流更新

签收

退回寄件人

退货

评价

进行中

履约

已结束

实心箭头

订单状态及其之间的事件

正常

降级

严重

p95 {{value}} ms

{{value}} 次/秒

实时更新

在线商城的服务拓扑及各服务的实时健康状态

点击服务查看其指标。

{{name}}：{{status}} · p95 {{latency}} ms · 错误率 {{errors}} · {{rps}} 次/秒。

正常 {{healthy}}、降级 {{degraded}}、严重 {{critical}} · 更新于 {{time}}

玛丽·居里

皮埃尔·居里

阿尔伯特·爱因斯坦

马克斯·普朗克

尼尔斯·玻尔

维尔纳·海森堡

莉泽·迈特纳

奥托·哈恩

埃米·诺特

巴黎

华沙

维也纳

柏林

苏黎世

哥本哈根

索邦大学

威廉皇帝学会

苏黎世联邦理工学院

尼尔斯·玻尔研究所

放射性

相对论

量子理论

不确定性原理

核裂变

诺特定理

出生于

任职于

就读于

配偶

贡献于

位于

影响了

属于

合作者

相关

人物

地点

机构

理论

搜索人物、地点或理论…

搜索知识图谱

没有匹配的实体。

物理学家及其相关地点、机构与发现的知识图谱

搜索实体或点击节点，列出图谱中关于它的事实。

{{name}}：{{total}} 条事实 — {{facts}}

→ {{name}}（{{relation}}）

← {{name}}（{{relation}}）

大学同学

同事

攀岩俱乐部

读书会

四个圈子中 24 人之间的好友关系

{{name}} 可能认识：{{list}}。

{{name}}（共同好友 {{mutual}} 位）

{{name}} 已经认识所有好友的好友。

点击其他人以更新推荐。

设备 {{id}}

银行卡 •••• {{last4}}

账户 {{id}}

登录设备

支付卡

账户

可疑账户

设备

银行卡

低

中

高

深色主题

账户、设备与银行卡，其中两个欺诈团伙共用设备和银行卡

关联簇：{{accounts}} 个账户、{{devices}} 台设备、{{cards}} 张银行卡 · 风险：{{risk}}

点击账户、设备或银行卡以选中整个关联簇。

## GraphChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
