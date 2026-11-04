# ミニプログラムのチャート

minerva-design/charts のうちキャンバスエンジンで描画するすべてのチャート — Chart、LineChart、AreaChart、BarChart、HorizontalBarChart、ScatterChart、QuadrantChart、CandlestickChart、HeatmapChart、Sparkline、RangeAreaChart、MixedChart、BubbleChart、HistogramChart、BoxPlotChart、WaterfallChart、GanttChart と、シェイプチャート PieChart、DonutChart、RadarChart、GaugeChart、FunnelChart、TreemapChart、SankeyChart、SunburstChart、RadialBarChart、CalendarHeatmap、BulletChart、ChordChart、ShapeChart — を Taro・uni-app・ネイティブ WeChat ミニプログラム向けに提供します。canvas type="2d" に描画し、Web のチャートと同じオプションを使います。

Package: minerva-design@1.20.6

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### 仕組み

ミニプログラムのチャートは、Minerva チャートエンジンのキャンバスレンダラーで、チャート全体（軸、データ、凡例、ツールチップ、注釈）を 1 つの  に描画します。minerva-design/charts の Web チャートと同じオプションとプリセットを受け取り、WeChat、Alipay、ByteDance などのミニプログラムと H5 で動作します。バンドルされるのはエンジンの 2D キャンバス部分のみで、WebGPU や WebGL のコードは含まれません。

createCanvasChart と createCanvasShapeChart の上に作られています。ほかのキャンバスでは minerva-design/charts/core から直接使えます（チャートエンジンを参照）。

### Taro（React）

minerva-design/taro からチャートをインポートします。props とコールバックは Web コンポーネントと同じです。チャートは親の幅いっぱいに広がり（width の既定は 100%）、height の既定は 320 px です。

ref は resetZoom()、getView()、setView(view)、getInstance()（キャンバスチャート）、resize() を公開します。キャンバス ID は自動生成され、id で指定できます。

### uni-app（Vue）

minerva-design/uni から単一ファイルコンポーネントをインポートします。props は Web と同じ（テンプレートではケバブケース）で、height には rpx を含む任意の CSS 長さを指定できます。チャートを更新するには series / points（またはシリーズの data 配列）を置き換えてください。その場で変更した配列は再読み込みされません。

イベント：hover、point-click、plot-click、zoom。QuadrantChart は代わりに point-click(point, index)、quadrant-click(quadrant, { x, y })、point-drop(point, index, { x, y, quadrant }) を発行し（point-drop のリスナーがあるとポイントをドラッグ可能）、各象限の上に配置される topLeft / topRight / bottomLeft / bottomRight スロットを受け付けます。テンプレート ref は resetZoom()、getView()、setView(view)、getRenderer()、getInstance()、resize() を公開します。

### ネイティブ WeChat ミニプログラム

npm install と WeChat DevTools での npm ビルドの後、usingComponents にコンポーネント（chart、line-chart、area-chart、bar-chart… 各チャートのケバブケース名。「すべてのチャートコンポーネント」を参照）を登録します。プロパティはケバブケースで setData を通じて渡され、関数（軸のフォーマット、ツールチップのテキスト）は selectComponent が返すインスタンスの configure() で渡します。

イベント（event.detail）：すべてのチャートが hover（{ items, x, xLabel }）、zoom（{ x, y } 表示範囲）、layout（プロット矩形、px）を発行します。シリーズチャートはさらに pointclick、plotclick（{ x, y }）、pointdrag / pointdrop（{ item, x, y }、interaction.dragPoints 使用時）を、quadrant-chart は pointclick（{ point, index }）、quadrantclick（{ quadrant, x, y }）、pointdrag / pointdrop（{ point, index, target: { x, y, quadrant } }）を発行します。

インスタンスメソッド：configure({ xAxis: { format }, yAxis: { format }, renderTooltip })（quadrant-chart では renderTooltip(point, index)）。\n で改行したテキストを返すか、null でツールチップを隠します。ほかに resize()、resetZoom()、getView()、setView(view)、getPlotRect()、toPixel(x, y)、fromPixel(x, y) があります。型は minerva-design/weapp/types にあります（NativeChartInstance、NativeQuadrantChartEvents など）。

### プロパティとイベント

すべてのチャート：height（既定 320、数値は px）、width（既定 100%）、legend、tooltip、crosshair、annotations、interaction、padding、palette、ariaLabel、disableScroll。

系列チャート（Chart、LineChart、AreaChart、BarChart、HorizontalBarChart、ScatterChart、CandlestickChart、RangeAreaChart、MixedChart、BubbleChart）は series、xAxis、yAxis と、対応する Web コンポーネントの props（area、curve、stacked、percent、labels、yAxis2、stackMode、orientation、minSize / maxSize…）を追加します。HeatmapChart、Sparkline、HistogramChart、BoxPlotChart、WaterfallChart、GanttChart はそれぞれのデータ props（data、values、groups、steps、tasks…）を受け取ります。Chart はローソク足やヒートマップを含む任意の type のシリーズを受け付けます。

QuadrantChart は象限の設定を受け取ります：points、xDomain、yDomain、xSplit、ySplit、quadrants、xLabel、yLabel、axisLabels、showTicks、reverseX、showLabels、pointSize、name、draggable。

イベントは Web のコールバックに対応します：ホバー、ポイントのクリック、プロットのクリック（空いている場所のタップ）、ズーム。QuadrantChart はポイントのクリック（point, index）、象限のクリック（quadrant, { x, y }）、ポイントのドロップ（point, index, { x, y, quadrant }）を通知します。チャート自体はポイントを動かさないので、points を更新してください。

### 言語とロケール

Web ではチャートはページの言語（）を読み取ります。ミニプログラムには  がないため、locale を指定しない場合、テキストと数値は実行環境の navigator.language（ある場合）に従い、なければ英語になります（Taro と uni-app の H5 ビルドは Web と同様に  を読み取ります）。すべてのチャートの locale prop にアプリの言語を渡してください。WeChat は zh_CN のような言語を返すため、アンダースコアをハイフンに置き換える（zh-CN）と数値と日付もその言語で書式化されます。

labels は座標系チャートの組み込みテキスト（ChartLabels：ローソク足の始値・終値の行、箱ひげ図の行、ガントの行、既定の系列名…）を、texts はシェイプチャートの組み込みテキスト（ShapeChartLabels：noData、value、share…）を上書きします。HorizontalBarChart と WaterfallChart では labels は値を表示する真偽値のままなので、テキストは locale にのみ従います。

locale を指定しない場合、チャートは最も近い ConfigProvider（ネイティブ WeChat では config-provider）の locale を使うため、1 つの provider でページ内のすべてのチャートをローカライズできます。チャート自身の locale が優先されます。アクセシブルネーム（aria-label）もローカライズされます。英語では「Chart: Revenue, Costs」、日本語では「グラフ：売上、コスト」のように、直交座標系チャートは系列名から作られます。図形チャートは種類名で呼ばれます（例：「Pie chart」/「円グラフ」、「Chord diagram」/「コードダイアグラム」、ゲージは「ゲージ：CPU」）。ariaLabel で置き換えられます。

locale、labels、texts を変更するとチャートが再描画されます。ユーザーがアプリの言語を切り替えたら設定し直してください（ネイティブ WeChat では setData）。

アプリの言語：ミニプログラムには  がない

関数は configure() で渡す：コードダイアグラムの目盛りラベル

始値

終値

フローはまだありません

アプリ

Web

ストア

### ジェスチャー

タップでツールチップを表示してポイントを通知し、指でなぞるとハイライトが移動し、2 本指でピンチズーム、1 本指でズーム中のチャートをパン、ダブルタップでズームをリセット、凡例項目のタップでシリーズを非表示にします。ドラッグ可能な象限のポイントは指に追従します。H5 とデスクトップのミニプログラムではマウスも使えます。

### テーマ

色とフォントは、外側の ConfigProvider / ThemeProvider（WeChat では config-provider / theme-provider）の Minerva トークンから取得されます。ライト / ダークモード、パレット、カスタムトークンテーマが適用され、プロバイダーが変わると更新されます。プロバイダーがない場合はライトのトークンが使われます。オプションの色には var(--token, fallback) 文字列を使え、--chart-series-1..8 トークンでシリーズのパレットを設定できます。

### 制限事項

 が必要です。レンダラーは選べず、WebGPU や WebGL2 はありません。

ツールチップとオーバーレイはキャンバスに描画されます。tooltip の render / renderTooltip はコンポーネントではなくテキストを返します。React コンテンツを使う renderTooltip と quadrantContent は Web と React Native のみです。uni-app ではスロットで象限の上にビューを置けます。WeChat では layout イベントと toPixel() で独自のビューを配置してください。

ホイールズーム（uni-app H5 の Ctrl / ⌘ + ホイールを除く）とキーボード操作はありません。

チャート上で指によるパン・ピンチ・ドラッグ中にページをスクロールさせたくない場合は disableScroll（WeChat では disable-scroll）を設定してください。Taro と uni-app では、ドラッグ可能な象限チャートで既定で有効です。

WeChat のプロパティは setData を通るため、データは JSON である必要があります（時間軸では Date ではなくタイムスタンプ、型付き配列は不可）。更新のたびにコピーされるため、非常に大きなデータは Web より遅くなります。

WeChat ではコンポーネントが pointdrop ハンドラーの有無を判別できないため、ドラッグを有効にするには draggable を明示的に設定してください。

マウント時に非表示のチャートは 0 px と計測されます。表示後に resize() を呼んでください（Taro は約 2 秒間再試行します）。

各プラットフォームで使えるコンポーネントはプラットフォーム対応に一覧があります。モバイルで React のリッチなツールチップが必要なら React Native のチャートを使ってください。

### すべてのチャートコンポーネント

minerva-design/charts のうちキャンバスエンジンで描画する各チャートには、Taro と uni-app で同じ名前のコンポーネントが、ネイティブ WeChat ではケバブケースのコンポーネント（AreaChart → area-chart）があります。props は Web コンポーネントと同じエンジンのプリセットに対応するため、チャートは Web とミニプログラムで同じ見た目と動作になります。

グループ

Taro と uni-app

WeChat（usingComponents）

軸のあるチャート

シェイプチャート

ミニプログラム非対応

props は Web コンポーネントと同じです。AreaChart は curve、stacked、percent、HorizontalBarChart は stacked、percent、labels、HistogramChart は values と bins、BoxPlotChart は groups または series、WaterfallChart は steps、GanttChart は tasks、today、todayLabel、HeatmapChart は data とカテゴリ、Sparkline は data と type（既定の高さ 48 px）を受け取ります。

使うコンポーネントをフォルダ名で登録します。Date は setData を通らないため、タイムスタンプを渡してください（ガントのタスク、時間軸）。関数オプションは configure() で渡します：format（heatmap-chart、sparkline、waterfall-chart）、formatBin（histogram-chart）、formatProgress（gantt-chart）、軸の書式、renderTooltip。

SunburstChart は親をタップすると拡大し、中央をタップすると上の階層に戻ります。Taro では onDrill、uni-app と WeChat では drill イベント（bind:drill）、インスタンスでは drill(path) と getDrillPath() を使います。drillPath を指定するとドリルダウンを制御できます。

TradingChart、DepthChart、OrderBook、OrderBookHeatmap、TimeAndSales と 3D チャート（Scatter3DChart、Surface3DChart、Bar3DChart、Line3DChart）は DOM と WebGPU / WebGL が必要なため、ミニプログラムのコンポーネントはありません。代わりに web-view ページで Web コンポーネントを表示してください。

Web コンポーネントのプリセットオプションもそのまま使えます：WaterfallChart の connector（true、false または { color, dash, width }）、HeatmapChart の colorScale（"sequential"、"diverging" または色の配列）と colorMidpoint、GanttChart の dependenciesName、dependencyArrows（先行タスクからの折れ線の矢印、既定で表示）と dependencyColor（タスクの dependencies と併用）、BoxPlotChart の outlierShape と outlierSize。

### ローソク足、ヒートマップ、曲線、積み上げ

系列はそのままエンジンに渡されるため、新しい系列の機能はすべてのミニプログラムのチャートで使えます。Chart で type "candlestick"（ポイントは { x, open, high, low, y }、y は終値）と type "heatmap"（セルは { x, y, value }）を使い、折れ線と面の系列に curve: "smooth" / "step" と stack を指定し、showLabels で棒の値を表示し、棒ごとに color を指定できます。

minerva-design/charts/core の heatmapChartOptions({ data, xCategories, yCategories }) は、ヒートマップの系列、カテゴリー軸、凡例・ツールチップ・操作の設定を返します。それらを Chart に渡してください。

AreaChart、CandlestickChart、HeatmapChart、Sparkline などの名前付きコンポーネントは、すべてのミニプログラムで利用できるようになりました（「すべてのチャートコンポーネント」を参照）。複数のタイプを混ぜるには、type 付き系列の Chart が引き続き便利です。ネイティブ WeChat では系列が setData を通るため、プレーンな JSON である必要があります（系列ごとの format 関数は渡せないので、軸の書式・値の書式・ツールチップには configure() を使います）。

### シェイプチャート

PieChart、DonutChart、RadarChart、GaugeChart、FunnelChart、TreemapChart、SankeyChart、SunburstChart、RadialBarChart、CalendarHeatmap、BulletChart は Web のシェイプチャートと同じ props（data、innerRadius、centerValue、indicators、bands、sort、headers、links、drillPath、range、ranges…、さらに palette、legend、tooltip、format、percentFormat、hidden、animation、padding、ariaLabel）を受け取り、createCanvasShapeChart で 1 つの  にラベル・凡例・ツールチップを描画します。ShapeChart は任意のシェイプタイプのエンジンオプション（type 付きの options）を受け取るため、エンジンに追加されたタイプにも新しいコンポーネントは不要です。タップでマークをハイライトしてツールチップを表示し、凡例項目のタップで非表示にします。既定の高さは Web コンポーネントと同じです（GaugeChart 240 px、RadialBarChart 300 px、SankeyChart と SunburstChart 360 px、CalendarHeatmap と BulletChart はデータから算出、ほかは 320 px）。

minerva-design/taro からインポートします。コールバックは onHover、onClick、onToggle（hidden と組み合わせて凡例を制御）、SunburstChart と ShapeChart では onDrill。ref は getInstance()（toggle、getHidden、clearHover、drill、getDrillPath…）と resize() を公開します。ツールチップはキャンバス上のテキストで、tooltip.render は文字列を返せます。renderTooltip はありません。

minerva-design/uni（または minerva-design/uni/PieChart.vue…）からインポートします。イベントは hover、click、toggle、drill（サンバースト）。height は rpx も指定でき、テンプレート ref は getInstance() と resize() を公開します。チャートを更新するには data 配列を置き換えます。

usingComponents に pie-chart、donut-chart、radar-chart、gauge-chart、funnel-chart、treemap-chart、sankey-chart、sunburst-chart、radial-bar-chart、calendar-heatmap、bullet-chart、shape-chart を登録します。プロパティは kebab-case の JSON 値で、format、percentFormat、ツールチップのテキスト（renderTooltip）は configure() で渡します。

イベント（event.detail）：hover（ハイライトされたマーク：index、name、value、percent、color、path。解除時は index が -1）、click（タップされたマーク）、toggle（{ index, hidden, hiddenIndexes }）、drill（{ path }、サンバースト）。メソッド：configure(config)、resize()、toggle(index)、getHidden()、clearHover()、drill(path)、getDrillPath()。型は minerva-design/weapp/types の NativeShapeChartInstance、NativeShapeChartEvents、各 *ChartProperties インターフェースです。

独自のキャンバスでエンジンを使う

任意の 2D キャンバスに createCanvasShapeChart（と createCanvasChart）で描画できます。ネイティブ WeChat プロジェクトでは「npm をビルド」後に require("minerva-design/charts/core") します。パッケージのミニプログラムフォルダーは DOM 不要のエンジンを charts/core.js として含み、チャートコンポーネントも同じモジュールを共有します（サイズは増えません）。Taro と uni-app では minerva-design/charts/core からインポートします。

タッチイベントを転送し（ミニプログラムのキャンバスのタッチはキャンバス相対の x / y を持ちます。H5 では clientX / clientY からキャンバスの位置を引きます）、サイズが変わったら resize(width, height)、ページのアンロード時に destroy() を呼びます。テーマはプレーンな値で、必要な Minerva の CSS 変数を theme.variables に渡します。

ChordChart はコードダイアグラムを描画します：グループ（名前または { name, color }）を円周上に並べ、行列またはリンクのリストからリボンを描き、矢印付きの有向フロー、並べ替え、送信元・送信先・グラデーションによる配色、値の目盛りに対応します（Web コンポーネントと同じ props）。既定の高さは 420 px。ネイティブ WeChat では tickFormat を configure() で渡します。

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type QuadrantPoint,
} from "minerva-design/taro";
import "minerva-design/tokens.mini.css";
import "minerva-design/taro/style.css";

export default function Dashboard() {
  const [picked, setPicked] = useState("");
  const [tasks, setTasks] = useState<QuadrantPoint[]>([
    { x: 8, y: 9, label: "Release" },
    { x: 3, y: 7, label: "Planning" },
  ]);

  return (
    <View className={miniTokenClassNames()}>
      <LineChart
        height={240}
        series={[{ name: "Sales", data: [12, 18, 9, 24] }]}
        xAxis={{ title: "Month" }}
        tooltip={{ render: (event) => `Sales: ${event.items[0]?.y}` }}
        onPointClick={(event) => setPicked(event.xLabel)}
      />
      <Text>{picked}</Text>
      <QuadrantChart
        points={tasks}
        reverseX
        showTicks={false}
        quadrants={{ topLeft: { label: "Do first" } }}
        axisLabels={{ top: "Important", left: "Urgent" }}
        onQuadrantClick={(quadrant, at) =>
          setTasks((list) => [...list, { ...at, label: "New task" }])
        }
        onPointDrop={(task, index, target) =>
          setTasks((list) =>
            list.map((p, i) => (i === index ? { ...p, x: target.x, y: target.y } : p)),
          )
        }
      />
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type ChartHandle,
  type ChartHoverEvent,
  type QuadrantDropTarget,
  type QuadrantPoint,
} from "minerva-design/uni";
import "minerva-design/tokens.mini.css";
import "minerva-design/uni/style.css";

const series = ref([{ name: "Sales", data: [12, 18, 9, 24] }]);
const tasks = ref<QuadrantPoint[]>([{ x: 8, y: 9, label: "Release" }]);
const picked = ref("");
const chart = ref<ChartHandle>(); // chart.value?.resize(), resetZoom()...

const show = (event: ChartHoverEvent) => (picked.value = event.xLabel);
function move(point: QuadrantPoint, index: number, target: QuadrantDropTarget) {
  // replace the array: arrays mutated in place are not read again
  tasks.value = tasks.value.map((p, i) =>
    i === index ? { ...p, x: target.x, y: target.y } : p,
  );
}
function add() {
  tasks.value = [...tasks.value, { x: 7.5, y: 7.5, label: "New task" }];
}
</script>

<template>
  <view :class="miniTokenClassNames()">
    <LineChart ref="chart" :series="series" height="480rpx" area @point-click="show" />
    <text>{{ picked }}</text>
    <QuadrantChart
      :points="tasks"
      :quadrants="{ topRight: { label: 'Do first' } }"
      :axis-labels="{ top: 'Important' }"
      @point-drop="move"
    >
      <template #topRight>
        <button size="mini" @click="add">+</button>
      </template>
    </QuadrantChart>
  </view>
</template>
```

```json
{
  "usingComponents": {
    "mn-line-chart": "minerva-design/line-chart/index",
    "mn-quadrant-chart": "minerva-design/quadrant-chart/index"
  }
}
```

```html
<mn-line-chart
  id="visits"
  series="{{series}}"
  x-axis="{{xAxis}}"
  area
  height="240"
  bind:pointclick="onPoint"
/>
<mn-quadrant-chart
  points="{{tasks}}"
  quadrants="{{regions}}"
  axis-labels="{{ends}}"
  draggable
  disable-scroll
  bind:pointdrop="onDrop"
  bind:quadrantclick="onQuadrant"
/>
```

```js
Page({
  data: {
    series: [{ name: "Visits", data: [["Mon", 3], ["Tue", 5], ["Wed", 4]] }],
    xAxis: { type: "category" },
    tasks: [{ x: 8, y: 9, label: "Release" }],
    regions: { topRight: { label: "Do first" } },
    ends: { top: "Important" },
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#visits").configure({
      yAxis: { format: (value) => `${value}k` },
      renderTooltip: (event) => `${event.xLabel}\n${event.items[0].y}k visits`,
    });
  },
  onPoint(event) {
    wx.showToast({ title: event.detail.xLabel, icon: "none" });
  },
  onDrop(event) {
    const { index, target } = event.detail;
    // the chart does not move points: update them
    this.setData({
      [`tasks[${index}].x`]: target.x,
      [`tasks[${index}].y`]: target.y,
    });
  },
  onQuadrant(event) {
    const { x, y } = event.detail;
    this.setData({ tasks: [...this.data.tasks, { x, y, label: "New task" }] });
  },
});
```

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  AreaChart,
  GanttChart,
  Sparkline,
  SunburstChart,
} from "minerva-design/taro";

const day = 86_400_000;
const start = Date.UTC(2026, 2, 2);

export default function Overview() {
  const [path, setPath] = useState<string[]>([]);
  return (
    <View>
      <Sparkline data={[42, 47, 45, 52, 58, 61]} type="area" />
      <AreaChart
        percent
        series={[
          { name: "Web", data: [["Q1", 42], ["Q2", 48], ["Q3", 51]] },
          { name: "App", data: [["Q1", 58], ["Q2", 52], ["Q3", 49]] },
        ]}
      />
      <GanttChart
        today={start + 10 * day}
        tasks={[
          { name: "Design", start, end: start + 12 * day, progress: 1 },
          { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
          { name: "Launch", start: start + 32 * day, milestone: true },
        ]}
      />
      <SunburstChart
        data={[
          { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
          { name: "Apps", value: 18 },
        ]}
        onDrill={(event) => setPath(event.path)}
      />
      <Text>{path.join(" / ")}</Text>
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  HeatmapChart,
  SankeyChart,
  SunburstChart,
  WaterfallChart,
  type ShapeDrillEvent,
} from "minerva-design/uni";

const cells = ref([
  { x: "Mon", y: "AM", value: 12 },
  { x: "Mon", y: "PM", value: 30 },
  { x: "Tue", y: "AM", value: 18 },
  { x: "Tue", y: "PM", value: 26 },
]);
const steps = ref([
  { label: "Revenue", value: 420 },
  { label: "Costs", value: -260 },
  { label: "Profit", kind: "total" as const },
]);
const links = ref([
  { source: "Ads", target: "Site", value: 60 },
  { source: "Search", target: "Site", value: 40 },
  { source: "Site", target: "Sign-up", value: 30 },
]);
const folders = ref([
  { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
  { name: "Apps", value: 18 },
]);
const path = ref<string[]>([]);
const onDrill = (event: ShapeDrillEvent) => (path.value = event.path);
</script>

<template>
  <HeatmapChart :data="cells" height="400rpx" />
  <WaterfallChart :steps="steps" orientation="horizontal" />
  <SankeyChart :links="links" />
  <SunburstChart :data="folders" @drill="onDrill" />
  <text>{{ path.join(" / ") }}</text>
</template>
```

```json
{
  "usingComponents": {
    "mn-gantt-chart": "minerva-design/gantt-chart/index",
    "mn-sunburst-chart": "minerva-design/sunburst-chart/index",
    "mn-bullet-chart": "minerva-design/bullet-chart/index"
  }
}
```

```html
<mn-gantt-chart id="plan" tasks="{{tasks}}" today="{{today}}" />
<mn-sunburst-chart data="{{folders}}" bind:drill="onDrill" />
<text>{{path}}</text>
<mn-bullet-chart data="{{kpis}}" ranges="{{ranges}}" />
```

```js
const day = 86400000;
const start = Date.UTC(2026, 2, 2);

Page({
  data: {
    // timestamps: Date objects do not survive setData
    tasks: [
      { name: "Design", start, end: start + 12 * day, progress: 1 },
      { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
    ],
    today: start + 10 * day,
    folders: [
      { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
      { name: "Apps", value: 18 },
    ],
    path: "",
    kpis: [{ name: "Revenue", value: 270, target: 250 }],
    ranges: [150, 225, 300],
  },
  onReady() {
    this.selectComponent("#plan").configure({
      formatProgress: (share) => `${Math.round(share * 100)}%`,
    });
  },
  onDrill(event) {
    this.setData({ path: event.detail.path.join(" / ") });
  },
});
```

```tsx
import { BarChart, Chart, LineChart } from "minerva-design/taro";
import { heatmapChartOptions } from "minerva-design/charts/core";

const prices = [
  {
    name: "ACME",
    type: "candlestick",
    data: [
      { x: 1, open: 102, high: 108, low: 99, y: 106 },
      { x: 2, open: 106, high: 107, low: 97, y: 98 },
      { x: 3, open: 98, high: 104, low: 96, y: 103 },
    ],
  },
] as const;

const load = heatmapChartOptions({
  data: [
    { x: "Mon", y: "AM", value: 12 },
    { x: "Mon", y: "PM", value: 30 },
    { x: "Tue", y: "AM", value: 18 },
    { x: "Tue", y: "PM", value: 26 },
  ],
});

export function Charts() {
  return (
    <>
      <Chart series={prices} height={220} />
      <Chart
        series={load.series}
        xAxis={load.xAxis}
        yAxis={load.yAxis}
        legend={load.legend}
        tooltip={load.tooltip}
        interaction={load.interaction}
        height={200}
      />
      {/* curve and stack are set on each series */}
      <LineChart
        area
        series={[
          { name: "Web", data: [20, 24, 30], curve: "smooth", stack: "users" },
          { name: "App", data: [12, 18, 17], curve: "smooth", stack: "users" },
        ]}
      />
      <BarChart
        series={[
          {
            name: "Orders",
            showLabels: true,
            data: [
              { x: "Q1", y: 128 },
              { x: "Q2", y: 212, color: "#16a34a" },
            ],
          },
        ]}
      />
    </>
  );
}
```

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  DonutChart,
  GaugeChart,
  ShapeChart,
  type ShapeHoverEvent,
} from "minerva-design/taro";

const plans = [
  { name: "Free", value: 5400 },
  { name: "Pro", value: 2100 },
  { name: "Team", value: 860 },
];

export default function Plans() {
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);
  const [hidden, setHidden] = useState<number[]>([]);
  return (
    <View>
      <DonutChart
        data={plans}
        height={260}
        centerValue="8.4k"
        centerLabel="users"
        percentFormat={(share) => `${Math.round(share * 100)}%`}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        onClick={setPicked}
      />
      <Text>{picked ? `${picked.name}: ${picked.value}` : "Tap a plan"}</Text>
      <GaugeChart value={72} label="Storage" height={200} />
      {/* any shape type of the engine, from its options */}
      <ShapeChart
        options={{
          type: "funnel",
          data: [
            { name: "Visit", value: 1200 },
            { name: "Sign up", value: 380 },
            { name: "Paid", value: 95 },
          ],
        }}
      />
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  PieChart,
  RadarChart,
  type ShapeChartHandle,
  type ShapeHoverEvent,
} from "minerva-design/uni";

const sources = ref([
  { name: "Search", value: 48 },
  { name: "Direct", value: 23 },
  { name: "Social", value: 16 },
]);
const picked = ref("");
const radar = ref<ShapeChartHandle>(); // radar.value?.getInstance()?.toggle(0)
const pick = (slice: ShapeHoverEvent) => (picked.value = slice.name);
</script>

<template>
  <PieChart :data="sources" labels="inside" height="520rpx" @click="pick" />
  <text>{{ picked }}</text>
  <RadarChart
    ref="radar"
    :indicators="[{ name: 'Speed' }, { name: 'Power' }, { name: 'Range' }]"
    :series="[{ name: 'Model A', values: [3, 4, 2] }]"
    shape="circle"
  />
</template>
```

```json
{
  "usingComponents": {
    "mn-pie-chart": "minerva-design/pie-chart/index",
    "mn-gauge-chart": "minerva-design/gauge-chart/index",
    "mn-shape-chart": "minerva-design/shape-chart/index"
  }
}
```

```html
<mn-pie-chart
  id="sources"
  data="{{sources}}"
  inner-radius="{{0.6}}"
  center-value="87"
  bind:click="onSlice"
  bind:toggle="onToggle"
/>
<mn-gauge-chart value="{{cpu}}" label="CPU" bands="{{bands}}" needle />
<mn-shape-chart options="{{treemap}}" height="300" />
```

```js
Page({
  data: {
    sources: [
      { name: "Search", value: 48 },
      { name: "Direct", value: 23 },
      { name: "Social", value: 16 },
    ],
    cpu: 64,
    bands: [
      { to: 70, color: "var(--success-color)" },
      { to: 100, color: "var(--danger-color)" },
    ],
    // shape-chart: any shape type, options without functions
    treemap: {
      type: "treemap",
      data: [
        { name: "Photos", value: 38 },
        { name: "Apps", children: [{ name: "Games", value: 14 }, { name: "Maps", value: 3 }] },
      ],
    },
    hiddenCount: 0,
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#sources").configure({
      percentFormat: (share) => `${Math.round(share * 100)}%`,
      renderTooltip: (slice) => `${slice.name}\n${slice.value} visits`,
    });
  },
  onSlice(event) {
    wx.showToast({ title: event.detail.name, icon: "none" });
  },
  onToggle(event) {
    this.setData({ hiddenCount: event.detail.hiddenIndexes.length });
  },
});
```

```js
// pages/plans/index.js, with <canvas type="2d" id="plans" bindtouchstart="onTouchStart" ...>
const { createCanvasShapeChart } = require("minerva-design/charts/core");

Page({
  onReady() {
    wx.createSelectorQuery()
      .select("#plans")
      .fields({ node: true, size: true })
      .exec(([res]) => {
        this.chart = createCanvasShapeChart({
          canvas: res.node,
          width: res.width,
          height: res.height,
          pixelRatio: wx.getWindowInfo().pixelRatio,
          options: {
            type: "pie",
            innerRadius: 0.62,
            data: [
              { name: "Free", value: 5400 },
              { name: "Pro", value: 2100 },
            ],
          },
          // plain values of the Minerva CSS variables
          theme: { variables: { "--primary-color": "#4f46e5" } },
        });
        this.chart.on("click", (slice) =>
          wx.showToast({ title: slice.name, icon: "none" }),
        );
      });
  },
  // mini-program canvas touches carry x / y relative to the canvas
  onTouchStart(e) { this.chart?.touchStart(e.changedTouches); },
  onTouchMove(e) { this.chart?.touchMove(e.touches); },
  onTouchEnd(e) { this.chart?.touchEnd(e.changedTouches); },
  onTouchCancel(e) { this.chart?.touchCancel(e.changedTouches); },
  onUnload() { this.chart?.destroy(); },
});
```

```json
{
  "usingComponents": {
    "mn-candlestick-chart": "minerva-design/candlestick-chart/index",
    "mn-chord-chart": "minerva-design/chord-chart/index"
  }
}
```

```html
<mn-candlestick-chart series="{{candles}}" locale="{{locale}}" labels="{{labels}}" />
<mn-chord-chart
  id="flows"
  groups="{{groups}}"
  matrix="{{matrix}}"
  locale="{{locale}}"
  texts="{{texts}}"
/>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
