[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

![image](https://github.com/user-attachments/assets/647238fa-789b-4a8e-9601-86f57a183ab0)


## Документация:

- [Категории](./docs/categories/index.md)
- [Auth](./docs/auth/index.md)
- [Пост](./docs/posts/index.md)
- [i18n](./docs/i18n/index.md)

# backend

https://github.com/iliyaZelenko/blog-backend

# frontend

На фронтенде используется SSR, точнее Universal/Isomorphic подход, 
то есть при запросе рендерятся на сервере, а дальше как SPA, что дает лучшее SEO и быструю отрисовку чем обычное SPA.

[Why SSR?](https://ssr.vuejs.org/#why-ssr)

На фронте такие технологии:

- Vue
- Nuxt.js (SSR)
    - Node.js сервер
    - Webpack 4 (содержит базовые конфиги под капотом, которые используются чаще всего, как в vue cli 3 проектах)
- Babel 7 для ES2015+ (@nuxtjs/babel-preset-app, типа @babel/preset-env)
- PostCSS (обработка css)
    - postcss-preset-env (типо Babel, но для css)
      - идет вместе с autoprefixer (префиксы)
      - stage 2+
    - cssnano (оптимизация)
- Vuetify (UI Material Design)
- TypeScript
- GraphQL + Apollo client
- Статические анализаторы
    - ESlint (ECMAScript + HTML)
      - Vue plugin (работает только в `template`, в `script` еще не сделали поддержку совместимую с TS)
      - eslint-config-standard
    - TSLint (TypeScript) 
      - tslint-config-standard
    - ~~stylelint (CSS)~~ (нет поддержки stylus, только scss, sass, less :disappointed:)
    - ~~[stylint](https://github.com/SimenB/stylint)~~ (отдельный линтер для stylus, но заброшен 3 года назад и не работает на webpack 4 :disappointed:)
- Stylus (CSS preprocessor)


## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

