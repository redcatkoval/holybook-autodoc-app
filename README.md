# Holy Book — Autodoc Design System

Свод правил проектирования мобильного приложения Autodoc: фундамент, паттерны, композированные флоу — и обоснование за каждым решением. Документ собирается из JSX-исходников в один офлайн HTML-бандл, который любой член команды открывает в браузере.

Этот README — **единственный** документ в репозитории и **единая точка истины** по структуре, канону и процессу. Если он расходится с тем, что в `src/`, исправь README.

---

## Что это

Holy Book — это **документация, а не библиотека компонентов**. В приложение код не уходит. Документ описывает **как приложение себя ведёт** — для чего каждая поверхность, когда её доставать, почему. Визуалы — wireframes; обязывающим каноном служит проза вокруг них.

---

## Структура книги

Три части. Порядок чтения — сверху вниз.

### Part I — Architecture (`src/part1/`)

Семь глав фундамента. Всё, что ниже в книге, наследует от этих правил.

1. **Foundation** (`ch01-foundation.jsx`) — палитра, типографика, ритм, базовая лексика.
2. **Layer hierarchy** (`ch02-layers.jsx`) — Z-stack приложения.
3. **My AUTODOC (Garage)** (`ch03-garage.jsx`) — корневой dark base layer с гаражом.
4. **The Curtain** (`ch04-curtain.jsx`) — белая «простыня», которая поднимается над гаражом.
5. **The Corridor** (`ch05-corridor.jsx`) — fullscreen-страницы с одной задачей, навигация `‹`.
6. **State principles** (`ch06-states.jsx`) — Six principles governing every empty / loading / error / optimistic state.
7. **Accessibility & touch** (`ch07-accessibility.jsx`) — touch-targets, контрасты, моторика.

### Part II — Pattern Library (`src/part2/` + `src/part2-notready/`)

Утверждённый набор паттернов, которыми команда строит экраны. TOC группирует их по интенту:

- **Navigation** — Tab Bar & Nested Nav, Search, List Filtering
- **Surfaces** — Modal Views, Web View, Dialogs/Alerts/Action Sheets, Snackbars, Infoblocks, Final Flow Screens
- **Controls** — Pop-up Buttons (Dropdowns), Accordion / Disclosure, Quantity Stepper, Step Indicators
- **Actions on items** — Context Menus, Swipe Actions
- **Status** — Indeterminate indicators, Empty States, Errors, Optimistic UI / Undo
- **Product** — Reviews & Ratings, Image Gallery
- **Promotion** — Widgets
- **System experiences** — Dynamic Island

#### Part II subsection — Not ready (`src/part2-notready/`)

В самом конце Part II — подраздел «Not ready»: пропозалы и драфты, не прошедшие редакторский проход. Структура может ещё сдвинуться. Промоут наверх Part II по мере созревания. Сейчас здесь живут: Buttons & Footers, Product Card, Faceted Search, Specs / Compatibility, Express Commit Sheet, Map View, Camera Scanner, Notification Inbox.

> **In-review marker.** Класс `toc-in-review` в TOC рисует под пунктом красное штриховое подчёркивание. Сейчас `inReviewIds` содержит `["p-buttons"]` — Buttons & Footers помечен как in-review. Чтобы пометить ещё пункт, добавь его id в Set.

### Part III — Composed Flows (`src/part3/`)

End-to-end флоу, собранные из Part II паттернов. Если Part II — кирпичи, Part III — дома.

- **Checkout journey** (`p-checkout.jsx`)
- **Authentication** (`p-auth.jsx`)
- **Add a Car** (`p-addcar.jsx`)

Формат Part III отличается от Part II намеренно: `FlowHead` + `FlowCallout` + нумерованные `FlowStage` + `FlowBlock` + `FlowPatternList` в конце. Никаких `Rules` / `DoDont` внутри флоу — правила живут в Part I и Part II, флоу их применяет.

---

## Канон — краткая сводка

Подробное обоснование каждого правила — в соответствующей главе Part I книги. Здесь — quick-reference.

### Архитектурные слои (Ch02)

Три структурных элемента приложения, точка: **Garage** (dark base, всегда) → **Curtain** (white, всегда — постоянный modal) → **Corridor** (fullscreen, временно **заменяет** shell).

Всё остальное — Snackbar, System alert, Action sheet, Non-alerting dialog, Modal Views, Infoblock — это **паттерны overlay'ев**, которые живут внутри curtain'а или над ним. Они не архитектурные слои; их анатомия, dismiss-правила, приоритеты и взаимодействие с corridor — в их Part II паттернах.

**Правила композиции:**
- Никаких sheet over sheet — sheet-паттерны не накладываются друг на друга
- Pattern overlay'и живут между shell и OS chrome — приоритет описывается в Part II
- Анти-паттерн: модальное окно поверх модального окна (drag-handles competing)

### Кнопочная таксономия (Part II · Buttons & Footers — *in review*)

- **Primary CTA** — ink-filled чёрный (`#111`). Никаких оранжевых CTA нигде в книге.
- **Secondary** — outlined.
- **Tertiary** — текст, без подчёркивания.
- **Link** — текст с dotted underline.

Все CTA в **Title Case**: «Save and Continue», «Add Your Car», «Place Order». Не «Save and continue».

Подробная грамматика hierarchy (footer combinations, Primary migrates with context, anti-patterns) живёт в паттерне `src/part2-notready/p-buttons.jsx` — отмечен как in-review, ждёт редакторского прохода.

### Корридор (Ch05)

Fullscreen-страница с одной задачей. Шапка: `‹` слева, заголовок по центру. **`‹` есть всегда** в regular-коридоре — и в одношаговом, и на каждом шаге многошагового. **Никаких ✕** в headerах по умолчанию.

Когда `✕` всё-таки появляется (canon живёт в разных файлах книги):
- **На последнем шаге многошагового regular-коридора** — ✕ справа **дополнительно к** `‹` слева, как осознанная кнопка выхода. Триггерит тот же discard-sheet. **На одношаговом коридоре `✕` не нужен** — `‹` и так возвращает к родителю. *Документировано: Ch05 The Corridor, rule «✕ only on the last step of a multi-step corridor».*
- **Lightweight transient corridors** (Scanner, Gallery, Web View) — ✕ или Cancel допустим на каждом шаге, выход immediate, ничего не теряется. *Документировано в каждом из паттернов отдельно: `p-scanner`, `p-gallery`, `p03-webview`.*
- **Commit corridors** (Checkout, Pay-now sheets, Place-order confirmations) — ✕ справа **вместо** `‹` (никакого `‹`). Семантика: «выйти из задачи и вернуться к родителю», а не «шаг назад». Dismiss оптимистичный со snackbar «… cancelled · Undo» (5-секундное окно, восстанавливает заполненные поля). *Документировано: Part III · Checkout, Stage 1.*

### Шиты

Дизмис — drag-handle или tap on scrim. **Никогда не ✕ в header'е шита.** Высота шита подходит вплотную к клавиатуре, без белого зазора.

### Pick a notifier — practical cheat-sheet

Какой overlay-паттерн выбрать когда нужно сказать что-то пользователю или спросить:

| Что происходит | Выбор | Паттерн |
|---|---|---|
| App сообщает что-то произошло, user может проигнорировать | **Snackbar** | `p07-snackbars` |
| User триггерит destructive или multi-option choice | **Action sheet** снизу | `p06-dialogs` |
| App должен получить ответ перед continuation | **System alert** (modal scrim, центр) | `p06-dialogs` |
| Soft ask который можно проигнорировать (suggestion, in-app commit confirmation) | **Non-alerting dialog** (bottom sheet) | `p06-dialogs` |
| User тапает ⓘ рядом с термином чтобы понять что это | **Infoblock** (bottom sheet) | `p08-infoblocks` |
| Temporary detail of what user was doing (product detail, filter, picker) | **Modal Views** (bottom sheet, разные высоты) | `p02-modal-views` |

> Tooltips как inline floating bubbles в нашем DS **не используются**. Микро-help и объяснения → Infoblock.

### Action sheet vs System alert vs Snackbar+Undo (Part II · p06-dialogs)

Три разных destructive-surface, по убыванию обратимости:

- **Contextual destructive** (удалить адрес, удалить позицию из корзины, отбросить черновик) → action sheet снизу. Destructive option последним, Cancel всегда есть, tap-outside = Cancel.
- **Catastrophic destructive** (sign out с несохранёнными данными, удалить аккаунт, безотзывно отменить размещённый заказ) → centered system alert с split-кнопками (Cancel | Destructive).
- **Commit-corridor dismiss** (закрыть Checkout, Pay-now, любой commit-корридор) → ни то, ни другое. Оптимистичный snackbar «… cancelled · Undo» — Undo восстанавливает заполненные поля, auto-dismiss сбрасывает молча.

### Empty states (p-empty)

Icon + heading + helper text + **одна** primary CTA. CTA создаёт то, чего не хватает, не «Save and Continue» при пустом наборе данных.

### Step indicators (p-multistep)

≤ 3 шагов в индикаторе. Одна форма на экран — не миксовать segmented + dots + sheet-grows одновременно.

### Cross-references

Внутри `FlowBlock` запрещены inline-плашки «Uses → Pattern». Список зависимостей флоу живёт **только** в финальном `FlowPatternList` («Pattern dependencies»). API `usesPattern` в `FlowBlock` намеренно отсутствует.

### Snackbars

В chrome-zone, не в sheet-zone. Допустим ✕ для манульного дизмиса (документировано в `p07-snackbars.jsx`). Auto-dismiss по таймауту — норма.

### No sheet over sheet

Sheets никогда не накладываются на другие sheets. Curtain — это уже sheet (поднимающаяся белая плёнка над Garage), поэтому всё, что живёт внутри curtain'а, не может быть вторым sheet'ом.

Конкретное применение: **Cart commit bar** — плоская плашка, прибитая к верху bottom-nav, внутри curtain. Не sheet: без drag handle, без top-radius, без shadow. Total + Checkout-кнопка. Price breakdown лежит inline в списке Cart как карточка «Order summary», к которой скроллят как к любому контенту — не раскрывается, не всплывает. См. `p-stepper.jsx`.

### My AUTODOC empty state

Если в гараже нет машины — dark base показывает dashed «+» tile + «Add your car / VIN, plate or photo — 30 seconds» по центру. Никаких других элементов на базе. Affordance «+ Add a car» в гараже с машинами живёт в шапке garage-section («Garage 2» + «+»), не плавающей пилюлей.

---

## Структура репозитория

```
Holy_Book_v3_46.html         # текущая собранная версия

src/
  app/                       # cover, TOC, layout, tweaks instance, App entry
    main.jsx                 # тело документа: порядок секций, разделители Part II/III
    toc.jsx                  # sidebar nav, группы Part II, inReviewIds Set
    cover.jsx
    reading-guide.jsx
    tweaks.jsx
  kit/                       # общие примитивы
    phone-shell.jsx          # Phone, GarageBase, Curtain, BottomNav, StatusBar
    phone-primitives.jsx     # BottomSheet, Snackbar, InfoTooltip, DialogModal (split variant), поля форм
    text-helpers.jsx         # Section, PatternHead, Callout, FrameRow, FrameCell, Rules, DoDont, H3
    tweaks-panel.jsx
  part1/                     # 7 глав Part I — Architecture
  part2/                     # ~22 паттерна Part II — Pattern Library
  part2-notready/            # Not ready — пропозалы и драфты (подраздел Part II)
    _helpers.jsx             # ProposalEntry helper
  part3/                     # Part III — Composed Flows (Checkout / Auth / Add a Car)
    _helpers.jsx             # FlowHead, FlowStage, FlowCallout, FlowBlock, FlowPatternList
  vendor/                    # React, ReactDOM, Babel (не редактируем)

build/
  shell.html                 # внешний HTML-шелл (loader + global CSS)
  manifest.template.json     # маппинг uuid → src-файлы (порядок загрузки)

scripts/
  build.py                   # src/ + build/ → Holy_Book_v3_NN.html

README.md                    # этот файл — единственный документ в репо
```

---

## Сборка

```bash
python3 scripts/build.py
```

Компилирует `src/**/*.jsx` + `build/manifest.template.json` + `build/shell.html` в один self-contained HTML по умолчанию в корне репо: `Holy_Book_v3_46.html` (см. `--out` в `scripts/build.py`).

Открыть результат в любом браузере. Сервер не нужен.

Если нужен HTTP (например, для MCP-браузера):

```bash
python3 -m http.server 8765 --bind 127.0.0.1
# открыть http://127.0.0.1:8765/Holy_Book_v3_46.html
```

---

## Как добавить или изменить паттерн

1. Создай JSX-файл в нужной папке:
   - Part I: `src/part1/chXX-name.jsx`
   - Part II canon: `src/part2/pXX-name.jsx`
   - Part II «Not ready»: `src/part2-notready/pXX-name.jsx`
   - Part III flow: `src/part3/p-name.jsx`
2. Зарегистрируй его в трёх местах:
   - `build/manifest.template.json` — добавь путь, чтобы бандлер подобрал. Большие файлы — отдельным uuid'ом; мелкие могут идти как `_parts` в общем чанке.
   - `src/app/toc.jsx` — TOC-запись в нужной группе (`partII`, `partIINotReady`, `partIII`) и при необходимости новая группа.
   - `src/app/main.jsx` — JSX-тег в нужной позиции документа, с `<hr className="rule"/>` между секциями.
3. Следуй структуре существующего паттерна:
   - **Part II:** `Section + PatternHead + Callout + H3 + FrameRow + Rules + DoDont`.
   - **Part III flow:** `Section + FlowHead + FlowCallout + FlowStage + FlowBlock + FrameRow + FlowPatternList`. Никаких Rules/DoDont.
4. Запусти `python3 scripts/build.py`, открой HTML, проверь.
5. Если паттерн — драфт в активном ревью, добавь его id в `inReviewIds` в `toc.jsx` для красного штрихового подчёркивания в TOC.

---

## Как изменить правило фундамента

Правила фундамента живут в Part I. Изменение правила — большое дело: распространяется на каждый паттерн / флоу, который его трогает. Процесс:

1. Открой нужную главу (например `src/part1/ch02-layers.jsx` для Z-stack).
2. Добавь / измени правило и обоснование.
3. Пройди Part II и Part III и найди места, которые должны теперь ссылаться или соответствовать новому правилу.
4. Обнови сводку канона в этом README, если правило туда попадало.

---

## UX-аудит — что проверять при ревью

Контрольный список для каждой правки:

- ✅ **Z-stack** — нет инверсий (диалог под шитом, snackbar под dialog'ом).
- ✅ **Кнопки** — все primary `#111`, ни одной оранжевой. CTA в Title Case.
- ✅ **Шиты** — дизмис только драг-handle / scrim, без ✕ в header'е. Без белого зазора между шитом и клавиатурой.
- ✅ **Корридор** — `‹` слева, нет ✕ кроме трёх задокументированных исключений: lightweight-transient (✕ как single exit), commit (✕ заменяет `‹`), последний шаг (✕ дополняет `‹`).
- ✅ **Action sheet vs system alert** — контекстный destructive = action sheet; катастрофический = system alert (split variant).
- ✅ **Empty states** — icon + heading + helper + одна primary CTA, которая создаёт недостающее.
- ✅ **Step indicators** — ≤ 3 шагов, одна форма на экран.
- ✅ **Flow blocks** — без inline «Uses → Pattern»; зависимости только в финальном `FlowPatternList`.
- ✅ **TOC** — `inReviewIds` отражает реальное состояние ревью (сейчас Set пустой).
- ✅ **Build** — `python3 scripts/build.py` проходит без warnings.

---

## Версионирование

Каждая сборка пишет в `Holy_Book_v3_NN.html` в корне репо. Текущая цель задана в `scripts/build.py` как дефолтный `--out`. Бампать имя при шипе milestone-версии.

---

## Статус

Holy Book — живой документ. Паттерны мигрируют из «Not ready» в основной Part II по мере созревания; канон Part I эволюционирует медленно и осознанно. Part III (Composed Flows) пополняется новыми флоу по мере того, как они стабилизируются — возвраты, account recovery, subscription management ждут очереди.

Состояние «in progress» помечается честно — красное штриховое подчёркивание под пунктом TOC означает, что паттерн в активном ревью и может меняться.
