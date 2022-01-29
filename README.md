Ссылкы на открытый PR: [https://github.com/AleksandrChistov/middle.messenger.praktikum.yandex/pull/3](https://github.com/AleksandrChistov/middle.messenger.praktikum.yandex/pull/3)

---

Домен: [https://app-chatly.herokuapp.com/](https://app-chatly.herokuapp.com/)

Ссылка на прототип проекта: [https://www.figma.com/file/Fgv0WBOkjZq5Vid1C3pcto/Chat](https://www.figma.com/file/Fgv0WBOkjZq5Vid1C3pcto/Chat)

---

### MVP версия готова.

**Chatly** - веб-приложение для общения в онлайн-чатах в режиме реального времени.
Создавайте чаты, добавляйте друзей и общайтесь.
История переписки сохраняется автоматически.
Вы всегда сможете перечитать сообщения и ответить в любое время, когда вам удобно.

### Установка проекта

- `npm install` — установка зависимостей,
- `npm run start` — запуск dev-сервера.
- `npm run server` — запуск express сервера.
- `npm run build` — сборка проекта c помощью webpack.
- `npm run lint` — запуск eslint.
- `npm run stylelint` — запуск stylelint.
- `npm run test` — запуск тестов.

### Стек технологий

- сборка осуществляется при помощи **Webpack**
- настроена сборка **Docker** контейнера
- настроен pre-commit при помощи **Husky**
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
