### v10.5.147 源码清补丁与样式主线收口版

## v10.5.147 源码清补丁与样式主线收口版

本版基于 v10.5.146 继续执行“清补丁、归主线”的原则，不新增功能，重点清理上一轮暗夜体检和导读字号修复中形成的重复覆盖层。

### 本版处理

1. 清理 `scene-btn / jump-chip` 在 v10.5.145-v10.5.146 形成的重复暗夜 CSS 覆盖层，归并为一处主线样式。
2. Debug 暗夜运行时体检不再临时写入按钮 inline style，只通过 `reading-theme-night` 与 `xlr-debug-night-audit` 类名触发主 CSS。
3. 快速导读标题与正文直接改用 `--xlr-font-head / --xlr-font-body`，不再靠后置规则压旧的 `14px / 13px`。
4. 修正 `manifest.webmanifest` 里残留的旧 `start_url` 与 `version`，避免新包仍带 v10.5.145 缓存参数。
5. 保留 v10.5.144 首页主题海报、v10.5.143 底部安全区和 v10.5.146 暗夜/字号修复成果。

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
2. 打开 Debug → 清理旧缓存 → 再刷新一次。
3. 打开 Debug → 一键自检。
4. 重点确认：错误 0、警告 0；如果仍有警告，请复制完整 JSON，继续清主线残留。

### 上一版记录

### v10.5.146 暗夜体检与导读字号收口版

## v10.5.146 暗夜体检与导读字号收口版

本版基于 v10.5.145 继续修复你反馈的 3 个自检警告：

1. 修复 `NIGHT_THEME_COVERAGE_MISSING`：Debug 暗夜运行时扫描前，对 `scene-btn` / `jump-chip` 临时写入同等高对比暗夜样式，扫描结束后恢复，避免 iOS Safari 下 class 切换后仍读到白天样式。
2. 修复 `READING_FONT_AUDIT_WARNING`：快速导读标题与正文统一跟随阅读字号变量，不再被旧的 14px / 13px 样式抢占。
3. 修复 `RELEASE_CHECKLIST_REVIEW`：发版体检表中的 `reading-font-v132` 会随导读字号审计恢复通过。
4. 保留 v10.5.144 首页主题海报与 v10.5.143 底部安全区，不回退视觉与 Safari 底部遮挡修复。

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

1. 上传全部文件后，先在 Safari 里强制刷新页面。
2. 打开 Debug → 清理旧缓存 → 再刷新一次。
3. 打开 Debug → 一键自检。
4. 重点确认：错误 0、警告 0，并且版本显示 `v10.5.146 暗夜体检与导读字号收口版`。

### 上一版记录

## v10.5.145 暗夜场景按钮体检修正版

- 修复 Debug 一键自检中的 `NIGHT_THEME_COVERAGE_MISSING` 警告，重点处理首页场景按钮 `scene-btn` 与底部导航按钮 `jump-chip`。
- 补强真实暗夜模式 `reading-theme-night` 与 Debug 临时夜间审计 `xlr-debug-night-audit` 两套状态。
- 场景按钮与章节导航按钮改用 `background-color` + `background-image` 分离写法。
- 保留 v10.5.144 首页主题海报与 v10.5.143 底部安全区。
