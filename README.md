# React MiniNote App
> Frontend приложения Nimbus (Mini Note) — заметки с категориями, тегами и поддержкой нескольких backend-серверов.

## Используемые технологии
- Docker / Docker Compose
- [Yarn](https://yarnpkg.com/cli)
- [Next.js](https://nextjs.org/docs/) (Pages Router)
- [React](https://ru.reactjs.org/docs/getting-started.html) 18
- [MUI](https://mui.com/material-ui/) v5

## Backend

Фронтенд работает с **Mini Note RESTful API** (см. Swagger-документацию backend-сервиса, `basePath: /api/v1`). Поддерживаются:
- регистрация/логин (JWT), восстановление пароля, профиль, смена пароля, удаление аккаунта;
- заметки (CRUD, поиск, статусы `draft` / `public` / `archive`);
- категории (CRUD, иерархия `parent_id` + `sort`).

Теги заметок пока хранятся только локально в браузере (backend их не поддерживает) — это задел на будущее API.

### Несколько backend-доменов

На экране логина есть блок «Настройки сервера»: можно добавить несколько адресов API, выбрать активный и переключаться между ними без пересборки — выбор сохраняется в браузере (`localStorage`). Значение из переменной окружения `NEXT_PUBLIC_API_BASE_URL` используется только как начальный домен по умолчанию при первом запуске.

## Переменные окружения

Заданы в `.env` / `.env.default` в корне репозитория и передаются в контейнер через `docker-compose.*.yml`:

| Переменная | Назначение |
|---|---|
| `UID`, `GID` | пользователь внутри контейнера (см. ниже) |
| `NEXT_PUBLIC_API_BASE_URL` | домен API по умолчанию (например `http://localhost:9077/api/v1`) |
| `NEXT_PUBLIC_SIGNUP_CONFIRMATION_MODE` | `simple` (регистрация → автологин) или `mock-code` (регистрация → демо-шаг подтверждения кодом, без реальной отправки письма backend'ом) |

В терминале запустите `id`, и если значения `uid`/`gid` отличаются от 1000 — подставьте их в `.env` (`UID=...`, `GID=...`).

## Разработка

- Клонируем репозиторий: `git clone git@github.com:OrlangurDux/frontend-mini-note-app.git`
- Ветка `master` — стабильная/релизная, `dev` — основная ветка разработки. Новые ветки создаём из `dev`, MR/PR — обратно в `dev`.
- Первый запуск: `make start` (или `docker-compose -f docker-compose.dev.yml up -d --build react-mini-note-app-dev`), последующие — `make start` / `docker-compose -f docker-compose.dev.yml up -d`
- Приложение доступно на [http://localhost:3040](http://localhost:3040)
- Код приложения находится в папке `src` (Next.js), `mini-note-template` — исходный статический прототип/дизайн-референс
- Выполнение Yarn-команд в контейнере: `docker exec -it react-mini-note-app-dev yarn NAME_COMMAND`

## Вспомогательные команды (Makefile)

- `make start` — поднять dev-контейнер
- `make stop` — остановить все сервисы
- `make build [service]` / `make up [service]` / `make down [service]` / `make restart [service]`
- `make logs` / `make logs-service` — логи в реальном времени
- `make login [service]` / `make login-service` — shell в контейнере

## Отладка в VSCode

Создать файл `.vscode/launch.json` со следующим содержимым:

````json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Docker: Attach to Node",
      "type": "node",
      "request": "attach",
      "port": 9249,
      "address": "localhost",
      "skipFiles": ["<node_internals>/**"],
      "localRoot": "${workspaceFolder}/src",
      "remoteRoot": "/app",
      "protocol": "inspector"
    }
  ]
}
````
Более подробно [здесь](https://nextjs.org/docs/advanced-features/debugging)

## Дополнительно

См. [CLAUDE.md](./CLAUDE.md) — описание архитектуры проекта и частых команд для разработки.
