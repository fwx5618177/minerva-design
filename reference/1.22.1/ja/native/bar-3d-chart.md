# 3D 棒グラフ

x × y のカテゴリ格子上の棒：ライティングされた箱、系列ごとの色、系列をまたぐ積み上げ、高さや別の値によるカラースケールの色、凡例とカラーバー。

Package: minerva-design@1.22.1

Renderer: native

Locale: ja

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

売上

地域

月

北部

南部

東部

西部

中部

5 地域の月別売上

四半期

第1四半期

第2四半期

第3四半期

第4四半期

市場

米州

欧州

アジア

オセアニア

ハードウェア

ソフトウェア

サービス

売上高

4 市場における 3 製品ラインの四半期売上高（積み上げ）

女性

男性

年齢

{{from}}〜{{to}} 歳

{{from}} 歳以上

調査年

人口

{{value}} 百万人

4 回の国勢調査における年齢層・性別ごとの人口

訪問数

時刻

曜日

曜日・時間帯別のウェブサイト訪問数

製品

ノート PC

スマートフォン

タブレット

腕時計

オーディオ

利益率

4 市場における 5 製品の売上高と利益率

在庫あり

在庫僅少

{{value}} 個

ライブ更新

通路

通路 {{id}}

棚段

{{n}} 段目

数量

通路と棚段ごとの倉庫ロケーションの残り数量（ライブ更新）

在庫 {{total}} 個 · 僅少ロケーション: {{low}} / {{bins}} · 補充済み: {{restocked}}。

継続率

登録からの月数

{{n}} か月目

登録月

登録からの月数ごとの月次登録コホートの継続率

{{cohort}}コホートの {{n}} か月目: {{retention}} が継続中（{{total}} 人中 {{users}} 人）。

棒をクリックするとコホートの継続率を表示します。

開発

営業

マーケティング

オペレーション

サポート

経理

実績支出

会計年度

予算差異

部門

{{year}} 年度の 6 部門の四半期支出と予算差異

{{department}}・{{quarter}}: 予算 {{budget}} に対し支出 {{actual}}（{{variance}}）。

{{year}} 年度: 予算 {{budget}} に対し支出 {{actual}}（{{variance}}）。最大の超過: {{department}}・{{quarter}}（{{worst}}）。

{{value}} kW

吸気温度

ダークテーマ

3D 表示

平面図

ラック

列

{{id}} 列

消費電力

列と位置ごとのサーバーラック（高さは消費電力、色は吸気温度）

ラック {{rack}}: {{power}}、吸気 {{inlet}}、上限 {{limit}} を超えています。

ラック {{rack}}: {{power}}、吸気 {{inlet}}、上限 {{limit}} 以内です。

吸気温度が {{limit}} を超えるラック: {{total}} 台中 {{hot}} 台（{{racks}}）。ラックをクリックすると測定値を表示します。

## Bar3DChart

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
