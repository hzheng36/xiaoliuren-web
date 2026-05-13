### v10.5.157 页面状态统一与 Debug 误报收口版

## v10.5.157 页面状态统一与 Debug 误报收口版

本版基于 v10.5.156 继续收口 Debug 误报和页面状态判断问题。重点修复：在首页曾经选中过“命运”场景后，再从历史记录查看天气、出行、财运等普通问事结果时，页面 body 可能残留 `destiny-scene`，导致 Debug 把普通问事误判成命运页，并触发 `DESTINY_DOM_EMPTY` 警告。

### 本版处理

1. 新增 `XLRPageStateCore` 页面状态核心，统一判断首页场景、结果页真实场景、`result-page`、`result-destiny`、`destiny-scene`。
2. 修复普通问事结果页误报 `DESTINY_DOM_EMPTY` 的问题；隐藏父容器下的命盘子容器不再被当成空内容警告。
3. `renderResult()` 进入结果页时，以当前结果 `sceneKey / sceneName` 为准设置页面状态；普通问事会清掉命运结果状态。
4. `goHomeSource()` 回首页时恢复首页当前选中场景对应的状态，避免结果页状态污染首页。
5. Debug 快照新增 `pageState` 字段，用于显示 canonical page state、实际 class、预期 class 和 mismatch 明细。
6. Debug 自检新增 `PAGE_STATE_MISMATCH`，专门检查页面状态类名与当前结果/首页场景是否一致。
7. 命盘 DOM 检查只在真实命运结果页启用，避免普通问事隐藏命盘模块时被误判为空。
8. 发版体检新增“页面状态统一审计通过”。
9. 同步更新首页版本、版本记录、README、manifest、service-worker 与知识库版本说明。

### 这版主要解决什么

这版不是继续叠大补丁，而是把“页面到底是首页、普通结果页、还是命运结果页”的判断收回到一个统一状态核心里。这样以后 Debug、导航、命盘边界检查、发版体检都尽量读同一套 page state，减少类似 `DESTINY_DOM_EMPTY`、模板串用、bodyClass 残留造成的误报。

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
2. 首页先选择“命运”，确认占问事项可留空。
3. 打开历史记录，查看一条天气、出行、财运等普通问事结果。
4. 打开 Debug → 一键自检，确认不再出现普通问事下的 `DESTINY_DOM_EMPTY`。
5. 在 Debug JSON 中查看 `pageState`：普通问事结果页应显示 `isDestinyResultPage: false`，且 `mismatches: []`。
6. 再查看一条真正的命运结果，确认命盘模块仍正常显示，命运页仍保留 `result-destiny` / `destiny-scene`。
7. 点击“主页”回首页，确认如果当前选中命运场景，首页仍保持命运场景的免填提示；如果选中普通场景，则不残留命运状态。
8. 暗夜模式下检查 Debug 弹窗、结果页、命盘模块和底部导航，不应出现白底或低对比。
9. 一键自检重点看：
   - `页面状态统一审计检查通过`
   - `命盘状态构建与模板边界检查通过`
   - `普通问事不显示六宫排盘检查通过`
   - `普通问事不串命盘模板检查通过`
   - `发布前体检表检查通过`

### 上一版记录

### v10.5.156 首页时间联动起课增强版

1. 首页动态时间模块新增“刷新时间”和“同步到时辰起课”按钮。
2. 同步到时辰起课后自动切换到时辰起课面板，并给出状态提示。
3. 命运场景继续保持“占问事项可留空”。
4. 新增首页时间联动的暗夜样式覆盖。
5. Debug 快照增强 `homeDynamicTime.actions`。
6. 发版体检新增“首页时间刷新/同步到时辰起课可用”。
