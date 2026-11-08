# 纯 HTML

无需构建步骤的完整页面：CDN 模块包、设计令牌、<minerva-config>、带校验的表单以及事件监听器。另附按元素加载模块所需的 import map。

Package: minerva-design@1.23.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 完整页面

在  中放两个标签就够了：设计令牌样式表，以及自包含的模块包（包含所有元素、Lit 和 minerva-design/core）。复制此文件并在浏览器中打开：

tokens.css 定义了设计令牌（颜色、间距、圆角、字体），元素和你自己的 CSS 都可以通过 var() 使用它们。

带 root 的  会把主题（此处跟随操作系统）、调色板以及内置文案的语言应用到整个文档。

这些控件是表单关联的：name、required、value / checked 属性、、type="submit" 和 type="reset" 按钮、FormData 以及浏览器的校验都与原生输入框一样工作。只有当所有控件都有效时才会触发 submit 事件。

minerva-* 事件会冒泡，因此在表单（或 document）上的单个监听器即可接收所有控件的变化；event.target 是对应元素，event.detail 包含新值。

通过脚本设置 property（modal.open = true）永远不会触发事件；关闭按钮和 Escape 键会关闭模态框并触发 minerva-open-change。

### 图表与图标

图表与图标元素需要加载引擎（minerva-design/charts/core 的图表、图标集），因此不包含在 minerva.js 中。每个可选入口在同一个 cdn 目录下都有自己的自包含文件：chart.js（直角坐标与形状图表）、trading-chart.js、order-book.js、chart-3d.js、graph.js、quadrant-task-board.js 和 icon.js。在 minerva.js 之外按页面需要加载：

没有打包工具或 import map 时，module 脚本无法 import "minerva-design/web-components/chart"：浏览器不解析裸模块名，图表元素不会被注册（尺寸为 0 × 0）。请改用  加载 CDN 文件。两个文件都包含的元素只注册一次，以先加载的文件为准。

### 通过 import map 按元素加载模块

CDN 模块包包含所有元素。若只想下载页面用到的元素，可以改为加载包中按元素拆分的模块（dist/elements/.js）。它们正是构建工具所使用的文件，以裸模块说明符导入依赖，由浏览器中的 import map 负责解析：

这些模块会导入 lit（包括 lit/decorators.js 和 lit/directives/*，因此需要 "lit/" 前缀）、minerva-design/core（它本身依赖 @floating-ui/dom），以及仅 HTML 预览和 JSON 字段需要的 dompurify 和 jsonc-parser。esm.sh 会为你解析这些包的依赖；如果自行托管文件，还需要映射 @floating-ui/dom、@floating-ui/core 和 @floating-ui/utils。

生产环境中请使用精确版本，并确保所有模块加载的是同一份 lit 和 minerva-design/core：在同一页面中混用 CDN 模块包和按元素拆分的模块会把共享代码下载两次，而且每个标签都会保留最先注册它的定义。

### 下一步

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minerva without a build step</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/minerva.js"></script>
    <style>
      body {
        margin: 0;
        font-family: var(--font-family-sans);
        background: var(--background-color);
        color: var(--foreground-color);
      }
      form {
        display: grid;
        gap: var(--space-4);
        max-width: 420px;
        margin: var(--space-8) auto;
      }
      /* hide the tags until the bundle has defined them */
      :not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <!-- theme, palette and language of everything inside -->
    <minerva-config theme="system" palette="cool" locale="en" root>
      <form id="signup">
        <label for="email">Email</label>
        <minerva-input id="email" name="email" type="email" required clearable></minerva-input>

        <label for="plan">Plan</label>
        <minerva-select id="plan" name="plan" value="pro" required>
          <minerva-option value="free">Free</minerva-option>
          <minerva-option value="pro">Pro</minerva-option>
          <minerva-option value="team">Team</minerva-option>
        </minerva-select>

        <minerva-checkbox name="terms" required>I accept the terms</minerva-checkbox>
        <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>

        <minerva-button type="submit">Create account</minerva-button>
        <minerva-button type="reset" variant="ghost">Reset</minerva-button>
        <output id="last-change" aria-live="polite"></output>
      </form>

      <minerva-modal id="done" label="Welcome!">
        <p id="summary"></p>
        <minerva-button slot="footer" id="close">Close</minerva-button>
      </minerva-modal>
    </minerva-config>

    <script type="module">
      const form = document.querySelector("#signup");
      const modal = document.querySelector("#done");

      // custom events bubble: one listener on the form sees every control
      form.addEventListener("minerva-change", (event) => {
        document.querySelector("#last-change").textContent =
          `${event.target.name} changed`;
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // runs only when every control is valid
        const data = new FormData(form);
        document.querySelector("#summary").textContent =
          `${data.get("email")} — ${data.get("plan")} plan`;
        modal.open = true;
      });

      document.querySelector("#close").addEventListener("click", () => {
        modal.open = false;
      });
    </script>
  </body>
</html>
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/minerva.js"></script>
<!-- the chart elements and their engine (not part of minerva.js) -->
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/cdn/chart.js"></script>

<minerva-config theme="system" root>
  <minerva-chart id="sales" height="300"></minerva-chart>
</minerva-config>

<script type="module">
  // the data is the options property (no attribute)
  document.querySelector("#sales").options = {
    series: [
      { name: "Revenue", type: "bar", data: [42, 51, 48, 63, 72, 80] },
      { name: "Target", type: "line", curve: "smooth", data: [45, 50, 55, 60, 65, 70] },
    ],
    xAxis: { type: "category", categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
  };
</script>
```

```html
<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.23.1/dist/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
</script>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
