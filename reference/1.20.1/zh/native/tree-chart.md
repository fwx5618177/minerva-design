# 树图

以整洁树、径向树、思维导图和组织架构图展示层级结构：组织、文件系统、分类体系、计划。整洁树（Buchheim / Reingold–Tilford 算法）保证节点不重叠，并让每个父节点居中于其子节点之上；子树可通过点击、键盘或 API 带动画地折叠和展开。

Package: minerva-design@1.20.1

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概览

TreeChart 接收节点和父 → 子的边；没有父节点的节点即为根（可用 tree.root 指定）。会形成环或第二个父节点的边会被忽略。

整洁树算法为线性时间，并考虑每个节点的尺寸：标签不会重叠，父节点居中于子节点之上，相同的子树形状一致。

layout="tree"（默认从左到右，可设任意方向）、"radial"（围绕根节点的同心圆，标签沿半径方向）、"mindmap"（分支在两侧均衡分布，每个分支一种颜色）以及 "org"（带标题和副标题的卡片、正交连线，叶子团队按列堆叠）。

点击有子节点的节点、在其上按 Enter，或调用 expand / collapse / toggle：其子树会带动画地收拢进该节点，并以徽标显示隐藏的节点数。节点设置 collapsed 可初始折叠。

林晓

陈子航

王思远

赵敏

孙悦

李明轩

周杰

郑雨涵

冯浩然

何俊

许婷

高翔

马丽

罗斌

梁晨

宋凯

唐诗雨

韩磊

首席执行官

首席技术官

首席财务官

首席运营官

首席营销官

前端负责人

后端负责人

前端工程师

前端工程师

后端工程师

后端工程师

站点可靠性工程师

财务总监

财务分析师

客服经理

物流经理

品牌经理

增长经理

管理层

技术部

财务部

运营部

市场部

公司组织架构图

点击负责人以折叠或展开其团队。

{{name}} 的团队已折叠

{{name}} 的团队已展开

产品发布

目标

1 万付费用户

品牌知名度

90% 留存

目标用户

产品团队

自由职业者

学生

推广渠道

发布会

邮件简报

合作伙伴

社交媒体

时间线

内测

媒体资料包

发布日

风险

延期

定价反馈

预算

广告

线下活动

产品发布计划思维导图

输入

导航

反馈

数据展示

布局

图表

设计系统的组件，按类别分组

文件夹

```tsx
代码
```

样式

数据

文档

全部展开

全部折叠

适应视图

项目文件

信用评分

收入 ≥ 3 × 月供？

在职满 2 年？

负债收入比 < 35%？

批准

批准，降低额度

批准，提高利率

人工审核

拒绝

700 及以上

600–699

低于 600

是

否

问题

批准

审核

拒绝

贷款审批决策树，高亮当前申请人的决策路径

结论：{{outcome}}，共回答 {{questions}} 个问题。

全部商品

电子产品

家居

服饰

运动

电脑

手机

音频

笔记本电脑

台式机

平板电脑

智能手机

手机壳

充电器

耳机

音箱

厨房

家具

园艺

锅具

咖啡机

刀具

沙发

书桌

办公椅

园艺工具

绿植

服装

鞋履

配饰

夹克

连衣裙

运动鞋

靴子

包袋

手表

户外

健身

骑行

帐篷

登山鞋

瑜伽垫

哑铃

自行车

头盔

 › 

搜索类目

商店的商品类目体系

{{total}} 个匹配的类目。按 Enter 或点击标签定位。

搜索类目，例如“靴子”或“书桌”。

Macintosh HD

系统

应用程序

媒体

文稿

缓存与备份

布局

树形

径向

按文件夹统计的磁盘占用，节点大小对应字节数

{{name}}：{{size}} —— 占 {{parent}} 的 {{parentShare}}，占磁盘的 {{share}}。

{{name}}：已使用 {{size}}。

App 2.0 版本

新用户引导

注册

邮箱验证

社交账号登录

产品导览

导览页面

跳过与恢复

支付

结账

银行卡表单

钱包支付

账单

发票

退款

平台

离线模式

同步队列

冲突处理

质量

崩溃报告

性能预算

{{points}} 点

{{points}} 点 · 已完成 {{done}}

汇总

已完成

进行中

待办

细节层级

交付物

功能

工作包

计划显示到：{{level}}。

移动应用版本的工作分解结构，含故事点

已折叠{{name}}：{{points}} 点，剩余 {{remaining}} 点。

已展开{{name}}：{{points}} 点，剩余 {{remaining}} 点。

共 {{points}} 个故事点，已完成 {{done}}。点击条目可折叠或展开。

四分之一决赛

半决赛

决赛

待进行

{{winner}}–{{loser}}

{{n}} 号种子

未进行

胜者

仍在比赛

已淘汰

冠军

下一轮

重新开始

重新模拟

从四分之一决赛到决赛的淘汰赛对阵图

{{team}}夺得冠军！

{{round}}胜者：{{teams}}。

八支球队按实力排定种子。进行下一轮以揭晓结果。

## TreeChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
