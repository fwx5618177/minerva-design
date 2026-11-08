# 依存関係グラフ

階層状に描く有向非巡回グラフ：パッケージの依存関係、ビルドパイプライン、データリネージ、作業計画。Sugiyama レイアウトが閉路を解消し、層を割り当て、長いエッジにダミーノードを挿入し、交差を減らして長いエッジをまっすぐに保ちます。エッジは滑らかなスプラインまたは矢印付きの直交線です。ノードにホバーまたは選択すると上流と下流をすべて強調し、計画のクリティカルパスも表示できます。

Package: minerva-design@1.23.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

#### レイアウトの仕組み

DependencyGraph は layout="dag" の GraphChart です。ボックスはラベルに合わせた大きさで、すべてのエッジに矢印が付き、リネージを強調します。同じレイアウトは純粋関数 dagLayout としても使えます。

深さ優先探索の後退辺を反転して閉路を解消し、最長経路で層を決めたあと、ソースを後続ノードの近くへ、入出力の数が等しいノードを空いた層へ移動します。

複数の層にまたがるエッジにはダミーノードを挿入し、重心法と中央値法のスイープで各層を並べ替えて最良の順序を残し、最後に隣接ノードの入れ替えで交差を減らします。

層内の位置は隣接ノードに向けた重み付き単調回帰で決まり、長いエッジには大きな重みを与えてまっすぐ保ちます。TB、LR、BT、RL の向きに対応します。

highlight="lineage"（ここでの既定値）はホバー・フォーカス・選択したノードのすべての祖先と子孫を強調し、criticalPath は所要時間（ノードの value）の合計が最大の経路を強調します。

アプリケーション

フレームワーク

ライブラリ

ツール

開発依存

循環依存

モノレポのパッケージ間の依存関係

インストール

Lint

型チェック

単体テスト

セキュリティスキャン

アプリのビルド

ドキュメントのビルド

E2E テスト

ビジュアルテスト

パッケージ化

ステージングへデプロイ

本番へデプロイ

成功

実行中

失敗

待機中

{{status}} · {{minutes}} 分

Web バンドル

型定義

リトライ

クリティカルパスを強調

CI/CD パイプライン：ジョブ、依存関係、状態

クリティカルパス：{{minutes}} 分 — {{path}}

 → 

売上ダッシュボード

継続率ダッシュボード

成長ダッシュボード

生データ

ステージング

データマート

ダッシュボード

生テーブルからダッシュボードまでのデータリネージ

{{name}}：上流 {{upstream}} 件、下流 {{downstream}} 件

テーブルやダッシュボードをクリックするとリネージを強調します。

完了

実行中

待機中

{{percent}} 完了

{{seconds}} 秒

ワーカー数

ワーカー × {{n}}

一時停止

実行

リセット

スケジューラーの実行状態で色分けした monorepo のビルドタスク

ワーカー × {{workers}} でビルドが {{seconds}} 秒で完了しました。

{{elapsed}} / {{seconds}} 秒 — 実行中: {{running}}。

なし

どのスケジュールもクリティカルパスより速くはなりません: {{seconds}} 秒。

企画概要

ユーザー調査

サイトマップ

ワイヤーフレーム

ビジュアルデザイン

コピーライティング

API とホスティング

CMS 設定

フロントエンド実装

コンテンツ入稿

QA と修正

SEO レビュー

公開

調査

設計

開発

公開

Web サイト公開計画: タスク、依存関係、クリティカルパス

{{name}}: {{range}}、{{days}} 営業日。公開を遅らせずに {{slack}} 営業日ずらせます。

{{name}}: {{range}}、{{days}} 営業日。クリティカルパス上にあり、遅れはそのまま公開日に影響します。

全 {{days}} 営業日、{{date}} に公開。タスクをクリックすると日程と余裕日数を表示します。

成功

失敗

上流が失敗

失敗するタスク

夜間 ETL のタスクと、失敗したタスクおよびそれがブロックするタスク

{{task}} が失敗: {{total}} タスク中 {{blocked}} がブロックされ、{{sinks}} は配信されません。

{{task}} が失敗しましたが、依存するタスクはありません。

プログラミング入門

離散数学

微分積分

データ構造

コンピュータアーキテクチャ

線形代数

確率論

アルゴリズム

オペレーティングシステム

データベース

ネットワーク

機械学習

コンパイラ

分散システム

セキュリティ

深層学習

卒業研究

{{n}} 年次

流れの方向

上から下

左から右

下から上

右から左

情報科学の科目と前提科目

{{course}} の前に {{total}} 科目: {{list}}。

{{course}} に前提科目はありません。

単価

数量

割引 (%)

税率

小計

割引額

正味

税額

送料

合計

単位あたり費用

入力

数式

注文シートのセルと、数式が参照するセル

{{cell}} を変更: {{total}} セルを再計算しました（{{list}}）。合計: {{value}}。

## DependencyGraph

Support: n/a

DOM / GPU widget of minerva-design/charts (WebGPU or WebGL canvases with DOM overlays): not drawn by the native canvas chart engine; show the web version in a web view.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
