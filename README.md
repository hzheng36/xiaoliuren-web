### v10.5.161 Excel 报表导出基础版

## v10.5.161 Excel 报表导出基础版

本版基于 v10.5.160 的“历史分析报表预览”继续升级，正式加入 Excel 兼容报表导出。上一版先把报表口径、KPI、关键发现、复盘质量和下一步建议稳定下来；这一版把这些内容落地为可下载的多工作表报表文件，方便用 Excel、Numbers 或 WPS 打开查看。

### 本版处理

1. 历史分析弹窗的“分析导出”新增“导出 Excel 报表”。
2. 历史记录弹窗的导出区也新增“导出 Excel 报表”。
3. 新增 `buildAnalyticsExcelWorkbook()` 主线函数，用于生成 Excel 兼容的多工作表报表。
4. 新增 `exportAnalyticsExcelReport()` 主线函数，用于一键下载 `.xls` 报表文件。
5. Excel 报表包含 6 个工作表：
   - 总览
   - 历史明细
   - 复盘明细
   - 场景统计
   - 末象统计
   - 场景准确率
6. “总览”工作表复用 v10.5.160 报表预览口径，包含统计范围、历史记录数、收藏数、复盘覆盖率、有效复盘准确率、最常问场景、最常见末象、末象风险宫占比、关键发现、复盘质量和下一步建议。
7. “历史明细”工作表复用历史 CSV 字段，一条占卜一行。
8. “复盘明细”工作表复用复盘 CSV 字段，一条复盘一行。
9. “场景统计”“末象统计”“场景准确率”用于后续继续扩展图表和 PDF 报告。
10. `XLRHistoryCore` 新增 Excel 报表导出与构建函数引用。
11. `XLRAnalyticsCore` 新增 `buildExcelWorkbook`、`exportExcelReport`、`hasExcelExport`。
12. Debug 快照新增 Excel 报表导出状态。
13. 一键自检新增 `ANALYTICS_EXCEL_EXPORT_MISSING`。
14. 发版体检新增“Excel 报表导出基础版可用”。
15. 同步更新首页版本、版本记录、README、manifest、service-worker 与知识库版本说明。

### 重要说明

这版导出的是 Excel 可打开的 `.xls` 兼容报表，内部采用 SpreadsheetML 2003 XML 格式。它比真正的 `.xlsx` 文件实现更稳，不需要外部库，也更适合当前 GitHub Pages 静态网页环境。后续如果要做真正 `.xlsx`，可以再评估是否引入前端 XLSX 库。

### 没有改动的部分

本版不改变：

- 起课算法
- 三数连续顺推规则
- 落宫规则
- 历史记录内容
- 复盘结论
- JSON 知识库断法
- 命运/普通问事模板边界

这版只增强导出/报表层。

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
2. 打开“历史分析”。
3. 展开“分析导出”，点击“导出 Excel 报表”。
4. 确认可以下载 `xiaoliuren_analytics_report_YYYY-MM-DD.xls`。
5. 用 Excel、Numbers 或 WPS 打开文件，确认有 6 个工作表。
6. 检查“总览”工作表是否有统计范围、KPI、关键发现和下一步建议。
7. 检查“历史明细”和“复盘明细”是否没有乱码、没有 `undefined`。
8. 切换分析日期后再导出一次，确认只导出当前筛选日期的数据。
9. 打开 Debug → 一键自检，确认没有错误或警告。
10. 在 Debug JSON 中查看：
    - `analytics.core.hasExcelExport = true`
    - `analytics.metrics.excelReportReady = true`
    - `historyExport.hasAnalyticsExcelButton = true`
11. 回归 v10.5.160 的“历史分析报表预览”。
12. 回归 v10.5.159 的历史 CSV / 复盘 CSV 导出。

### 下一版建议

v10.5.162 建议做“PDF 报告打印基础版”。先不直接复杂生成 PDF 文件，而是做一个适合浏览器打印/另存 PDF 的报告视图，包含封面摘要、关键 KPI、场景排行、末象统计、复盘质量和历史明细摘要。这样更稳，也能避免移动端直接生成 PDF 的兼容问题。

### 上一版记录

### v10.5.160 历史分析报表预览版

1. 历史分析弹窗新增“报表预览”首页区，把统计范围、样本量、复盘覆盖率、有效复盘准确率、末象风险占比集中展示。
2. 新增关键发现、Top 场景、末象落点、场景准确率和复盘优先级卡片，让历史分析更像后续 Excel/PDF 报告的封面摘要。
3. 新增 `buildAnalyticsReportPreview()` 与 `renderAnalyticsReportPreview()` 主线函数，并挂载到 `XLRAnalyticsCore`，供 Debug 和后续导出功能复用。
4. Debug 快照新增历史分析报表预览状态；一键自检新增 `ANALYTICS_REPORT_PREVIEW_MISSING`，发版体检新增报表预览检查。
5. 本版仍不改变起课算法、历史数据和复盘结论，只增强历史分析的报表展示层。
