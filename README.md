# 小六壬占卜 · v10.5.176 iPad Excel 导出挂载与体检收口版

## v10.5.176 iPad Excel 导出挂载与体检收口版

这一版专门收口 iPad Safari 上的 `ANALYTICS_EXCEL_EXPORT_MISSING` 警告。核心思路不是继续堆补丁，而是把 Excel 导出体检拆成“真正会影响导出”的核心层，和“不同设备可能表现不同”的原生图表兼容层。

### 本版新增 / 修复

1. 修复 iPad Safari 下 XLSX 导出体检误报：
   - 显式挂载 `exportAnalyticsExcelReport`；
   - 显式挂载 `buildAnalyticsExcelWorkbook`；
   - 新增 `auditAnalyticsExcelWorkbook`；
   - 同步暴露到 `window` 与 `XLRAnalyticsCore`。

2. Excel 导出体检改为四层判断：
   - 核心导出函数是否存在；
   - 多工作表结构是否可生成；
   - 图表数据表是否可生成；
   - 原生 Excel 图表是否可生成。

3. iPad 兼容策略收口：
   - 核心导出、多工作表、图表数据失败才阻断发布；
   - 原生 Excel 图表在 iPad / Safari / Numbers 预览中可能有兼容差异，改为非阻塞能力项；
   - 桌面 Excel 仍尽量保留原生图表；
   - 如果原生图表生成失败，XLSX 仍保留多工作表和图表数据，方便手动插入图表。

4. Debug 与发版体检增强：
   - 新增 `excelCompatibilityAudit`；
   - 新增 `excelBlockingReady`；
   - 新增 `excelMultiSheetReady`；
   - 新增 `excelChartDataReady`；
   - 新增 `excelNativeChartReady`；
   - 新增 `analytics-excel-compat-audit-v176` 发版体检项。

### 本版检查

- 已同步更新页面 title、meta、首页版本标题、版本记录、README、manifest、service-worker。
- 已检查主脚本语法。
- 已确认源码仍保持 1 个主 style + 1 个主 script。
- 已保留 v10.5.175 的历史分析筛选联动逻辑。
- 已确认没有修改核心起课算法、落宫规则、断卦逻辑、历史数据结构和 JSON 知识库。

### 下一版建议

如果 v10.5.176 在 iPad 自检通过，下一版可以考虑做：

- 历史分析图表交互增强：点击图表项快速套用筛选；
- 或历史记录批量管理增强：批量收藏、批量删除、批量导出当前筛选结果；
- 或暂停导出系统，回到结果页内容体验优化。
