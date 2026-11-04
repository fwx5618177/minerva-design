# 专业交易图表

专业交易终端级图表：无间隙时间轴上的 K 线、指标副图、画线工具、委托线与实时推送，由 GPU 绘制，百万根 K 线依然流畅。

Package: minerva-design@1.20.3

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### 概览

TradingChart 接收 OHLCV K 线（对象数组，或用于超长历史的类型化数组列），通过图表引擎的 GPU 后端绘制；坐标轴、标签、画线与十字光标绘制在 Canvas2D 覆盖层上。

时间轴按 K 线序号排列：周末、夜盘休市和节假日不会留下空白，刻度标签随周期变化（新的一天、新的月份加粗显示）。

均线、布林带、肯特纳通道、唐奇安通道、VWAP、抛物线 SAR、一目均衡表和超级趋势叠加在价格上；成交量、MACD、RSI、KDJ、ATR、OBV、CCI、随机 RSI、DMI、威廉指标和 MFI 各占一个窗格，共享缩放和十字光标。拖动分隔线即可调整窗格高度。

带收线倒计时的最新价线、可见区间的最高 / 最低价、买卖标记、可见区间的成交量分布（POC 与价值区），以及可拖动、可撤销、可从价格轴直接创建的委托、持仓、止盈、止损和预警线。

趋势线、射线、箭头、水平线、垂直线、平行通道、安德鲁音叉、矩形、斐波那契回撤、文字注释、多 / 空头仓位工具和测量工具，可画在价格窗格或任意指标窗格上。选中画线后会出现浮动工具栏修改样式，Ctrl / ⌘ + Z 撤销。画线是普通数据，通过 drawings 和 onDrawingsChange 保存和恢复。

#### 实时推送

每笔成交调用 ref 上的 update(bar)：与最后一根 K 线时间相同则替换，时间更晚则追加。当最新 K 线在视图内时，图表会持续跟随；当用户回看历史时，视图保持不动，并显示一个回到最新 K 线的按钮。

每次推送只为最后一根 K 线重新计算指标、只把最后一根 K 线上传到 GPU，并在下一个动画帧绘制：每秒五十次更新几乎没有开销。缩小时 K 线按像素列聚合，绘制一百万根与绘制一千根同样快。

#### 操作方式

滚轮在指针位置缩放（Shift 或横向滑动可平移），拖动平移并带有惯性。

拖动价格轴可纵向缩放，拖动时间轴可调整 K 线宽度；双击坐标轴即可复位。

聚焦图表后：方向键逐根移动十字光标（按住 Shift 一次十根）并朗读价格，+ / − 缩放，Home / End 跳到第一根 / 最新 K 线，Delete 删除选中的画线，Ctrl / ⌘ + Z 撤销、Ctrl / ⌘ + Shift + Z 重做画线修改，Escape 取消。

开启 orderEntry 后：B / S 在十字光标价格（或最新价）处预备买入 / 卖出订单，↑ / ↓ 每次移动一个最小价位（Shift：十个），回车下单，Esc 放弃。订单类型随价格而定：低于最新价买入、高于最新价卖出为限价单，高于最新价买入、低于最新价卖出为止损单；Alt+B / Alt+S 可在限价与止损之间切换。O / Shift + O 依次选中可拖动或可撤销的价格线并以同样方式移动，Delete 撤销选中的订单。每一步（包括订单类型）都会被朗读，并触发与指针操作相同的事件（带 orderType 的 orderCreate、orderMove、orderCancel）。

触屏设备上：拖动平移，双指捏合缩放。

#### 多语言

图表自身绘制的文字（开高低收名称、委托与预警线标题、倒计时、测量工具、无障碍名称）内置英文、中文、日文和法文，并跟随页面语言（），切换语言时自动更新。成交量使用该语言的单位（中文为万 / 亿）。用 locale 指定其他语言，用 labels 替换任意文字。

涨跌颜色默认不跟随语言：中文页面也可能展示美股。红涨绿跌的市场请设置 colorConvention="redUp"；或设置 colorConvention="auto" 按 locale 自动选择：中国内地、台湾、日本和韩国（zh-CN、zh-TW、ja-JP、ko-KR，或不带地区的 zh / ja / ko）为红涨，其余地区（包括香港）为绿涨。

#### 工作流

多图布局：syncCharts 让多个图表共享十字光标时间和可见时间范围，不同周期也可以同步。

K 线回放：startReplay 隐藏某一时刻之后的 K 线，replayStep 和 replayPlay 再按所选速度逐根放出，指标会像实时行情一样重新计算。

时区与交易时段：timeZone 决定时间轴、时段分隔线和 VWAP 周期使用的时钟（含夏令时）。

图片与全屏：toDataURL 和 toBlob 把所有图层（K 线、坐标轴、画线和图例）合成为一张图片；requestFullscreen 让图表全屏显示。

图表设置

BTC/USDT

图表样式

1分

5分

15分

1小时

4小时

日线

周线

蜡烛图

空心蜡烛

平均 K 线

美国线

折线

面积图

基准线

MA

BOLL

VOL

MACD

RSI

KDJ

一目均衡表

超级趋势

成交量分布

自动

%

对数

BTC/USDT 交易图表，含成交量、MACD 和 RSI 副图

ETH/USDT

SOL/USDT

苹果 AAPL

欧元/美元

纳指期货 NQ

贵州茅台 600519

BTCUSDT 永续

暂停

继续

已暂停：在行情恢复之前，图表保持最后一根 K 线不变。

每秒 {{rate}} 次更新 · 最新价 {{price}}

实时更新的 ETH/USDT 一分钟图表

{{trades}} 笔成交

实时显示每一笔 SOL/USDT 成交

苹果日线图

画线工具

光标

趋势线

射线

延长线

水平线

垂直线

矩形

斐波那契回撤

测量

箭头

平行通道

安德鲁音叉

文字注释

多头仓位

空头仓位

保持画线模式

价格刻度包含画线

全部删除

画线：{{count}}

带画线的 ETH/USDT 四小时图

多单

止盈

止损

限价买入

限价卖出

预警

止损买入

止损卖出

买 {{quantity}}

卖 {{quantity}}

带持仓、委托和成交记录的 BTC/USDT 小时图

持仓与委托

{{name}} 已从 {{from}} 移到 {{to}}

拖动图上的虚线即可修改委托价格。

价格坐标

百分比

对数

线性

BTC、ETH 与 SOL 一年走势的百分比对比

按需加载更早 K 线的欧元/美元小时图

正在加载更早的 K 线…

已加载 {{loaded}} / {{total}} 根 K 线：向左滚动加载更多

显示全部

最新

{{bars}} 根 K 线 · 由 {{renderer}} 绘制

纳指期货一百万根一分钟 K 线

贵州茅台日线图，上涨为红色

24 小时涨跌

24 小时最高

24 小时最低

24 小时成交量

暗色终端中的 BTCUSDT 永续 15 分钟图

撤销

重做

下载图片

全屏

截图

NVDA 日线图截图

由 toDataURL 合成：K 线、坐标轴、图例和水印都在同一张 PNG 中。

NVDA 日线图，含 50 日和 200 日均线

英伟达 NVDA

成交量分布

价格档数

位置

右侧

左侧

POC {{poc}} · 价值区 {{low}} – {{high}}（70% 成交量）

BTC/USDT 15 分钟图，含可见 K 线的成交量分布

同步十字光标

同步时间范围

{{symbol}} {{timeframe}} 图表

回放控制

开始回放

重新选择起点

播放

下一根

速度

退出

点击开始回放，再点选一根 K 线回到那里。

点选一根 K 线：之后的 K 线将被隐藏。

第 {{index}} / {{total}} 根

用于 K 线回放的 ETH/USDT 1 小时图

已在 {{price}} 挂限价买单

已在 {{price}} 挂限价卖单

委托已从 {{from}} 改到 {{to}}

已撤销 {{price}} 的委托

可图上下单的 BTCUSDT 永续 5 分钟图

将鼠标移到图表上，点击右侧的 + 挂限价单（按住 Alt 为止损单），或聚焦图表后按 B / S；拖动价格线可改价，点击 × 撤单。

时区

纽约

伦敦

上海

东京

UTC

交易日分隔线

AAPL 十个交易日的 5 分钟图，含 VWAP

上涨通道：等待回踩确认

当前委托

{{count}} 档

{{count}} 根 / 秒

涨跌配色

红涨绿跌

跟随语言

绿涨红跌

#### 键盘操作

B S

预备买单 / 卖单

↑ ↓

调整价格（Shift：×10）

Enter

下单或确认改价

Esc

放弃

O

选中下一笔委托

Delete

撤销选中的委托

Alt+B Alt+S

切换限价单与止损单

已在 {{price}} 挂止损买入单

已在 {{price}} 挂止损卖出单

点击图表添加提醒；拖动可移动，× 可删除。

▲ 提醒

▼ 提醒

🔔

最多 {{value}} 个提醒：请先删除一个。

已在 {{price}} 设置提醒。

提醒已移至 {{price}}。

已删除 {{price}} 的提醒。

{{active}} 个有效提醒，已触发 {{fired}} 个。

{{time}}：价格上涨至 {{price}}。

{{time}}：价格下跌至 {{price}}。

带价格提醒的 AAPL 1 分钟图

ES（E-mini 标普 500）

#{{id}}

×

方向

做多

做空

开仓

平仓

点数

盈亏

{{price}} · {{time}}

查看

在图表上查看第 {{id}} 笔交易

净盈亏

胜率

{{rate}}（{{total}} 笔中 {{wins}} 笔）

盈利因子

平均盈利

平均亏损

标出交易日志中各笔交易的 E-mini 标普 500 15 分钟图

已平仓交易

在表格中选择一笔交易，在图表上查看。

第 {{id}} 笔：{{side}} {{contracts}} 张，{{pnl}}。

24 小时 {{value}}

开 {{value}}

高 {{value}}

低 {{value}}

收 {{value}}

量 {{value}}

周期

适合手机尺寸的 SOL/USDT 图表

## TradingChart

Support: n/a

Not exported: needs a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
