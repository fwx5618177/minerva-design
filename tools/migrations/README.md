# 从 novel-ui 迁移到 Minerva Design

这两个补丁针对本工作区 2026-10-09 的前台和后台源码，包含组件调用、事件、主题变量和样式钩子的迁移。原项目没有被修改。其他版本先检查补丁，不要强制套用。

## 应用已验证的补丁

在组件库目录构建本地安装包：

```sh
pnpm --filter minerva-design build
pnpm --filter minerva-design pack --pack-destination /tmp
```

在前台项目目录执行（将下面的组件库路径替换为实际绝对路径）：

```sh
git apply --check /path/to/minerva-design/tools/migrations/novel-front.patch
git apply /path/to/minerva-design/tools/migrations/novel-front.patch
pnpm add /tmp/minerva-design-0.0.0.tgz
pnpm exec tsc --noEmit --skipLibCheck
pnpm build
```

后台同样执行，将补丁换成 `novel-admin.patch`。补丁中的 `0.0.0` 是当前本地产物版本，不是已发布的 npm 版本；必须安装本地包，并提交消费者新生成的锁文件。

## 本次采用的契约

| 旧契约                                  | 新契约与迁移方式                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------- |
| `@novel-isr/ui` / `styles.css`          | `minerva-design` / `style.css`                                                          |
| `Spinner`、`EmptyState`、`Autocomplete` | `ProgressIndicator`、`Empty`、`AutoComplete`                                            |
| `intent`、`colorScheme` 和旧颜色        | 使用 `color`；`accent` 采用 `primary`，`secondary` 采用 `neutral`，相关业务类型同步更新 |
| Modal 的 `onClose`                      | `onOpenChange` 只在收到 `false` 时执行旧关闭逻辑                                        |
| AutoComplete 的旧选项                   | `id` 改 `value`，`hint` 改 `description`；选择回调接收字符串值                          |
| Tooltip 的定位和暗色外观                | 使用 `placement`；跟随当前主题的中性色外观                                              |
| Pagination 的两个回调                   | 统一 `onChange(page, pageSize)`，保留页数变化及容量变化处理                             |
| `--ui-*` 与内部 `.ui-*` 组件选择器      | 公共主题变量与稳定的 `data-minerva-*` 样式钩子；业务自建的 `.ui-*` 类保留               |
| React 版本                              | React 与 React DOM 19；宿主框架自己的版本要求仍需满足                                   |

运行环境要求：前台保留原项目的 Node `>=22.21.1`；后台提升到组件库要求的 Node `^20.19.0 || >=22.12.0`。

此迁移保留业务行为，同时接受上面的 API 和视觉契约。它不是只替换依赖名的二进制兼容方案。

## 已执行的验证与范围

独立副本使用实际 `pnpm pack` 产物安装库运行时依赖，前台和后台均通过 TypeScript 检查与生产构建；前台完成 RSC/SSR、7 个 SSG 页面及 SPA 构建。浏览器验证前台搜索、主题、登录导航，以及后台主题、登录表单与密码显隐。前台生产服务通过本地 HTTPS 验证，避免其生产 CSP 的 `upgrade-insecure-requests` 把 HTTP 预取升级到没有 TLS 的端口。

迁移后的原项目单元测试也已执行：前台 49 项、后台 42 项全部通过（Vitest 5.0.3）。后台测试中的 mock 模块路径及 toast 方法同步迁移，避免测试仍调用旧包。

这里没有执行真实账号登录、后端写入或生产发布。上线前需使用项目自己的测试账号和后端完成业务验收。独立副本复用了原项目已有宿主依赖；应用补丁后应由项目包管理器生成锁文件，再在 CI 中执行干净安装。

## 迁移其他消费者

`node tools/migrate-novel-ui.mjs <consumer/src>` 默认只预览，追加 `--write` 才写入。它通过 TypeScript 符号识别导入和别名，避免改动同名局部变量。不能自动判定的业务颜色、选项结构或属性展开会给出需检查的位置。`tools/migrate-novel-styles.mjs` 提供显式的样式转换函数；补丁已经包含上述两个项目经过检查的样式变更。

工具的回归测试：`pnpm test:migration`。迁移完成仍需执行消费者类型检查、构建及业务回归。

启动两个迁移项目的生产服务后，可以复跑公共页面烟测：`node tools/migrations/verify-browser.mjs <前台HTTPS源地址> <后台源地址>`。它检查搜索、主题、登录导航、受控输入和密码显隐，不提交登录表单。仅本机回环地址允许使用开发自签名证书，远程地址仍验证 TLS。
