### v10.5.148 Debug 灵敏度与误报降级版

## v10.5.148 Debug 灵敏度与误报降级版

本版基于 v10.5.147 继续走“清补丁、归主线”的原则，但不再为了已确认的 iOS Safari 小偏差继续叠补丁。重点新增 Debug 灵敏度设置，让自检可以区分“真正阻断发布的问题”和“可查看但不阻塞的提示”。

### 本版处理

1. 新增 Debug 灵敏度四档：严格模式、标准模式、宽松模式、发布模式。
2. 设置页新增每一档说明，用户可以查看后决定使用哪种自检强度。
3. 一键自检新增 `debugSensitivity`、`issueStats`、`rawIssues`、`ignoredIssues` 字段，保留原始诊断，也记录降级/忽略过程。
4. 标准模式下，把已知 `jump-chip` 暗夜浅色背景审计误报、iOS Safari 顶部 16px 左右微偏移降级为 `info`，不再阻塞通过状态。
5. 发布模式只保留真正会阻断发布的核心错误，例如 JS 报错、重复 ID、版本跳动、模板串用、导航断链、主命名空间缺失等。
6. 同步更新首页版本、版本记录、README、manifest、service-worker 与知识库版本说明，继续保持 1 个主 style + 1 个主 script。

### Debug 灵敏度说明

- 严格模式：所有 warning 原样显示，适合开发、清补丁和排查真实样式问题。
- 标准模式：推荐日常使用；保留核心错误，把已知 iOS Safari 小偏差降级为提示。
- 宽松模式：适合普通使用测试；非阻塞视觉、未初始化、本地设置类 warning 多数降级为提示。
- 发布模式：只保留会阻断发布的核心问题，其余提示放到 `ignoredIssues` 里备查。

### 上传文件

请把 zip 内全部 8 个文件上传到 GitHub 仓库根目录：

- `index.html`
- `README.md`
- `manifest.webmanifest`
- `service-worker.js`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`
- `home-poster-v10.5.144.webp`

### 测试建议

1. 上传全部文件后，Safari 强制刷新。
2. 打开设置 → 界面显示 → Debug 灵敏度，先保持“标准模式”。
3. 打开 Debug → 清理旧缓存 → 再刷新一次。
4. 打开 Debug → 一键自检。
5. 如果只剩 `info` 或 `ignoredIssues`，且错误数/阻塞数为 0，就可以视为通过；需要继续清补丁时再切到“严格模式”。

### 上一版记录

### v10.5.147 源码清补丁与样式主线收口版

本版基于 v10.5.146 继续执行“清补丁、归主线”的原则，不新增功能，重点清理上一轮暗夜体检和导读字号修复中形成的重复覆盖层。

1. 清理 `scene-btn / jump-chip` 在 v10.5.145-v10.5.146 形成的重复暗夜 CSS 覆盖层，归并为一处主线样式。
2. Debug 暗夜运行时体检不再临时写入按钮 inline style，只通过 `reading-theme-night` 与 `xlr-debug-night-audit` 类名触发主 CSS。
3. 快速导读标题与正文直接改用 `--xlr-font-head / --xlr-font-body`，不再靠后置规则压旧的 `14px / 13px`。
4. 修正 `manifest.webmanifest` 里残留的旧 `start_url` 与 `version`，避免新包仍带 v10.5.145 缓存参数。
5. 保留 v10.5.144 首页主题海报、v10.5.143 底部安全区和 v10.5.146 暗夜/字号修复成果。
