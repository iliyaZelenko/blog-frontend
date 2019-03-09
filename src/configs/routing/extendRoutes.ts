const { SRC_DIR, PAGES_EXTENDED_DIR } = global.appEnv

export default (routes, resolve) => {
  routes.push(...[
    {
      name: 'category-with-path',
      // тестил тут http://forbeslindesay.github.io/express-route-tester/
      // Идентификатор в начале URL потому что:
      // Длинные URL-адреса часто усекаются в электронных письмах или в системах управления контентом.
      // Когда идентификатор находится в начале, он не блокируется, можно исправить кучу неработающих ссылок.
      // Пример категории: /categories/id-23/cat1/cat2/cat3
      path: '/categories/id-:id(\\d+)/:path*/page-:page',
      // OLD:
      // хотел сделать чтобы path и id не обязательно указывать, то есть чтобы было просто /categories,
      // но потратив несколько часов на это и убедившись что врядли так можно сделать, по крайней мере очень тяжело,
      // проще было сделать отдельный роут /categories
      // если указывается путь, то не обязательно указывать id. наоборот возможно, напримрер, /categories/-id32343
      // обычный нормальный путь смотрится как: "/categories/animals/cats/sweet-id228" ID будет 228.
      // /categories/:path(.*[^-id])-id:id(\d+)
      // /categories/:path(.*?[^-id])?-id:id(\d+)?
      // /categories/:path(.*?[^-id])?(-id)?:id(\d+)?
      // было но ломалось если содержало -, i или d: /categories/:path([^-id]*)?(-id)?:id(\d+)?
      // было но не считало "/" в path: :path?(-id)?:id(\d+)?
      // было: (/:path*-id:id)?
      // было: /categories/:path*-id:id
      // до этого еще было: path+-id:id
      component: resolve(PAGES_EXTENDED_DIR, 'categories/index.vue'),
      props: true
    },
    {
      name: 'categories',
      path: '/categories',
      component: resolve(PAGES_EXTENDED_DIR, 'categories/index.vue'),
      props: true
    },
    {
      name: 'post',
      path: '/post/id-:id(\\d+)/:slug*',
      component: resolve(PAGES_EXTENDED_DIR, 'post/index.vue'),
      props: true
    },
    {
      name: 'custom',
      path: '*',
      component: resolve(SRC_DIR, 'pages/404.vue')
    }
  ])
}
