# 小六壬占卜 · v10.5.4 暗夜白块兜底修正版

- 增加暗夜白块兜底规则：不再只依赖具体类名，统一覆盖 card / panel / result / answer / reading / gua / paipan / ab / tab / choice 等常见类名。
- 暗夜模式下先清空子元素背景，再给容器重新铺深色，修复实际页面中残留白块和浅灰块。
- 继续保留 data-theme=dark 与 body.reading-theme-night 双保险，不使用反色或滤镜。
- 保留术语导航、横屏快捷按钮滚动、命盘内部子模块导航。
- 已按固定检查项完成：先检查错误、再检查并处理旧补丁/版本跳动、最后同步更新版本记录 / README / manifest / service-worker。

- 同步更新 manifest 与 service-worker 缓存名。