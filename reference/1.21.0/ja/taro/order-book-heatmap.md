# 板ヒートマップ

Bookmap 風の流動性ヒートマップ：時間と価格ごとの指値量を GPU で描画し、最良気配ライン、出来高に応じた約定バブル、現在の板のプロファイルを重ねます。ズーム・パン・十字カーソルでの読み取りに対応。ストリームは間隔ごとに列を追加し、スライドするウィンドウで表示します。

Package: minerva-design@1.21.0

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 読み方

ヒートマップは板の録画です。各列はある瞬間の板のスナップショットで、左から右へ並び、右端が現在です。

横軸は時刻（右が最新）、縦軸は価格です。任意の位置にホバーすると、クロスヘアがその時刻・価格の注文量を表示します。

セルの色はその時刻・価格に置かれている注文量です。暗いほどほとんど注文がなく、明るいほど（青 → シアン → 黄 → 白）注文が多くなります。左上の凡例が色に対応する数量の範囲と単位を示します。

明るい水平線は板に残り続ける大口注文（壁）です。線が途切れた所で注文は取り消されたか約定しました。価格線が壁の終点に届いていれば約定です。

価格に沿う赤と緑の線は最良売り気配と最良買い気配で、その間がスプレッドです。価格軸の塗りつぶした赤・緑のタグは現在の最良売り・買い気配、枠線のタグは直近の約定価格です。

点は約定です。緑は成行買い（売り注文を取る）、赤は成行売り（買い注文に当てる）で、面積はその列の出来高に比例し、大きなバブルは大口約定です。colorConvention="red-up" で 2 色が入れ替わります。

右側のバーは現在の板です。上の赤が売り注文、下の緑が買い注文で、長いほど数量が多く、下の目盛りが数量です。

#### 注目するパターン

支持と抵抗：価格が明るい線に何度も触れて反転するなら、大口注文が価格を受け止めています。

取り消し（見せ板）：価格が近づくと明るい線が消え、そこに約定バブルがない場合、注文は約定ではなく取り消されています。

スイープ：大きなバブルが連続して複数の価格を横切り、価格線が跳ね、通り道の流動性が暗くなります。

薄い流動性：価格の近くの広い暗い領域は注文が少ないことを示し、価格はそこを素早く通過できます。

BTC/USDT の流動性ヒートマップ

レンダラー：{{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

相場に追従中

自由表示（ズーム・パン済み）

相場に追従

カラースケール

対数

平方根

線形

コントラスト

×{{value}}

色の慣習

赤が上昇・緑が下落

緑が上昇・赤が下落

ホバー中の列：買い {{buys}} BTC、売り {{sells}} BTC

列にホバーすると出来高を表示します。

行の高さ

価格範囲

{{value}} USDT

自動

板に合わせる

{{time}} · {{price}} · {{size}} BTC {{side}} · 買い {{buys}} BTC、売り {{sells}} BTC

{{low}} – {{high}}

（買い側）

（売り側）

（スプレッド内）

セルにカーソルを合わせると詳細を表示します。

時間窓

ライブフィード

履歴をクリア

{{time}} に一時停止しました。

{{time}} に再開しました。

{{time}} に履歴をクリアしました。

保持している {{history}} のうち {{window}} を表示中。

BTC/USDT

現在値 {{value}}

スプレッド {{value}}

歩み値 {{value}} 件

BTC/USDT の板

BTC/USDT の歩み値

BTC-USD 無期限先物

1枚 = {{value}} BTC

資金調達率 {{rate}}

資金調達率 {{rate}}、{{time}} まで残り {{countdown}}

枚

板

テイカー買い

テイカー売り

BTC-USD 無期限先物の流動性ヒートマップ

{{price}}：板 {{contracts}} 枚（≈ {{notional}}）

ヒートマップにカーソルを合わせると板の枚数と金額を表示します。

## OrderBookHeatmap

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
