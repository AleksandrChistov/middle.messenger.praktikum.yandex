Ссылкы на открытый PR: [https://github.com/AleksandrChistov/middle.messenger.praktikum.yandex/pull/4](https://github.com/AleksandrChistov/middle.messenger.praktikum.yandex/pull/4)

---

Домен: [https://jovial-wiles-3d5464.netlify.app](https://jovial-wiles-3d5464.netlify.app)
Ссылка на прототип проекта: [https://www.figma.com/file/Fgv0WBOkjZq5Vid1C3pcto/Chat](https://www.figma.com/file/Fgv0WBOkjZq5Vid1C3pcto/Chat)

---

### Приложение на стадии разработки.

**Chatly** - веб-приложение для общения в онлайн-чатах в режиме реального времени.
Создавайте чаты, добавляйте друзей и общайтесь.
История переписки сохраняется автоматически.
Вы всегда сможете перечитать сообщения и ответить в любое время, когда вам удобно.

### Установка проекта

- `npm install` — установка зависимостей,
- `npm run start:dev` — запуск версии для разработчика,
- `npm run start` — запуск express сервера,
- `npm run build` — сборка проекта.
- `npm run lint` — запуск eslint.
- `npm run stylelint` — запуск stylelint.
- `npm run test` — запуск тестов.

### Стек технологий

- сборка осуществляется при помощи **Parcel**
- стили пишем на **SCSS**
- используем шаблонизатор **Pug**
- проект поделен на 3 папки: **server**, **src** и **static**
- добавлены **eslint**, **stylelint** и **editorconfig** файлы
- создан service для работы с **websocket**
- настроены **Mocha** и **Chai** для unit-тестирования
- добавлены **jsdom** и **sinon** для unit-тестирования

### Функционал

- Регистрация
- Авторизация
- Выход
- Изменение данных пользователя
- Изменение аватара пользователя
- Изменение пароля
- Создание чатов
- Добавление пользователей в чат
- Удаление пользователей из чата
