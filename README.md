# Frontend Template CRM

Шаблон SSR приложения, на базе vue.js 2 с использованием Nuxt.js.
Подробное описание фреймворка здесь: https://nuxtjs.org/

В шаблон входит:

* Vuex
* Axios инстанс с проверками: валидность токена с рефрешем, в случае когда до expired остается менее 30c; наличие/отсутствие подключения к интернету; расширенные конфиги, реализующие retry стратегию, для запросов + notify для error handlers
* Поддержка Action UI Kit
* Универсальное хранение данных между клиентом и сервером (https://github.com/nuxt-community/universal-storage-module)

## Установка

Клонировать репозиторий
В корневой директории вызвать `npm i`

## Подготовка шаблона

Изменить .gitlab-ci.yml, а именно:

* Переменную PRODUCT_NAME - имя продукта в gitlab
* Переменную SERVICE_NAME - имя сервиса в gitlab

Удалить .gitlab-ci-custom.yml

Удалить примеры:

* src/api/modules/ApiExample.ts
* src/components/Example.vue
* src/containers/ExampleContainer.vue
* ExampleContainer в src/pages/index.vue
* getExample в src/store/modules/app/actions.ts
* setExampleSuccess в src/store/modules/app/mutations.ts
* exampleSuccess в src/store/modules/app/state.ts

Изменить VUE_APP_NAME в src/nuxt.config.js

## Запуск

Запустить проект через команду `npm run dev`

Для сборки - `npm run build`
Так же следует помнить о том, что сервер занимает порт :80

Для генерации статики можно использовать команду `npm run generate`

Для запуска приложения на сервере - `npm run start`
