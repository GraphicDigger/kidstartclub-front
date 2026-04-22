# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Frontend

### Команды

```bash
npm run dev            # Дев-сервер
npm run build          # Продакшн-сборка
npm run lint           # ESLint
npm run typecheck      # TypeScript проверка (tsc --noEmit)
npm run storybook      # Storybook на порту 6006
npm run gen            # Plop-генераторы (сущности и т.д.)
```

### Стек

- **Стили**: Emotion (`styled()`) — основной способ стилизации; SCSS-модули — для layout-компонентов (Stack)
- **Состояние**: Redux Toolkit; стор в `src/app/store/`
- **UI-примитивы**: Radix UI (`radix-ui` мета-пакет)
- **Анимации**: GSAP
- **DnD**: `@hello-pangea/dnd`

### Алиас

`@/*` → `./src/*`

### Архитектура (Feature-Sliced Design)

```
src/
├── app/          # Next.js App Router: страницы, layouts, стор
├── entities/     # Доменные сущности (lesson, post): api/, model/, ui/, types.ts, index.ts
├── features/     # Фичи
├── widgets/      # Составные компоненты страниц (Header, Hero, PostGrid…)
├── games/        # Игровые модули (dotByDot с Redux)
└── shared/
    ├── uiKit/    # UI-кит: Button, Card, Dialog, Stack, Grid, Typography, Scroll…
    ├── theme/    # Дизайн-токены: sys.js (spacing, colors, breakpoints), comp-*.js (варианты компонентов)
    ├── providers/# EmotionProvider, ThemeProvider, StoreProvider
    ├── icons/
    ├── lib/      # Хуки и утилиты
    └── animation/
```

### Ключевые паттерны

- **Компоненты uiKit** — `forwardRef` + Emotion `styled()`. Динамические стили через transient props (`$propName`). Варианты через один блок `${({ $prop }) => $prop && `...`}` вместо ternary на каждое свойство.
- **Тема** — `useTheme()` из Emotion даёт доступ к `theme.sys` и `theme.comp`. Токены цветов/размеров только через тему, не хардкодить.
- **Экспорты** — каждый компонент/сущность имеет `index.ts`/`index.js` с публичным API.
- **Storybook** — stories рядом с компонентом (`Component.stories.js`).
- **Кодогенерация** — новые сущности через `npm run gen` (Plop + шаблоны в `genesis/`).

