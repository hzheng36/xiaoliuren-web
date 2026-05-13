### v10.5.158 Debug 报告导出增强版

## v10.5.158 Debug 报告导出增强版

本版基于 v10.5.157 继续加强 Debug 工作流。上一版已经把页面状态统一起来，解决了普通问事结果页误触 `DESTINY_DOM_EMPTY` 的问题；这一版不改占卜核心逻辑，重点把 Debug 自检结果做成更好用的导出工具，方便以后把问题集中打包、留档和继续排查。

### 本版处理

1. Debug 面板新增“导出 JSON”按钮，保留完整原始自检/快照数据，适合深度排查。
2. Debug 面板新增“导出 TXT”按钮，把一键自检结果整理成可阅读报告。
3. Debug 面板新增“复制排查摘要”按钮，自动生成适合发给我继续分析的摘要文本。
4. TXT 报告会整理版本、生成时间、状态、错误/警告统计、主要问题、页面状态、发版体检、修复中心状态与建议。
5. Debug 快照新增 `reportExport` 字段，记录导出中心是否可用、支持格式、按钮状态、上一次导出类型。
6. 一键自检新增 `DEBUG_REPORT_EXPORT_MISSING` 检查；如果导出中心没有完整挂载，会以非阻塞警告提示。
7. 发版体检新增“Debug 报告导出中心可用”。
8. 继续保留 v10.5.157 的 `XLRPageStateCore` 页面状态统一逻辑，避免普通问事回看再次被误判成命运结果页。
9. 同步更新首页版本、版本记录、README、manifest、service-worker 与知识库版本说明。

### 这版主要解决什么

以前 Debug 虽然能复制和保存 JSON，但完整 JSON 太长，不适合快速阅读；截图又容易漏掉关键字段。这版把 Debug 报告分成三种用途：

- JSON：完整留档，适合技术排查。
- TXT：人能快速读懂，适合看当前有没有阻断发布项。
- 排查摘要：适合直接复制给我，让我快速判断下一版该修什么。

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
2. 打开 Debug → 一键自检，确认没有错误或警告。
3. 点击“导出 JSON”，确认能下载 `.json` 文件。
4. 点击“导出 TXT”，确认能下载 `.txt` 可读报告。
5. 点击“复制排查摘要”，再粘贴到输入框或备忘录，确认内容包含版本、状态、页面状态、主要问题和 TXT 报告。
6. 在 Debug JSON 中查看 `reportExport`：应显示 `ok: true`，并包含 `formats: ["json", "txt", "prompt-summary"]`。
7. 一键自检通过项中应出现“Debug 报告导出中心检查通过”。
8. 继续抽查 v10.5.157 的回归点：普通问事结果页不应再出现 `DESTINY_DOM_EMPTY`，`pageState.mismatches` 应为空。
9. 暗夜模式下检查 Debug 弹窗和新增按钮，不应出现白底、低对比或按钮遮挡。

### 下一版建议

v10.5.159 可以继续做“历史记录导出增强版”：先从历史记录/历史分析导出 CSV 或 Excel 友好的结构化数据开始，为后续真正的 Excel 报表和 PDF 图表报告打基础。

### 上一版记录

### v10.5.157 页面状态统一与 Debug 误报收口版

1. 新增 `XLRPageStateCore` 页面状态核心，统一判断首页场景、结果页真实场景、`result-page`、`result-destiny`、`destiny-scene`。
2. 修复普通问事结果页误报 `DESTINY_DOM_EMPTY` 的问题。
3. `renderResult()` 进入结果页时，以当前结果 `sceneKey / sceneName` 为准设置页面状态。
4. `goHomeSource()` 回首页时恢复首页当前选中场景对应的状态。
5. Debug 快照新增 `pageState` 字段。
6. Debug 自检新增 `PAGE_STATE_MISMATCH`。
7. 命盘 DOM 检查只在真实命运结果页启用。
8. 发版体检新增“页面状态统一审计通过”。
