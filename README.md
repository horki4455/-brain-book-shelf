# brain-book-shelf

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

#アプリ説明

どんなアプリケーション？？

一言で
本の知識は本棚じゃなく、頭の本棚にあっていつでも手元におけるようにしておかなきゃ行けない。

説明
本の読んだ内容をアウトプットする回数、インプットした回数を増やすために作るアプリケーション。

本を読む習慣があるが、その本の内容を一言一句覚えてる人はいない。
大事な部分だけでもなんどもアウトプットする習慣をつける。

全体色は青と、白
ヘッダーあり、サイドバーなし
ログイン情報名前あり(ログアウト情報くらい)。

一覧画面・・・本の検索、読んだ本の一覧
テーブルで一覧と、検索画面でできるようにする。
コンテンツ：タイトル、著者、内容の要約、種類（ビジネスとか）、読んでいる状態、感想、要点の要約

詳細画面・・・readonly で情報を表示する。コンテンツを見れるように

作成画面・・・一覧画面から飛べる、作成ダイアログ

編集/削除・・・一覧、詳細両方から飛べる
