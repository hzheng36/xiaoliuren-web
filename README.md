# 小六壬占卜 · v10.5.3 暗夜主题真正修正版

- 真正清理残留滤镜：基础 CSS 中的 filter / backdrop-filter 已替换为 none，避免旧样式继续影响暗夜模式。
- 暗夜模式使用 data-theme=dark + body.reading-theme-night 双保险控制，不再依赖反色或滤镜。
- 修复六宫排盘、A/B、按钮、标签、术语等区域在暗夜模式下颜色没有变化或变化不一致的问题。
- 保留术语导航、横屏快捷按钮滚动、命盘内部子模块导航。
- 已按固定检查项完成：先检查错误、再检查并处理旧补丁/版本跳动、最后同步更新版本记录 / README / manifest / service-worker。

- 同步更新 manifest 与 service-worker 缓存名。