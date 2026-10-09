# Minerva Design 与 novel-isr-ui：代码调查和接续实现

调查日期：2026-10-09。结论来自本地源码、package.json、Git 历史、worktree 和 GitHub 仓库元数据；源码存在、构建成功、测试覆盖、真机可用和 npm 已发布是不同状态。

## 进入任务时的真实进度

主目录 `minerva-design` 位于 `20ffcdc`，已经完成仓库改名、单包发布结构、core/dom 拆分、共享令牌、状态机和测试实验。GitHub 已是 `fwx5618177/minerva-design`，origin 也已经更新。未发现当前代码中残留的 `lib-core` / `lib-react` 目录引用。

三个 `md-*` 是 Git linked worktree，共享一个仓库和对象库，各自拥有分支和工作目录：

| 目录       | 分支                  | 本次接入的已提交版本 |
| ---------- | --------------------- | -------------------- |
| md-vue     | feat/platform-vue     | 2ba1567              |
| md-native  | feat/platform-native  | a1e3ea2              |
| md-angular | feat/platform-angular | 005a3c4              |

这解释了为何主目录看似只有 React，但其他目录已有原生实现。本次只接入上述已提交版本，三个 worktree 的未提交文件保留在原处：Vue 的 AppShell / ThemeProvider / 演示、Angular 更多表单组件、Native 的完整演示屏和文档仍需单独审核后接入。不要直接删除这些目录；只有所有工作保存、合并并确认不再使用后，才适合 `git worktree remove`。

## 两个项目的差异

| 维度     | Minerva Design                                                                | novel-isr-ui                                             |
| -------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| 定位     | 面向公开分发的多框架、多平台设计系统                                          | 小说平台的业务通用 React UI 包                           |
| 发布     | 单 npm 包 `minerva-design`，各框架独立子入口                                  | `@novel-isr/ui`，GitHub Packages                         |
| 渲染     | React / Lit，以及接入中的 Vue、Angular、Native、Taro、微信和 uni-app          | React 19 / React DOM                                     |
| 交互实现 | 自研交互层；`core` 无 DOM，`dom` 提供焦点、浮层、定位等；定位使用 Floating UI | 多项交互基于 Radix；图标使用 lucide-react                |
| 样式     | 共享令牌、设计预设、公开 styling hooks、全量及按组件样式                      | SCSS 汇总 styles.css、`--ui-*` 语义变量和 `.ui-*` 类     |
| 主题     | ConfigProvider、嵌套主题、密度/圆角/阴影等轴、内置多语言                      | ThemeProvider、theme × palette、cookie 和 SSR 初始化脚本 |
| 验证     | 各平台单元测试、共享行为契约、生成元数据、文档和发布产物检查                  | React 单元/用户流程测试、类型检查和发布产物检查          |
| 组件目录 | React 下 59 个功能目录（组合部件不单独计数）                                  | 56 个功能目录（排除 **test**）                           |

两者有大量同类组件；Minerva 还独立提供 Cascader、TimePicker、VirtualList、ProgressIndicator 等。目录计数不等于导出组件数，也不能用于判断成熟度。已有相似视觉/主题方案并不意味着代码或 props 可直接互换。

## 从 novel-isr-ui 迁移时的具体差异

- 包入口：`@novel-isr/ui` → `minerva-design`；全局样式 `styles.css` → `style.css`。
- Button：`colorScheme` → `color`；`isLoading` → `loading`；`leftIcon/rightIcon` → `startIcon/endIcon`；`xs/sm/md/lg` → `xsmall/small/medium/large`。小说库的 `intent` 没有可以无条件照搬的等价项。
- 名称：`Autocomplete` → `AutoComplete`，`EmptyState` → `Empty`；Spinner 的使用需要结合 ProgressIndicator 的 API 重写。
- Token：不能把 `--ui-*` 覆盖直接搬给 Minerva；应按语义映射到 Minerva tokens 和公开 styling hooks。
- SSR：两者都有专用 `theme-utils` 服务端入口，迁移时仍须核对 cookie 名、解析函数和 Provider 的 props。
- 建议逐页/逐组件迁移并保留交互回归测试，本次未改动 novel-isr-ui 或其消费项目。

## 为什么 packages/minerva-design 必须保留

当前采用单包、多子入口的发布方式。`packages/core`、`dom`、`react` 等是私有源码工作区；它们分别将构建结果写入 `packages/minerva-design/dist`。后者负责 exports/typesVersions、可选 peerDependencies、CEM、许可证、打包以及产物测试，不是第二份 UI 实现。

删掉它意味着必须把发布元数据和组装逻辑迁到根目录，或改成多 npm 包；当前没有这种迁移的收益。根目录改用私有名 `minerva-design-workspace`，避免与实际发布包同名导致 pnpm filter 歧义。

`core` 和 `dom` 的区别：`core` 只能包含平台无关的状态机、令牌、契约和纯函数；`dom` 包含浏览器特有能力。公开 `minerva-design/core` 为兼容既有 Web API 仍指向两者的聚合，原生渲染器在仓库内只依赖 `@minerva/core`。

## 本次完成的接续工作

- 接入 Vue（原生 SFC 与 composables）和 React Native 的已提交实现。Native manifest 有 52 个条目，包含移动专属组件与别名，不能理解为 52 个 Web 组件完全对齐。
- 接入 Angular 配置、Button、Switch、Modal 与组合部件，公开 Angular APF 入口。未实现的 Monaco 占位入口不公开。
- Taro、微信原生、uni-app 从测试实验推进到 Button/Input/Switch 实现、单元测试和可分发文件。它们仅提供初始 API 子集，其余组件保持 planned。
- Taro 分发 JSX 转换后的模块；uni-app 保留 SFC，让消费者自己的平台编译器处理原生标签；微信输出 Component 注册及 WXML/WXSS/JSON，使用 npm 包的 miniprogram 字段。
- 更新文档的 Vue 演示、React Native 指南、平台支持矩阵及原生接入示例；矩阵明确区分实现状态和 npm 发布状态。

## 后续边界

当前未发布 npm，也未部署文档。小程序真机编译、微信开发者工具 npm 构建、uni-app 多目标构建、iOS/Android 实机运行仍需要实际平台工程验证；宿主测试不能代替这些验证。Angular 尚未实现的组件及其样式契约明确保留为待办，不能宣传为与 React 全量等价。

## 验证结果

- 全量 `pnpm test`：533 个测试文件通过，9,427 项测试通过；4 项预期差异、84 项 Angular 待办保留。待办不计作已实现功能。
- 发布产物 `pnpm test:dist`：6 个测试文件、214 项测试通过，包含打包安装与消费端构建，以及原生小程序文件检查。
- `pnpm check:package`：publint 严格检查和 Are the Types Wrong 检查通过；没有通过新增忽略规则掩盖类型解析问题。
- 全仓 `pnpm typecheck`、`pnpm lint`、`pnpm format:check` 通过。
- 各渲染器构建及文档生产构建通过；`pnpm install --frozen-lockfile --offline` 通过。
- 浏览器验证：平台矩阵正常显示，Vue Button 点击计数正常，React Native 按钮手机预览正常渲染。
- 独立复核后补齐微信 Button / Switch 的表单连接行为，并验证回归；类型检查也覆盖 Native 的共享契约驱动。

## 当前支持矩阵计数

以下按契约条目计数，包含组合部件，不能与前文组件目录数直接比较。beta 表示初始实现，仍须结合各组件注记判断可用范围。

| 平台           | stable | beta | planned | n/a |
| -------------- | -----: | ---: | ------: | --: |
| React          |    114 |    0 |       0 |  21 |
| Web Components |     96 |    0 |       0 |  39 |
| Vue            |     13 |   98 |      17 |   7 |
| Angular        |      0 |    8 |     127 |   0 |
| React Native   |      0 |   52 |      83 |   0 |
| Taro           |      0 |    3 |     132 |   0 |
| 微信原生       |      0 |    3 |     132 |   0 |
| uni-app        |      0 |    3 |     132 |   0 |
