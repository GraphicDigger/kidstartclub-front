# Модалка + standalone-страница на одном URL

Паттерн Next.js App Router: **Parallel Routes + Intercepting Routes**. Один и тот же URL `/<section>/<id>` открывается **модалкой** при soft-nav изнутри секции и **отдельной страницей** при прямом заходе / refresh / переходе извне.

---

## Структура файлов

```
app/<section>/
├── layout.js                         — принимает { children, modal }, рендерит оба слота
├── page.js                           — список (source для soft-nav)
├── [id]/
│   └── page.js                       — standalone-страница (server component)
└── @modal/                           — parallel-слот для модалки
    ├── default.js                    — return null (первичная загрузка маршрута)
    ├── page.js                       — return null (когда URL = /<section>)
    ├── [...catchAll]/page.js         — return null (любые др. вложенные пути)
    └── (.)[id]/
        └── page.js                   — интерсептит /<section>/[id], рендерит Dialog (client)
```

### Конвенция `(.)` для интерсепта

- `(.)` — матчит сегмент того же уровня, что и родитель слота (`@modal`).
- `(..)` — на один уровень выше.
- `(..)(..)` — на два уровня выше.
- `(...)` — от корня `app/`.

В нашем примере `@modal` лежит в `<section>`, значит `(.)[id]` интерсептит `/<section>/[id]`.

---

## Минимальный код

### `layout.js`

```js
export default function SectionLayout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
```

Имя пропа = имя слота (`@modal` → `modal`).

### `@modal/default.js`, `@modal/page.js`, `@modal/[...catchAll]/page.js`

Все трое:
```js
export default function Empty() {
  return null;
}
```

### `[id]/page.js` (standalone, server)

```js
export function generateStaticParams() {
  return items.map((x) => ({ id: x.id }));
}

export default async function ItemPage({ params }) {
  const { id } = await params;
  const item = items.find((x) => x.id === id);
  if (!item) notFound();
  return <FullPageContent item={item} />;
}
```

### `@modal/(.)[id]/page.js` (intercepted, client)

```js
'use client';
import { use } from "react";
import { useRouter, notFound } from "next/navigation";
import { Dialog, DialogContent } from "@/shared/uiKit/Dialog";

export default function ItemModal({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const item = items.find((x) => x.id === id);
  if (!item) notFound();

  const handleChange = (open) => {
    if (!open) {
      router.back();
      router.refresh();
    }
  };

  return (
    <Dialog key={id} open onOpenChange={handleChange}>
      <DialogContent>
        <ModalContent item={item} />
      </DialogContent>
    </Dialog>
  );
}
```

### Триггер в списке

```jsx
<Link href={`/<section>/${item.id}`} prefetch={false} scroll={false}>
  <Card item={item} />
</Link>
```

---

## Когда интерсепт срабатывает

| Источник навигации | Результат |
|---|---|
| Soft-nav `<Link>` изнутри layout с `@modal` | Модалка |
| Прямой URL / F5 | Standalone page |
| Переход с другого маршрута (без активного layout) | Standalone page |
| `<a href>` / `window.location` | Standalone page (hard-nav) |

**Ключевое правило:** интерсепт работает только при soft-nav **внутри уже активного** родительского layout, где живёт `@modal`. Первый вход в этот layout извне — полная страница.

---

## Обязательные компоненты (каждый решает свою проблему)

### `default.js` — первичная загрузка

Когда layout активируется впервые (hard-nav на любой URL под ним), Next нужен компонент для каждого слота. `default.js` = fallback если для текущего URL нет явного `page.js` в слоте.

### `page.js` на корне слота — закрытие модалки

Из доков Next.js:
> «client-side navigations to a route that no longer match the slot will remain visible.»

После `router.back()` URL становится `/<section>`. Без `@modal/page.js` слот продолжает рендерить старую интерсепт-страницу → модалка «залипает». `page.js` с `return null` явно говорит «на этом URL слот пустой».

### `[...catchAll]/page.js` — переходы на сторонние пути

Если пользователь из модалки идёт на `/<section>/something-else`, где `(.)[id]` не матчится, slot снова залипнет. Catch-all ловит всё и возвращает null.

### `router.refresh()` после `router.back()` — инвалидация кеша

Без `refresh()` router cache может подать standalone-версию `[id]/page.js` при следующем клике вместо интерсепт-версии. `refresh()` чистит кеш → следующая навигация заново проходит через резолвер интерсепта.

### `prefetch={false}` на Link

Next 16 по умолчанию префетчит RSC для видимых `<Link>`. Для интерсепт-маршрутов префетч может закешировать **standalone-вариант**, следующий клик возьмёт его вместо модалки. `prefetch={false}` это предотвращает.

### `key={id}` на Dialog

При переключении между соседними элементами (например, «следующий» прямо из модалки) Radix Dialog может остаться в transitional state. `key={id}` форсит полный remount на каждый id.

---

## Server vs Client components

| Файл | Тип | Почему |
|---|---|---|
| `[id]/page.js` | **server** | Статическая генерация через `generateStaticParams`, `await params`, нет интерактива. |
| `@modal/(.)[id]/page.js` | **client** (`'use client'`) | Нужен `useRouter` для закрытия, Radix Dialog требует клиентское состояние. `params` разворачивается через `React.use(params)` (нельзя `await` в client). |
| `layout.js`, `@modal/default.js`, `@modal/page.js`, `@modal/[...catchAll]/page.js` | **server** | Простые null-компоненты, server по умолчанию. |

---

## Отладка

1. **`rm -rf .next`** — Next хранит манифесты parallel routes. При добавлении новых `@`-папок HMR часто не подхватывает.
2. Ctrl+C → `npm run dev` — рестарт dev-сервера.
3. Cmd+Shift+R в браузере — сброс RSC-кеша.
4. Проверить, что навигация идёт через `<Link>` (soft-nav), а не `<a href>` или `window.location` (hard-nav).
5. Открыть DevTools → Network: при клике должен идти RSC-запрос (не document). Если document — значит hard-nav, интерсепт не сработает.

---

## Модалка, доступная с любой страницы сайта

Если интерсепт нужен не только из `<section>`, но и, например, с главной `/`:

- **Вариант А:** поднять `@modal` слот в корневой `app/layout.js`. Интерсепт будет триггериться с любого маршрута.
- **Вариант Б:** двухшаговая навигация — `router.push('/<section>')` → `router.push('/<section>/[id]')`. Хак, даёт визуальный флеш.
