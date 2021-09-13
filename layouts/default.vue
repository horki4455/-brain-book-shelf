<template>
  <div>
    <v-app class="eader-container">
      <v-app-bar color="green" app class="header-container">
        <v-toolbar-title>
          <h3 class="text-white">Brain BookSheld</h3>
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-menu offset-y>
            <template v-slot:activator="{on}">
              <v-btn class="text-white" v-on="on" text>user name</v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>ログアウト</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>マイページ</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-app-bar>
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