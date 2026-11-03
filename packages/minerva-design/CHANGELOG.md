# minerva-design

## 1.19.3

### Patch Changes

- a9476a4: Fix overlay state shared across documents and copies of the package, and the uni-app / Taro AutoComplete highlight.

  - Overlays (#11): the scroll lock, dismissable layers, focus scopes, `aria-hidden` siblings and the applied theme now keep one shared state per page, even when two copies of `minerva-design` are loaded (micro-frontends, duplicated dependencies). Layers and focus scopes are tracked per document, so a dialog in an iframe no longer blocks or closes a dialog in the main page (Escape, outside clicks, focus trapping).
  - AutoComplete on uni-app (#14): the keyboard highlight now follows the option, not its position, like the other renderers. When the options change, the highlight stays on the same option or falls back as documented. The input now sets `aria-activedescendant`, and nothing hidden by `loading` can be picked.
  - AutoComplete on Taro (#14): Enter no longer picks an option while `loading` hides the options or while the dropdown is closed.

## 1.19.2

### Patch Changes

- ci: grant the issue-assign workflow write access to issues / PRs

## 1.19.1

### Patch Changes

- 220d212: Fix five input bugs, on every renderer that has the component.

  - NumberInput (#5): when `precision` is not set, it now keeps every decimal of `step`. `step={1.25}` steps to 1.25 instead of 1, and `step={0.0000001}` now steps instead of staying at 0.
  - Slider (#9): a step written in scientific notation keeps the decimals of its coefficient. With `step={1.5e-7}`, one key press moves by 1.5e-7 instead of 1e-7, and snapping keeps valid ticks unchanged.
  - AutoComplete (#6): while `loading` hides the options, the arrow keys and Enter no longer pick a hidden old option, and `aria-activedescendant` no longer points to an option that is not shown.
  - AutoComplete (#7): the keyboard highlight now follows the option, not its position. When the options change, the highlight stays on the same option. If that option is gone or disabled, `autoHighlight` moves to the first enabled option, and otherwise nothing is highlighted, so Enter always picks a shown option.
  - DatePicker (#8): in a month partly cut by `minDate` / `maxDate`, the day grid always keeps one enabled day that Tab can reach.

## 1.19.0

### Minor Changes

- 734afb1: Quadrant charts: one shared point card on every renderer, and no Playwright.

  - Fix: after a click, the card of the clicked point no longer stays on the chart and hides the others. A plain chart rings its selected point; only boards (with point actions) keep the card of the selected point. Escape closes the card, and a click beside the points drops a selection the chart made itself.
  - The hovered point is kept while the parent passes new arrays of the same points, and through new data under a still pointer (e.g. the selection ring added by a click).
  - Faster hover: the card is DOM of its own, so hovering renders no React, Vue or Angular component, and showing or hiding a drawn label redraws only the foreground canvas.
  - New in `minerva-design/charts/core`: `createQuadrantPointCard`, `withQuadrantCard` and `QUADRANT_CARD_LINGER_MS`. Vue, Web Components and Angular quadrant charts now show the same card as React (no engine tooltip), with the point actions inside it; `<minerva-quadrant-chart>` adds the `point-card` part.
  - Crowded cells: a label also tries beside its dot half a line up or down before it is skipped.
  - Tests: the browser suites are replaced by Vitest tests with happy-dom.

## 1.18.0

### Minor Changes

- 39a6cf4: QuadrantChart (React): one point card for hover, focus, selection and drag. The card carries the point's dot (placed exactly on the point), its name and its quadrant (with the badge), and the point's actions (`renderPointActions`) beside the name. The engine tooltip and hover label chip are gone, and the drawn label of the active point gives way to the card while the other labels keep their places. `renderTooltip` now fills the card. The card stays while the pointer moves from the dot to its actions, mirrors near the right edge (without flipping back and forth during a drag), and stays inside the plot near the top and bottom edges. Clicking its name selects the point.

  QuadrantTaskBoard: compact edit and delete buttons (xsmall, 14px icons). On React they sit in the task card; on Vue, Angular and Web Components the toolbar above the task is smaller. On narrow phones (≤ 360px) the mini program headers give the title the room: the badge is hidden and the chips are tighter.

  Chart engine: new `interaction.hoverLabel` option (`false` keeps a hovered dot's label as drawn) and `ChartInstance.setLabelHidden()` (hides a point's drawn label but keeps its place). Labels kept in quadrant cells now keep a gap between each other and never sit nearer to another dot than to their own, so crowded quadrants no longer pair a name with the wrong dot.

## 1.17.2

### Patch Changes

- a411866: Sharper and tidier quadrant boards and charts on mini programs, and quadrant point labels that stay in their quadrant.

  - **QuadrantTaskBoard** (Taro, uni-app, WeChat): the quadrant headers are compact single-line pills in a 2 x 2 grid, like the web board: the badge and the task count are small chips, a long quadrant title is cut with an ellipsis instead of wrapping, and the + button sits at the end. The headers are styled by the shared stylesheet (no inline layout) and can be themed with `--quadrant-task-board-header-background`, `--quadrant-task-board-header-color`, `--quadrant-task-board-count-background` and `--quadrant-task-board-count-color`.
  - **Charts on Taro H5** were blurry on high-density screens: the canvas was drawn at 1x because Taro's H5 runtime has no pixel ratio API on its default export. Charts now use the page's `devicePixelRatio` there. Canvas charts (Taro and uni-app H5 included) also draw again right away when the host component resets the size of the canvas behind them, instead of staying blank or blurry until the next update.
  - **Taro Input**: small and large inputs no longer pad their text twice, so their text lines up like in medium inputs. This also fixes the name field of the QuadrantTaskBoard panel.
  - **Quadrant charts** (every renderer): a point label stays inside the quadrant of its dot. It goes on the side of the dot with more room in the quadrant, and is cut with "…" when it still does not fit (a label that would keep only a few letters is left out; the tooltip still names the point), so it no longer crosses the center dividers or runs into the dots of the next quadrant. Overlapping labels are still skipped. The behavior comes from a new scatter series option, `labelCells: { x, y }`, which keeps labels inside the cells of a plot cut at those values.

## 1.17.1

### Patch Changes

- 601ff03: Taro: the parts of a component no longer carry the class of its root. `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `CardFooter` (and the parts of the other Taro components) used to get `mn-card` too, so each drew its own card border, background and shadow inside the card; they now only have their `mn-<name>__<part>` class. `CardDescription` no longer adds side padding inside `CardHeader`.

## 1.17.0

### Minor Changes

- ea37835: Inline task panels on QuadrantTaskBoard, a glass info card that follows dragged quadrant points, KanbanBoard renamed DashboardColumns, top-center copy toasts in the icon gallery.

  - **QuadrantTaskBoard** (React, Vue, Web Components, Angular, React Native, Taro, uni-app, WeChat): add / edit / delete no longer open a centered modal. A translucent panel opens inside the board, anchored at what opened it: the + button of a quadrant, the task, or the clicked spot (below it, above when there is no room). The quadrant is picked in a 2 x 2 grid laid out like the matrix. Deleting asks for confirmation in the same kind of panel. Escape or a press outside closes the panel. On mini programs the panel opens under the headers or the actions row, with a caret pointing at the opener, and the add buttons show a plus icon instead of a "+" character. New label `confirmDelete`; new CSS variables `--quadrant-task-board-panel-background`, `-border`, `-radius` and `-width`. Shared helpers in `minerva-design/charts/core`: `placeQuadrantTaskPanel`, `quadrantTaskColor` and `quadrantTaskIconUri`.
  - **QuadrantChart info card** (React): the card of the selected or focused task is now a translucent glass card that follows the theme, like the chart tooltips, with a colored dot instead of a one-sided accent border. While a task is dragged the card follows it and names the quadrant it would land in. Positions are pushed to the card through a small emitter and applied to the DOM once per frame, so nothing re-renders during the drag. The card now also appears after a click: the engine reports `hover: null` when a re-render clears the hovered point. New engine option `interaction.dragLabel` (`false` leaves out the label pill of a dragged point).
  - **KanbanBoard is renamed DashboardColumns** on every renderer. The old names keep working for now (deprecated, removed in the next major).
    - **React / Vue / React Native / Taro / uni-app**: `KanbanBoard` / `KanbanColumn` / `KanbanCard` → `DashboardColumns` / `DashboardColumn` / `DashboardCard`; types `KanbanBoardProps`, `KanbanColumnProps`, `KanbanCardProps`, `KanbanCardMove`, `KanbanColumnColor`, `KanbanLength` → `DashboardColumnsProps`, `DashboardColumnProps`, `DashboardCardProps`, `DashboardCardMove`, `DashboardColumnColor`, `DashboardLength`. The old names are deprecated aliases (Vue also still registers `MnKanbanBoard` / `MnKanbanColumn` / `MnKanbanCard` globally; uni-app keeps the `minerva-design/uni/KanbanBoard.vue` ... subpaths).
    - **Web Components**: `<minerva-dashboard-columns>` / `<minerva-dashboard-column>` / `<minerva-dashboard-card>` from `minerva-design/web-components/dashboard-columns`. `minerva-design/web-components/kanban-board` (and the all-in-one entry) still registers the deprecated `<minerva-kanban-board>` / `<minerva-kanban-column>` / `<minerva-kanban-card>` tags and `MinervaKanban*` names.
    - **minerva-design/core**: `moveKanbanCard`, `kanbanKeyAction`, `KANBAN_COLORS`, ... → `moveDashboardCard`, `dashboardKeyAction`, `DASHBOARD_COLORS`, ... (old names are deprecated aliases).
    - **Breaking for these renderers** (no cheap alias): Angular `MnKanbanBoard` / `MnKanbanColumn` / `MnKanbanCard` (`mn-kanban-*` selectors, `mnKanban*` templates) → `MnDashboardColumns` / `MnDashboardColumn` / `MnDashboardCard` (`mn-dashboard-*`, `mnDashboard*`); WeChat mini program `mn-kanban-*` components → `mn-dashboard-columns` / `mn-dashboard-column` / `mn-dashboard-card`; mini-program classes `mn-kanban-*` → `mn-dashboard-*`.
    - **CSS variables** `--kanban-*` → `--dashboard-*`, and the `data-kanban-*` drag attributes → `data-dashboard-*`; the localized messages moved from the `kanban.*` group to `dashboard.*` (update custom message overrides).
  - **Docs**: the icon gallery shows its copy toast at the top center.

## 1.16.1

### Patch Changes

- docs: icon gallery copy toasts, kind and color filters; one naming rule for component titles

## 1.16.0

### Minor Changes

- a7980a1: QuadrantTaskBoard on every renderer, quadrant drags drawn live by the chart engine, polished point states, combo charts keep their lines above hovered bars.

  - **QuadrantTaskBoard** (new; React from `minerva-design`, Vue, Web Components `minerva-design/web-components/quadrant-task-board`, Angular `MnQuadrantTaskBoard`, React Native, Taro, uni-app, WeChat): a task board on a four-quadrant matrix. Each quadrant has a header (title, count, add button); the active task gets edit / delete icon buttons; a dialog names a task and picks its quadrant; deleting asks for confirmation; tasks move by drag and drop or Shift + arrows. Controlled and simple: `points` + `onPointsChange` (`v-model:points`, `[(points)]`, `minerva-points-change`, `pointschange`); `labels` overrides the localized texts. The shared logic lives in `minerva-design/charts/core` (`newQuadrantTaskDraft`, `applyQuadrantTaskDraft`, `moveQuadrantTask`, `removeQuadrantTask`, `quadrantTaskLabels`, ...).
  - **Live point drags**: the chart engine now draws the dragged point under the pointer itself, with its label in a pill, a dashed placeholder where it was and the target area highlighted (`interaction.dropTargets`, on for quadrant charts). Nothing re-renders while dragging; data is committed on drop. New `dragStart` / `dragEnd` (`{ cancelled }`) events; Escape cancels a drag. Same preview on the canvas host (mini programs, React Native).
  - **Point states**: hovered dots get a tinted halo, a soft glow and a highlighted label chip (the tooltip keeps off it); selected quadrant dots get a glow, a ring in the surface color and an outer ring; the keyboard focus is a separate gap + focus-color ring. Quadrant series data is kept across re-renders, so hovering no longer rebuilds the chart.
  - **Combo charts**: hovering a bar of a bar + line chart (dual axis or not) lifts the bar below the data layer, without the dimming veil, so lines and their hover markers always stay above the bars — on the web (GPU and Canvas2D), the canvas host and React Native.
  - Vue, Web Components, Angular and React Native QuadrantChart: new slots / templates / render props for quadrant headers and actions on the active point.

## 1.15.0

### Minor Changes

- 078043c: Kanban drag and drop, media captions, code marks and language detection, vertical sliders on every platform, quadrant chart keyboard parity, steadier tooltips.

  - **KanbanBoard drag and drop** (React, Vue, Web Components, Angular, React Native, Taro, uni-app, WeChat): `draggable` boards move the new `KanbanCard` children of keyed columns (`value`) with the mouse, a touch long press or the keyboard (Space / Enter picks up and drops, the arrows move, Escape cancels, steps announced). Controlled: `onCardMove` / `card-move` / `minerva-card-move` / `(cardMove)` / `cardmove` report `{ cardKey, fromColumn, fromIndex, toColumn, toIndex }`; `moveKanbanCard` (`minerva-design/core`) applies it to plain lists; `canDrop` refuses positions (WeChat: `drop-disabled` columns). React Native adds screen-reader move actions.
  - **MediaPlayer captions** (all renderers, plus React Native `MediaControls`): `tracks` takes WebVTT or SRT files; cues are drawn by the player (over the video, under the title for audio), a captions menu chooses the track (C toggles) and the choice is remembered; `onTrackChange`. Mini programs and React Native fetch and parse the file and sync the cue to the playback time. Shared parser in `minerva-design/core`.
  - **CodeBlock marks**: `marks` (`{ start, end, color?, className?, id?, title? }`, UTF-16 offsets) highlight ranges over the syntax colors on every renderer, with `onMarkClick`; `getCodeSelectionRange` maps a DOM selection to code offsets.
  - **CodeBlock `language="auto"`**: detects JavaScript, TypeScript, JSX/TSX, JSON, CSS, HTML, Bash, Python, YAML, SQL, diff and Markdown (`detectCodeLanguage` in `minerva-design/core`), on every renderer.
  - **Slider**: `orientation="vertical"` on React Native, Taro, uni-app and WeChat (min at the bottom, range mode, tap to seek).
  - **QuadrantChart**: the keyboard / screen-reader layer (arrows between points, Enter to click, Shift + arrows move a point to the next quadrant through `onPointDrop`, live announcements) now ships in Vue, Web Components and Angular too, with "Move to …" accessibility actions on React Native and accessible move buttons on the mini programs. The dragged point previews its position while dragging; `renderPointActions` places React actions next to the active point.
  - **Tooltips**: always translucent, with colors resolved from the chart theme (no opaque fallback; the backdrop blur is an enhancement only) and refreshed on theme changes. Radar tooltips never cover the radar, its axis labels or the hovered vertex (they overflow into the page when the chart has no room). Gantt and horizontal bar tooltips avoid every task bar, not only the hovered one (`obstacles` in `placeTooltip`). Tooltips shown in the top layer follow page / container scrolling and resizing without waiting for the pointer, and are released with their chart.
  - **Pagination** (mini programs): the simple-mode page input and "/ total" stay on one line.

## 1.14.0

### Minor Changes

- 7a36351: Charts: GPU shape charts, glass tooltips that stay off the hovered mark, clearer hover emphasis.

  - **Shape charts on the GPU**: pie / donut, radar, gauge, funnel, treemap, sankey, sunburst, radial bar, calendar heatmap, bullet and chord charts now draw their shapes with WebGPU, then WebGL2 / WebGL (same order and software-GPU rules as the other charts, following `setDefaultChartRenderer`), with Canvas2D as the fallback. Paths are tessellated into triangles drawn with 4x MSAA and stencil-based nonzero fills; text stays on a 2D canvas above. New `renderer` option / prop (React, Vue, Web Components `options`, Angular) and `getRenderer()`; the chart root reports its backend in `data-renderer`. Mini-program canvas hosts keep Canvas2D.
  - **Tooltips**: translucent background with a backdrop blur (opaque where `color-mix` is unsupported), placed beside the hovered bar group, point, cell, slice or row instead of over it (Gantt and horizontal bars: above / below the row). Tooltips larger than a tiny chart (sparklines) are shown outside it, in the top layer where the Popover API exists. Shape chart tooltips also avoid labels. Native and canvas tooltips are translucent too.
  - **Hover emphasis**: the hovered bar (bar charts, histograms, waterfalls, Gantt tasks) is redrawn thicker (never longer), ringed and lifted above a veil that dims the rest of the plot; grouped bars never grow into their neighbours. Heatmap cells get a 2px contrasting ring, a halo and a larger lift. A short grow-in animation is skipped when the user prefers reduced motion.

## 1.13.2

### Patch Changes

- 73e21ad: Taro: page sections keep their bottom-only 24px spacing now that they also match the shared `.mn-page-section` rule (no extra top margin).

## 1.13.1

### Patch Changes

- 5799c7d: Taro: `PageHeader` and `PageSection` are now their own blocks (`mn-page-header` / `mn-page-section`, `data-minerva="page-header"` / `"page-section"`, matching React) and no longer carry the `mn-page` root class, so app rules on `.mn-page` (full-height, page padding) stop leaking onto headers and sections. The `mn-page__header` / `mn-page__section` classes are kept.

  React Native: Flashcard keeps plain-text faces centred but stretches rich content to the full face width, so it lines up with the face label instead of shrinking and drifting off-centre.

## 1.13.0

### Minor Changes

- 827e1d3: New `AnswerSheet` component (答题卡): a question navigator for practice and exam sessions. Numbered pills grouped by section (`groups`), each with a status (`unanswered`, `answered`, `correct`, `wrong`, `skipped`), an optional review flag and the current question marked with `aria-current="step"`. Props: `items`, `groups`, `value` / `onChange`, `size` (`small` / `medium`), `layout` (`wrap` / `scroll`), `columns`, `showLegend`, `showSummary` and `getItemLabel`, with localized labels (en, zh, fr, ja) and roving arrow-key, Home / End navigation on the web. On every renderer: React, React Native, Taro, Vue, Angular (`MnAnswerSheet`), Web Components (`<minerva-answer-sheet>`), uni-app and WeChat. The core adds `answerSheetSections()`, `answerSheetSummary()`, `answerSheetLegend()` and `answerSheetMoveIndex()`, `@minerva/dom` adds `nearestInRow()`, and the styling hooks add the `flagged` and `layout` states.
- 827e1d3: `CodeBlock` syntax highlighting on every renderer (React, Vue, Angular `MnCodeBlock`, Web Components `<minerva-code-block>`, React Native, Taro, uni-app and WeChat). New props: `language` (javascript / js, typescript / ts, jsx, tsx, json, css / scss / less, html / xml / svg / vue, bash / sh / zsh, python / py, yaml / yml, sql, diff, markdown / md; other names render plain text, and without `language` nothing changes), `highlight` (default `true`; `no-highlight` attribute on the web component), `showLineNumbers` (`show-line-numbers`: an aria-hidden gutter, not part of the selected or copied text) and `showLanguage` (`show-language`: a small label such as "JSON"). The copy button still copies the raw text. Tokens are rendered as text spans (`token-<type>` classes, nested `Text` on native), never as HTML.

  The core adds a dependency-free tokenizer, `highlightCode(code, language)`, with `normalizeCodeLanguage()`, `splitHighlightLines()`, `codeLanguageLabel()`, `supportedCodeLanguages` and `highlightTokenTypes`. The theme adds `--code-token-<type>-color` tokens (GitHub-like light and dark palettes with at least 4.5:1 contrast on every palette), resolved by `resolveTokens()` for React Native and the mini-programs. The styling hooks add the `line-number` part and make `language` a part on every renderer.

  Behavior change: `<minerva-code-block>` and the Taro, uni-app and WeChat code blocks no longer show the language label just because `language` is set; add `show-language` / `showLanguage` to keep it.

- 827e1d3: New `Flashcard` component: a two-sided study card that flips between a front (the prompt) and a back (the answer) for spaced-repetition review, with a 3D `rotateY` / `rotateX` flip (a crossfade under `prefers-reduced-motion`) and a height that fits the taller face. Props: `front` / `back` / `footer`, `frontLabel` / `backLabel` (translated "Question" / "Answer" by default), `hint` / `showHint`, `flipped` / `defaultFlipped` / `onFlippedChange`, `flipOnClick`, `disabled`, `axis`, `variant` (elevated, outline, filled), `size` and `minHeight`. The card is a toggle button (`aria-pressed`, Enter / Space) that ignores clicks on interactive content inside a face; the hidden face is inert and the revealed answer is announced. On every renderer: React, React Native, Taro, Vue (`v-model:flipped`), Angular (`MnFlashcard`, `[(flipped)]`), Web Components (`<minerva-flashcard>`, `minerva-flipped-change`), uni-app and WeChat (`front` / `back` / `footer` slots, `flippedchange`). `@minerva/dom` adds `isInteractiveEventTarget()`.
- 827e1d3: KanbanBoard / KanbanColumn on every renderer: a horizontally scrolling board of equal-width status columns (columnWidth, fill, gap, height / maxHeight with vertically scrolling column bodies, scroll snapping on narrow screens) and columns with an accent color, a title, a count badge announced with the title, a description, actions, a role=list of cards, translated empty content and a footer. Drag and drop is not built in: move cards with your own actions.
- 827e1d3: New `MediaPlayer` component: an audio / video player shell with themed custom controls — play / pause, skip back / forward (`skipSeconds`), a seek bar (`role="slider"`, localized `aria-valuetext` "1:23 of 4:56") showing the buffered range, `m:ss` / `h:mm:ss` time, mute and volume, a playback-speed cycle button (`playbackRates`), fullscreen and optional picture-in-picture, a loading spinner and a translated error state. The type is inferred from `mimeType` or the file extension (`type` overrides it); `startTime` resumes once on `loadedmetadata`; `title`, `poster`, `autoPlay`, `loop`, `muted` / `defaultMuted`, `preload`, `crossOrigin`, `controls={false}` (bare media element), `height` / `aspectRatio`. Events: `onTimeUpdate`, `onEnded`, `onPlay`, `onPause`, `onLoadedMetadata`, `onError`, `onRateChange`, `onVolumeChange`; imperative `play()` / `pause()` / `seek()` / `element`. Keyboard on the focused player: Space / K, ← / →, ↑ / ↓, M, F. Video gets a dark translucent overlay that fades while playing, audio a surface bar; dark mode and `prefers-reduced-motion` aware. On React (ref handle), Vue (`defineExpose`), Web Components (`<minerva-media-player>`, `minerva-*` events, `heading` slot, `no-controls`), Angular (`MnMediaPlayer`), and in beta on Taro, uni-app and WeChat (host `video` via `createVideoContext`, audio via `createInnerAudioContext`; mute only for video, device validation pending). React Native has no media element: `minerva-design/native` adds `MediaControls`, the same control bar driven by props, to wrap expo-video / expo-audio. `@minerva/core` adds the media helpers (`formatMediaTime`, `inferMediaType`, `nextPlaybackRate`, `mediaKeyAction`…).
- 827e1d3: QuadrantChart: quadrant badges, descriptions and counts, selection rings, React header slot and an accessible point layer; readable intra-day Gantt schedules.

  - `QuadrantRegion` gains `badge` (a pill such as "Q1") and `description` (a second line under the title); `showCounts` (boolean or `(count, points) => string`) writes the number of points after each title. Long titles are now cut with … to the quadrant width. Drawn on every renderer (React, Vue, Web Components, Angular, React Native, Taro, uni-app, WeChat; mini-programs take a boolean `showCounts`).
  - `selectedIndex` / `selectedIndices` draw a ring around the selected dots on every renderer.
  - React only: `renderQuadrantHeader(corner, { count, points, indices, region })` replaces the drawn title with React content in the outer corner of each quadrant; `accessiblePoints` (on by default) adds a visually hidden list of buttons per quadrant (Enter / Space → `onPointClick`, Shift + arrow keys → `onPointDrop` to the next quadrant, announced in a polite live region) and draws a focus ring around the focused dot; every dot gets an invisible anchor with `data-point-index` / `data-label` (`getPointProps` adds attributes such as `data-testid`) for end-to-end tests.
  - Engine: `quadrantGroups`, `quadrantLabels` and `quadrantCountText` are exported from `minerva-design/charts/core`; rect annotations accept `badge`, `detail` and `description`; scatter series accept `stroke` (ring width, hollow with `opacity: 0`).
  - GanttChart: schedules of a day or two snap the time range to whole hours (quarter hours under 3 hours) and keep at least four hour:minute ticks on narrow charts (2-hour steps available), so swimlanes such as priority lanes over 08:00–22:00 read cleanly.

- 827e1d3: Add `SegmentedControl`, a single-choice segmented switch for modes and filters (iOS / Ant Design "Segmented" style), on every renderer: React (generic value type), Vue (`v-model`), web components (`<minerva-segmented-control>`, form-associated), Angular (`mn-segmented-control`, `[(value)]` / ControlValueAccessor), React Native, Taro, uni-app and WeChat mini programs. Options are strings or `{ value, label, icon, disabled, aria-label }` objects; supports `size`, `color` (`neutral` / `primary`), `fullWidth`, `disabled`, `name` and an animated sliding thumb (instant with reduced motion). Accessible as a `radiogroup` of `radio` segments with a roving tab stop, arrow keys that move and select (skipping disabled segments, RTL-aware) and Home / End. New styling hooks and `--segmented-control-*` CSS variables.
- 827e1d3: Slider on every renderer (React, React Native, Vue, Web Components, Angular, Taro, uni-app and WeChat): one thumb or a two-thumb range that cannot cross, min / max / step or marks-only snapping, step or labelled marks, `onChange` while dragging and `onChangeEnd` on release (save there), five colors, three sizes, value label, tooltip, `formatValue` / `getAriaValueText`, FormControl integration and hidden form inputs. DOM thumbs are `role="slider"` with arrow / PageUp / PageDown / Home / End keys (mirrored in RTL) and pointer capture; React Native thumbs are adjustable; the mini-program renderers use a custom touch implementation. Shared value math lives in `@minerva/core` (`slider.ts`), with `slider` styling hooks and i18n strings.

## 1.12.1

### Patch Changes

- 7884716: Taro: `Page` re-applies the theme of the closest `ConfigProvider` / `ThemeProvider` (mode, palette and design classes, `primaryColor` and custom theme variables). In mini-programs every page renders under its own root, outside the provider's element, so pages used to get only the default light tokens: the brand color, dark mode and palettes now reach page content. Outside the default light theme, `Page` also paints the page background and text color. React Native icons accept any `ColorValue` for `color` (e.g. the color a navigation `tabBarIcon` receives).

## 1.12.0

### Minor Changes

- eec52cc: Icons: 16 new icons, 515 in all: `calendar-check`, `calendar-plus`, `calendar-days`, `bookmark-plus`, `book-plus`, `book-a`, `clipboard-check`, `check-check`, `history`, `bell-ring`, `party-popper`, `notebook-pen`, `list-todo`, `folder-kanban`, `file-json` and `palette`. They are available on every icon entry (React, Vue, Angular, Web Components, React Native, Taro) and in `toSvg`.
- eec52cc: React Native and Taro icons: the new entries `minerva-design/native/icons` and `minerva-design/taro/icons` export `Icon`, `DynamicIcon`, `createIcon` and one component per icon (`SearchIcon`…), colored by the theme text color by default. React Native draws with `react-native-svg` (an optional peer dependency, only needed by this entry; `minerva-design/native` does not import it); on the web (react-native-web, Expo web) the icons get ARIA attributes instead of the React Native accessibility props. Taro renders an `Image` with an SVG data URI and works in mini-programs and H5. The icon core adds `toSvgBase64DataUri`.
- eec52cc: Brand color: the theme providers get a `primaryColor` option (React `ConfigProvider` / `ThemeProvider`, Vue, Angular, React Native `MinervaProvider`, Taro, uni-app, WeChat, and `<minerva-config primary-color>`). Give one CSS color, whose dark-mode value is derived for contrast on dark surfaces (`#4f46e5` → `#7b85f2`), or a `{ light, dark }` pair. Every token derived from the primary color (hover, active, subtle, border, text, focus ring, selection) follows it; it wins over the palette's primary, nested providers can set their own and `null` restores the theme's. The core adds `resolvePrimaryColor`, `derivePrimaryDark`, `primaryColorTokens` and `paletteAccents`.
- eec52cc: ProgressIndicator: a determinate mode. `value` (with `max`, default 100) fills the bar or ring to that amount instead of spinning, `showValue` prints the percentage and `format` customizes it. `color` adds `success`, `warning`, `danger` and `info`. Available in React, Vue, Angular, Web Components (`<minerva-progress value max show-value>`) and Taro; the uni-app and WeChat components already had a value mode. A label next to a bar now stays on one line when there is room (the track takes the remaining width) and wraps between words.
- eec52cc: New `WeekStrip` component: a one-week row of days to pick a date, with previous / next week buttons, today highlighted and per-day markers (a dot, or a count). Props: `value` / `onChange`, `week` / `onWeekChange`, `firstDayOfWeek` (Monday by default), `today`, `markers`, `showNavigation` and `size`. On every renderer: React, React Native, Taro, Vue, Angular (`MnWeekStrip`), Web Components (`<minerva-week-strip>`), uni-app and WeChat. The core adds `weekStart()`.

### Patch Changes

- eec52cc: Angular: `mn-progress` / `mn-progress-indicator` now draws its indicator. The spinner, circle, wave, bar and dotted-bar variants rendered an empty element before, so `mn-loading-state` had no spinner either. Bars get the 200px default width of the other renderers.
- eec52cc: Docs: a Changelog page lists every release and the upcoming one, the home page shows the current version, and there are new pages and demos for WeekStrip, the determinate ProgressIndicator and the brand color. The Icon page gets a React Native tab with a live demo and API tables for `minerva-design/native/icons`, and the arrow of the home page's "Get started" button is white again.

## 1.11.0

### Minor Changes

- b50696a: Icons: the set grows from 202 to 499 original icons in 23 categories (weather, nature, food, people, places, shapes, text, education, health, shopping, music, tools and sports are new), and some icons are drawn in colour. `IconDefinition` gets an optional `colors` array (one color per path, `undefined` keeps the drawing color), honored by the React, Vue, Angular and Web Components icons, `toSvg`, `drawIcon`, `IconCanvas` and the canvas icons. Colors apply to strokes only. The icons gallery shows the whole set on the page, with no nested scroll box. The home page hero buttons get a background.

## 1.10.0

### Minor Changes

- b7dd085: The icon set for Vue, Angular and Web Components. `minerva-design/vue/icons` has `Icon`, `IconCanvas`, `DynamicIcon`, `createIcon`, one component per icon (`SearchIcon`…) and the opt-in `MinervaVueIcons` plugin (`<MnIcon>`, `<MnIconCanvas>`, `<MnDynamicIcon>`, typed by `minerva-design/vue/icons-global`). `minerva-design/angular` adds `MnIcon`, `MnIconCanvas` and `MnDynamicIcon`. The optional entry `minerva-design/web-components/icon` registers `<minerva-icon name="search">` and `<minerva-icon-canvas>` (not in the all-in-one entry or the CDN bundle). Each binding renders inline SVG by default and accepts the same `renderer` values as React; in Vue and Angular, as in React, the canvas renderers load with the first canvas icon. All of them share the single copy of `minerva-design/icons/core`.

## 1.9.0

### Minor Changes

- b1e8e8f: New icon set: `minerva-design/icons` and `minerva-design/icons/core`. 202 original icons drawn for Minerva on a 24×24 grid (2px strokes, round caps and joins) in 10 categories. Each icon is a tree-shakeable constant (`searchIcon`) and a React component (`SearchIcon`). `Icon` renders inline SVG by default, server-rendered and colored by `currentColor`; with `renderer="auto" | "webgpu" | "webgl2" | "webgl" | "canvas2d"` it draws on a canvas through a backend shared by the page. `IconCanvas` draws thousands of icons in a few instanced GPU draws (4× MSAA, one blend per icon), falling back WebGPU -> WebGL2 -> WebGL -> Canvas2D like the charts. `createIcon`, `defineIcon` and `DynamicIcon` cover custom icons and icons chosen by name. The framework-free core adds `toSvg`, `toSvgDataUri`, `drawIcon`, `createIconCanvas`, `createIconSurface`, `setDefaultIconRenderer` and the geometry helpers (`parseIconPath`, `flattenIconPath`, `tessellateIcon`).

## 1.8.0

### Minor Changes

- b8036ec: QuadrantChart: drag and double-click feedback. React gets `onPointDrag`, which reports every move of a dragged dot with the quadrant under the pointer, and `onPointDoubleClick`, which fires when the same dot is clicked twice quickly (`onPointClick` still fires for each click). While a dot is dragged, React also highlights the quadrant it would drop into. The same events are on Vue (`pointDrag`, `pointDoubleClick`), Angular (`pointDrag`, `pointDoubleClick`), and `<minerva-quadrant-chart>` (`minerva-point-drag`, `minerva-point-double-click`). Setting `onPointDrag` alone now makes the dots draggable, the same as `onPointDrop`.

## 1.7.1

### Patch Changes

- docs(site): split the docs into docs, components and charts sections

## 1.7.0

### Minor Changes

- test(docs): give the feed crossing test room under ci coverage
  feat(charts): order book heatmap legend, size unit, rank-blended heat and fast smoke check

## 1.6.1

### Patch Changes

- fix(charts): readable bookmap heat field, exact front transparency layer and gantt routing

## 1.6.0

### Minor Changes

- feat(charts): gantt dependency arrows, x log axes, live renderer switching and 3d oit

## 1.5.0

### Minor Changes

- test: give the heavy demo-source and rn corner geometry checks a ci timeout
  chore(docs): keep the generated chart api file out of prettier
  docs(charts): document relationship charts, renderer switch and new trading demos - new graphCharts category: graph-chart, dependency-graph, tree-chart and chord-chart - sticky renderer selector with per-demo backend badges on every chart page - new candlestick, trading-chart and technical-indicators demos, galaxy and heatmap polish - chart api tables load on demand from api.charts.generated.json
  feat(charts): add graph, dag, tree and chord charts, pro trading tools and a global renderer - graph module: createGraphChart with force (barnes-hut, worker), dag (sugiyama), tree, radial, mind map, org, circular and arc layouts; GraphChart, DependencyGraph, TreeChart - shape engine: chord diagram (ChordChart), bullet names wrap instead of truncating - setDefaultChartRenderer / getDefaultChartRenderer / subscribeDefaultChartRenderer - gantt item tooltip, aligned tooltip columns, oklab heatmap ramps with legend and new hover, hollow box plot outliers, waterfall connectors, log axes on both y axes - trading: sar, ichimoku, supertrend, keltner, donchian, obv, cci, stoch rsi, dmi, williams r, mfi, volume profile, channel/pitchfork/arrow/text/position drawings, undo/redo, style toolbar, syncCharts, replay, sessions, time zones, export, order entry - order book heatmap: fixed spread fill, profile panel, axis label collisions and fit - 3d: glow and additive point styles, dpr-correct sizes, cross-mesh transparency sorting - vue: charts register through the opt-in MinervaVueCharts plugin (minerva-design/vue/charts) - wrappers for the new charts in vue, angular, web components, rn, taro, uni and weapp

## 1.4.0

### Minor Changes

- test(docs): give the first vue tab load more time under ci coverage
  test(charts): cover the framework chart wrappers and steady ci timing budgets
  docs(charts): localize chart docs, add new chart pages, showcases and framework demos
  feat(charts): add trading, order book, 3d charts, 13 chart types, webgl backend and wrappers

## 1.3.0

### Minor Changes

- docs(charts): document the new chart types, the gallery and a performance guide
  feat(charts): add area, candlestick, heatmap, sparkline, pie, radar, gauge, funnel and treemap

## 1.2.0

### Minor Changes

- docs(charts): document canvas charts, mini-program and React Native charts
  feat(charts): add charts for Taro, uni-app, WeChat and React Native
  feat(charts): add headless controller, canvas renderer and draggable points

## 1.1.0

### Minor Changes

- feat(charts): add zero-dependency GPU charts (WebGPU, WebGL2, Canvas2D)

## 1.0.2

### Patch Changes

- fix(react): keep Tooltip asChild trigger mounted when disabled toggles

## 1.0.1

### Patch Changes

- 16a19a3: Complete DatePicker platform exports, bounded date selection, controlled values and accessible interactions; synchronize component contracts, framework examples and package metadata. Fix the delivery checks blocking the 1.0.1 release.

## 1.0.0

### Major Changes

- First stable release of Minerva Design, distributed as one package with React, Vue, Angular, Web Components, React Native, Taro, WeChat and uni-app entrypoints.

  - Shared design tokens, configurable themes, localization and framework-specific component renderers.
  - Typed public entrypoints, optional framework peer dependencies, stylesheets and native/mini-program assets.
  - Documentation with interactive examples, API references, platform support details and localized promotional films.
  - Unit, cross-renderer contract, distribution, browser and official mini-program SDK checks.

  Supported APIs and platform-specific limitations are documented in the support matrix. Migrating existing novel-ui applications requires adapting imports and component contracts; this release does not promise a package-name-only replacement.
