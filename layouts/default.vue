<template>
  <div>
    <v-app class="eader-container">
      <v-app-bar color="green" app class="header-container">
        <v-toolbar-title>
          <h3 class="text-white">Brain BookSheld</h3>
        </v-toolbar-title>
        <v-spacer />
        <changeLoginStatus />
      </v-app-bar>
      <!-- TODO:時間あるとき実装 -->
      <!-- <v-breadcrumbs :items="items" divider="=>" large exact: true/> -->
      <v-main>
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'トップページ',
          href: '/',
        },
        {
          text: '一覧',
          href: '/books',
        },
        {
          text: '詳細',
          href: '/books_id',
        },
      ],
    }),
  }
</script>
<style scoped>
.header-container {
  position: fixed;
}
</style>