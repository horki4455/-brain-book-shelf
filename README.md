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

## アプリ作成の目的

Vueとfirestoreを利用してアプリケーションを作ってみたいという思いから。  
これまで、バックエンドを作って、インフラ構築してという部分が大きな手間だったが、firebaseを利用してサクッと作ってみたい  
この先はPiniaなどを利用したものでvuexを変えてみたい  

## アプリの説明  
デプロイ先：
https://brain-bookshalf.firebaseapp.com/login/

実装機能  
firebase 使用機能一覧  
・auth （メルアドログイン・グーグルログイン・新規登録機能）  
・store croud 機能、リアルタイム同期機能   
・デプロイ firebase hosting  

nuxt の機能一覧  
・compositionAPI  
・typescript  
 ・vuex でfirebase関連処理  
・middlware で認証管理  
・Google Books APIから書籍データの取得  
・SPAで作成  

UI (vuetify、bootstrap）  
・v-select/v-date-picker/等をラップしコンポーネント化  
・v-data-tableその他各種vuetifyの機能を使用。  

Typescript
・基本的な型付  
・interfaceの作成中  
## 作ってみた結論
・firebase神！！！！！！！！


For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

