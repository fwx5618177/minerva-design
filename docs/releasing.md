# npm 发布：首版手动，后续 main 自动

唯一发布的 npm 包是 `packages/minerva-design`，首个正式版本为 **1.0.0**。根 workspace、内部 `@minerva/*` 包、文档站和宣传片制作工程不发布到 npm。正式版仍以文档支持矩阵声明的 API 和限制为边界。

后续版本必须递增：patch 为 1.0.1，minor 为 1.1.0，major 为 2.0.0。npm 不能重复发布同一个包名和版本。

## 一、首次手动发布 1.0.0

首版版本号和 CHANGELOG 已准备好，**不要再次运行 version-packages，也不要新增一个“首次发布”changeset**。

1. 在 npm 注册账号、验证邮箱、开启 2FA，并确认包名归属。首次发布前查询 `minerva-design` 返回 404 代表没有可见的公开包，不保证该名字一定可注册；若已存在包，需要账号拥有发布权限。
2. 同步 main，使用仓库指定的 Node 22 和 pnpm 11.23.0：

   ```bash
   cd /Users/fengwenxuan/Desktop/startup-project/front-ui-components-library/minerva-design
   git switch main
   git pull --ff-only
   nvm install
   nvm use
   pnpm --version
   pnpm install --frozen-lockfile
   ```

3. 确认工作区干净，并在该提交上完成检查；任一步失败先修复：

   ```bash
   git status --short
   pnpm lint
   pnpm build
   pnpm typecheck
   pnpm format:check
   pnpm test:release
   pnpm test:migration
   pnpm test:coverage
   pnpm --filter @minerva/docs check:mini-api
   pnpm exec playwright install chromium
   pnpm test:browser
   pnpm test:dist
   pnpm check:package
   pnpm --filter minerva-design pack --dry-run
   ```

   同时确认 GitHub 的 `CI` 工作流全部通过，包括 `Official mini SDK (taro/uni)`。检查 tarball 清单包含各平台运行文件、类型、样式、README、LICENSE 和 CHANGELOG。CI 通过不等于真实消费项目迁移验收。

4. 手动登录并发布：

   ```bash
   npm login --registry https://registry.npmjs.org/
   npm whoami --registry https://registry.npmjs.org/
   pnpm release
   git push origin main --follow-tags
   ```

   `pnpm release` 会构建后调用 Changesets 发布；按提示完成 2FA。`npm login` 负责身份认证，项目安装、版本管理、构建与打包继续使用 pnpm。自动发布开关此时保持未设置或 `false`。

5. 验证注册表和消费项目安装：

   ```bash
   pnpm view minerva-design@1.0.0 version --registry https://registry.npmjs.org/
   pnpm view minerva-design dist-tags --registry https://registry.npmjs.org/
   # 在一个独立的消费项目中执行：
   pnpm add minerva-design@1.0.0
   ```

## 二、一次性启用自动发布

首次发布成功后，在 npm 的 `minerva-design` 包 Settings → Trusted publishing 中添加 GitHub Actions：

| 字段                      | 填写值                             |
| ------------------------- | ---------------------------------- |
| Organization or user      | `fwx5618177`                       |
| Repository                | `minerva-design`                   |
| Workflow filename         | **`ci.yml`**（只填文件名）         |
| Environment name          | 留空（此工作流未设置 environment） |
| Allowed actions（若显示） | 允许直接 `npm publish`             |

该流程使用 GitHub 托管 runner 和 npm OIDC，不需要创建 `NPM_TOKEN` / `NODE_AUTH_TOKEN` Secret。工作流仅发布 job 拥有 `id-token: write`，会安装 npm 11；其余工具仍使用 pnpm。公开仓库通过 Trusted Publishing 发布时 npm 自动附加 provenance。

然后在 GitHub 仓库 Settings → Secrets and variables → Actions → **Variables** 新建：

```text
NPM_AUTO_RELEASE = true
```

这是 Repository variable，不是 Secret。建议最后才打开它。需要暂停发布时将它改为 `false`；不会中断已经开始的上传。

自动发布 job 通过 `GITHUB_TOKEN` 将版本号、CHANGELOG 和消费后的 changeset 提交回 main，并推送版本 tag。若 main 或 tag 有保护规则禁止该机器人写入，需要按组织规则配置最小范围的机器人写入权限；不要直接关闭 main 的整体保护。仓库显式声明 `contents: write`，仍受组织策略限制。若规则不允许机器人直接更新 main，应改用发布 PR 流程；当前流程会在 npm 上传前因推送失败而停止。

参考：[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/)。

## 三、之后每次合并 main 自动发布

1. 在功能分支开发，并添加 changeset：

   ```bash
   pnpm changeset
   ```

   选择 `minerva-design`，选择 patch / minor / major，填写用户可见的变更说明。将生成的 `.changeset/*.md` 与代码一起提交到 PR。**不用手动修改 package.json 版本，不用手动运行 version-packages。**

2. 合并到 main。流水线自动完成：

   ```text
   CI verify + Taro/uni SDK 构建全部通过
     → 检查首版已存在、当前提交仍是最新 main
     → 根据 changeset 更新版本与 CHANGELOG
     → 重新构建并检查版本化后的发布包
     → 提交版本变更到 main（普通 push，不 force push）
     → pnpm pack → npm OIDC publish
     → 推送 minerva-design@<版本> tag
   ```

   main 的 push（包括直接 push）都会触发；若只允许 PR 合并，请通过 GitHub 分支规则约束 main。多个待发布 changeset 按 Changesets 规则合并计算一次版本升级。纯文档修改没有 changeset，正常跳过 npm 发布。

3. 在 Actions → CI → `Publish npm release` 查看结果，再用 `pnpm view minerva-design version --registry https://registry.npmjs.org/` 确认。

main 工作流不在执行中取消，PR CI 仍可取消旧运行。GitHub Actions 的同一并发组可能合并等待中的运行；最新 main 会包含尚未消费的 changeset。机器人自己的版本提交使用 GITHUB_TOKEN，不触发下一轮 CI，避免循环；该提交只改变发布元数据，包产物在发布 job 中再次检查。

## 四、失败与重试

| 情况                                  | 操作                                                                                                                |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| CI 校验失败                           | 修复后合并；不会执行发布 job                                                                                        |
| npm 未发布首版 1.0.0                  | 先手动发布首版；自动化不会替你发布它                                                                                |
| main 在发布准备期间又有新提交         | 旧运行跳过或普通 push 被拒绝；以最新 main 的 CI 为准                                                                |
| 版本提交已推送，但 npm 认证或上传失败 | 修复 Trusted Publisher 配置；在 Actions → CI → **Run workflow** 选择 main，从最新版本提交重新完整校验并发布同一版本 |
| npm 发布成功，但推 tag 失败           | 修复 GitHub 权限后，在最新的机器人版本提交上 Run workflow；只补 tag，不重复发布                                     |
| 恢复前又合入新的 changeset            | 先恢复未发布的版本；脚本会拒绝把新的 changeset 静默并入旧版本                                                       |
| 403 / 404 认证失败                    | 核对 npm 包权限、大小写、owner、repo、`ci.yml`、environment 留空及 direct publish 权限                              |

不要只 rerun 一个过期提交的发布 job：它会因 main 已前进而跳过。恢复失败发布期间先暂停合并新的发布变更。不要手工删除版本提交或强推 main 来“重新发同一版”。如果 npm 已经接受某个版本，对代码的修复必须使用新的版本。

初次配置的 OIDC 授权和实际 npm 上传只有在账号完成上述设置后才能端到端验收；本地测试和 GitHub 的跳过状态都不能证明 npm 发布已成功。
