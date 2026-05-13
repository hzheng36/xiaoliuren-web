### v10.5.160 历史分析报表预览版

## v10.5.160 历史分析报表预览版

本版基于 v10.5.159 继续升级“导出/报表层”。上一版已经把历史记录和复盘记录整理成 CSV，方便后续进入 Excel、Numbers、Power BI 或 Python 分析；这一版先不急着真正生成 `.xlsx` 或 PDF 文件，而是在“历史分析”弹窗中新增一个更像报表首页的汇总预览区，先把字段口径、统计摘要、关键发现和复盘质量说明稳定下来。

### 本版处理

1. 历史分析弹窗新增“历史分析报表预览”首页区。
2. 报表预览集中展示统计范围、历史记录数、复盘覆盖率、有效复盘准确率、最常问场景、最常见末象、末象风险宫占比和末象顺势宫占比。
3. 新增“关键发现”模块，把样本量、常问场景、常用起课方式、整体宫位、末象落点和复盘情况串成可阅读摘要。
4. 新增“复盘质量”模块，提示当前样本是否足够、哪些场景已有准确率参考。
5. 新增“场景排行”和“末象落点”摘要 chip，为后续 Excel/PDF 图表报告确认字段口径。
6. 新增“下一步建议”模块，自动提示优先补哪些复盘、如何看偏差样本、后续导出应复用哪些字段。
7. 新增 `buildAnalyticsReportPreview()` 与 `renderAnalyticsReportPreview()` 主线函数，并挂载到 `XLRAnalyticsCore`，方便后续真正导出 Excel/PDF 时复用。
8. Debug 快照的 `analytics.core` 新增 `hasReportPreview`，`analytics.metrics` 新增 `reportPreviewReady` / `reportPreviewError`。
9. 一键自检新增 `ANALYTICS_REPORT_PREVIEW_MISSING` 检查。
10. 发版体检新增“历史分析报表预览可用”。
11. 同步更新首页版本、版本记录、README、manifest、service-worker 与知识库版本说明。

### 这版主要解决什么

真正做 Excel 或 PDF 之前，最怕字段还没定、口径还会变、页面预览也没确认。v10.5.160 先做“页面内报表首页”，等这个预览版稳定后，后续导出 Excel/PDF 时就可以直接复用这套结构：封面摘要、KPI、场景排行、末象风险、复盘质量、下一步建议。

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
3. 确认顶部能看到“历史分析报表预览”。
4. 检查报表预览中的 KPI 是否正常显示，没有 `undefined`、空白或明显错位。
5. 切换分析日期，确认报表预览会随日期筛选一起更新。
6. 打开暗夜模式，确认报表预览没有白底、浅色文字或低对比问题。
7. 打开 Debug → 一键自检，确认没有错误或警告。
8. 在 Debug JSON 中查看 `analytics.core.hasReportPreview` 应为 `true`，`analytics.metrics.reportPreviewReady` 应为 `true`。
9. 回归 v10.5.159 的测试点：历史 CSV 与复盘 CSV 导出仍可用。
10. 回归 v10.5.158 的测试点：Debug 导出 JSON、TXT、复制排查摘要仍可用。

### 下一版建议

v10.5.161 建议继续做“Excel 报表导出基础版”：先导出一个真正的 `.xlsx` 或者更稳妥的多表 CSV/HTML 报表包。优先内容可以包括：总览页、历史明细、复盘明细、场景统计、末象统计、场景准确率。PDF 可以再下一步做，因为 PDF 涉及打印样式、分页、图表截图和移动端兼容，最好等 Excel 字段稳定后再做。

### 上一版记录

### v10.5.159 历史记录导出增强版

1. 历史记录弹窗新增“导出历史 CSV”。
2. 历史记录弹窗新增“导出复盘 CSV”。
3. 历史分析弹窗的“分析导出”里也新增历史 CSV 与复盘 CSV 入口。
4. 历史 CSV 按“一条占卜一行”输出，包含时间、场景、识别类型、起课方式、三数、落宫、综合判断、直接答案、复盘条数、最新复盘状态等字段。
5. 复盘 CSV 按“一条复盘一行”输出，包含关联历史记录、复盘序号、准确度、准确单位、实际结果、备注、复盘时间与更新时间等字段。
6. CSV 自动加入 UTF-8 BOM，减少 Excel / Numbers 打开时中文乱码的概率。
7. CSV 单元格加入公式注入保护：如果内容以 `= + - @` 开头，会自动加单引号，避免被表格软件当公式执行。
8. Debug 快照新增 `historyExport` 字段。
9. 一键自检新增 `HISTORY_EXPORT_CSV_MISSING` 检查。
10. 发版体检新增“历史记录 CSV / 复盘 CSV 导出可用”。
