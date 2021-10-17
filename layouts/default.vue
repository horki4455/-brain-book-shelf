<template>
  <div>
    <v-app class="eader-container">
      <v-app-bar color="green" app class="header-container">
        <v-toolbar-title>
          <router-link to="introduction" class="text-white">
            <h3 class="text-white">Brain BookSheld</h3></router-link
          >
        </v-toolbar-title>
        <router-link to="lank">
          <u class="text-white ml-5"> 最新本の感想一覧 </u></router-link
        >
        <router-link to="books">
          <u class="text-white ml-5"> 本棚一覧 </u></router-link
        >
        <v-spacer />
        <changeLoginStatus />
      </v-app-bar>
      <!-- TODO:実装 -->
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
