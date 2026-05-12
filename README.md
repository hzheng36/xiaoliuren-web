### v10.5.149 暗夜审计与顶部复位收口版

## v10.5.149 暗夜审计与顶部复位收口版

本版继续清补丁，目标是把 Debug 自检压到 **0 error / 0 warning**。

### 本版修复

1. 继续收口 `NIGHT_THEME_COVERAGE_MISSING`：针对底部章节导航 `jump-chip` 在 iOS Safari 暗夜审计中仍读到白天背景的问题，追加主 CSS 末端高权重暗夜/审计态规则。
2. 不使用运行时内联样式补丁；仍只通过 `reading-theme-night` 与 `xlr-debug-night-audit` 类名触发主线样式。
3. 结果页顶部复位从 3 次延迟复位扩展到 6 次，锁定时间延长到 3200ms，减少从历史记录查看结果页时的回弹。
4. Debug 顶部复位判断增加 iOS Safari 安全区容差，`scrollY` 约 16px、`resultCardTop` 约 -2px 这类已在顶部的状态不再误报。
5. 同步更新版本记录、manifest 与 service-worker 缓存名。

### 发布检查

- 保持单一 `index.html` 主源码结构
- 保持 1 个主 `<style>` + 1 个主 `<script>`
- 保留首页海报资源与 PWA 图标
- 保留历史记录、历史分析、复盘编辑、JSON 知识库、命运命盘与导航主源码能力
