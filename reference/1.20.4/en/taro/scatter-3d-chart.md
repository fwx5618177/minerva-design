# 3D scatter chart

Point clouds in a 3D box you can orbit: hundreds of thousands to millions of points on the GPU, colored per series, per point or through a color scale, with hover picking, legend and color bar. Line3DChart draws 3D trajectories.

Package: minerva-design@1.20.4

Renderer: taro

Locale: en

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

Setosa

Versicolor

Virginica

Sepal length (cm)

Sepal width (cm)

Petal length (cm)

3D scatter chart of three flower species by sepal length, sepal width and petal length

Bulge and bar

Old disk

Young stars

HII regions

Halo

{{value}} kpc

A barred spiral galaxy of one million stars: bulge, spiral arms with young stars, HII regions and dust lanes, disk and halo

Exposure

Exposure ×{{value}}

Sensors

Sensor {{id}} · humidity {{humidity}}%

{{value}} °C

Length (m)

Width (m)

Height (m)

Temperature

Temperature of 300 sensors in a warehouse, by position and height

Backbone 1

Backbone 2

Base pairs

Auto rotate

Projection

Perspective

Orthographic

Rotating DNA double helix

Torus knot

200,000 points around a torus knot, colored by height

Backend

Auto

WebGPU

WebGL2

WebGL

Canvas2D

Starting…

Backend in use: {{backend}}

{{requested}} is not available here: drawing with {{backend}}

Trajectory

Time

{{value}} s

Trajectory of the Lorenz attractor, colored by time

Swiss roll

Position on the roll

Front

Side

Top

Reset

Azimuth {{azimuth}}°, elevation {{elevation}}°, zoom ×{{zoom}}

Drag to rotate, Shift + drag to pan, Ctrl / ⌘ + wheel to zoom, double-click to reset.

Swiss roll point cloud colored by the position along the roll

Sports

Politics

Technology

Health

Finance

Travel

{{topic}} article #{{n}}

Nearest neighbours

Component {{n}} ({{variance}})

News article embeddings on their first three principal components, by topic

Closest to {{doc}}: {{list}}.

{{doc}} ({{distance}})

Click an article to find its nearest neighbours.

Lidar returns

Color by

Height

Intensity

Dark theme

Lidar point cloud of a street with buildings, trees and parked cars

{{points}} points. Hover the cloud to read a return.

Height {{height}}, intensity {{intensity}}.

{{shell}} {{n}}

Broadband (LEO)

Earth imaging (polar)

Navigation (MEO)

Geostationary

Earth

Play

Thousands of km

Satellites of four orbital shells moving around the Earth

{{shell}}: altitude {{altitude}}, speed {{speed}}, one orbit every {{period}}.

Hover a satellite to read its orbit.

Technology

Healthcare

Energy

Financials

Consumer

{{ticker}} · {{cap}}

Orthographic view

Volatility

Beta

Annual return

Stocks by volatility, beta and annual return, sized by market capitalization

{{ticker}} ({{sector}}): return {{ret}}, volatility {{volatility}}, beta {{beta}}, Sharpe ratio {{sharpe}}, market cap {{cap}}.

Click a stock to pin its figures.

## Line3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Scatter3DChart

Support: n/a

Not exported: these components need a DOM and WebGPU / WebGL (virtualized DOM panels, GPU rendering), which mini-program views do not provide. Use a web-view page that renders the web component (minerva-design/charts) on mini-programs. Unsupported on this platform.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
