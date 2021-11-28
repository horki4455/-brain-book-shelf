<template>
  <div>
    <h3 class="text-align-center">アプリの説明</h3>
    <div class="text-muted small my-6 ml-4">
      このアプリケーションは、頭の中に本棚を作ることを目標に作られたアプリケーションです。<br />
    </div>
    <div class="mb-10">
      <Divider message="アプリの使い方" />
      <div>ステップ１：　本を読む</div>
      <div>ステップ２：　本のまとめ・感想をつくる</div>
      <div>ステップ３：　読んだ本を読み返す</div>

      <div class="mt-5">＊　編集は、自分の投稿したもののみ可能です。</div>
      <div>
        ＊　マイページでは自分の（作成中）チャートで自分の投稿したものが確認できます。
      </div>
    </div>
    <Divider message="アプリ使用技術一覧" />
    <div>言語：　typescript（基本的なインターフェース・型の種類の使用)</div>
    <div>FW：　nuxt(compositionAPI)</div>
    <div>UI関連：　vuetify/bootstrap/css</div>
    <div>バックエンド・サーバー：firebase cloud storage</div>
    <div>ログイン・認証周り：firebase auth</div>
    <div>store管理: vuex ＝＞　pinia に移行中</div>
    <div>PWA化済み</div>
    <div>一部レスポンシブ対応済み</div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {},
})
</script>
