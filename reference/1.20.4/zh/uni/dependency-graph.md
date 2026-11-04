# 依赖图

以分层方式绘制的有向无环图：包依赖、构建流水线、数据血缘、任务计划。Sugiyama 布局会打破环、分配层级、为跨层的边插入虚拟节点、减少交叉并让长边保持笔直；边可以是平滑样条或带箭头的正交连线。悬停或选中节点即可高亮其全部上游和下游，还能显示计划的关键路径。

Package: minerva-design@1.20.4

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 布局原理

DependencyGraph 即 layout="dag" 的 GraphChart：方框按标签自适应大小，每条边带箭头，并高亮上下游。同一布局也以纯函数 dagLayout 导出。

通过反转深度优先搜索中的回边来打破环；层级由最长路径确定，随后把源节点移到其后继旁边，并把出入边数相等的节点移到较空的层。

跨越多层的边会插入虚拟节点；再通过重心法和中位数法的多轮上下扫描重排每一层并保留最佳顺序，最后用相邻交换消除剩余交叉。

层内位置由朝向邻居的加权保序回归求得，长边权重很高，因此保持笔直。支持 TB、LR、BT 和 RL 四个方向。

highlight="lineage"（此处的默认值）会高亮悬停、聚焦或选中节点的全部祖先和后代；criticalPath 高亮总时长（节点 value）最长的链路。

应用

框架包

基础库

工具链

开发依赖

循环依赖

单体仓库中各个包之间的依赖关系

安装依赖

代码检查

类型检查

单元测试

安全扫描

构建应用

构建文档

端到端测试

视觉测试

打包

部署预发

部署生产

成功

运行中

失败

等待中

{{status}} · {{minutes}} 分钟

Web 产物

类型声明

重试

高亮关键路径

CI/CD 流水线：任务、依赖关系及其状态

关键路径：{{minutes}} 分钟 —— {{path}}

 → 

收入看板

留存看板

增长看板

原始数据

清洗层

数据集市

看板

从原始表到看板的数据血缘

{{name}}：上游 {{upstream}} 个，下游 {{downstream}} 个

点击数据表或看板以高亮其血缘。

已完成

运行中

排队中

已完成 {{percent}}

{{seconds}} 秒

Worker 数量

{{n}} 个 worker

暂停

运行

重置

monorepo 的构建任务，按调度器执行状态着色

构建完成，{{workers}} 个 worker 共用时 {{seconds}} 秒。

{{elapsed}} / {{seconds}} 秒 — 运行中：{{running}}。

无

任何调度都快不过关键路径：{{seconds}} 秒。

项目简报

用户研究

站点地图

线框图

视觉设计

文案撰写

API 与托管

CMS 配置

前端开发

内容录入

测试与修复

SEO 检查

正式上线

调研

设计

开发

上线

网站上线计划：任务、依赖关系与关键路径

{{name}}：{{range}}，{{days}} 个工作日，可推迟 {{slack}} 个工作日而不影响上线。

{{name}}：{{range}}，{{days}} 个工作日，位于关键路径上——任何延误都会推迟上线。

共 {{days}} 个工作日，{{date}} 上线。点击任务查看其日期与浮动时间。

成功

失败

上游失败

失败的任务

夜间 ETL 任务，标出失败的任务及其阻塞的任务

{{task}} 失败：{{total}} 个任务中有 {{blocked}} 个被阻塞，{{sinks}} 将无法交付。

{{task}} 失败，但没有其他任务依赖它。

程序设计导论

离散数学

微积分

数据结构

计算机体系结构

线性代数

概率论

算法

操作系统

数据库

计算机网络

机器学习

编译原理

分布式系统

信息安全

深度学习

毕业设计

第 {{n}} 学年

流向

从上到下

从左到右

从下到上

从右到左

计算机专业课程及其先修关系

修读{{course}}之前需完成 {{total}} 门课程：{{list}}。

{{course}}没有先修课程。

单价

数量

折扣 (%)

税率

小计

折扣额

净额

税额

运费

总计

单位成本

输入

公式

订单表的单元格及其公式引用的单元格

{{cell}}已修改：重算了 {{total}} 个单元格（{{list}}）。总计：{{value}}。

## DependencyGraph

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
