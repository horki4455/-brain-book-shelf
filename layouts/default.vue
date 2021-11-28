<template>
  <div>
    <v-app class="eader-container">
      <v-app-bar color="green" app class="header-container">
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          dark
          @click.stop="changeDrawerFlag"
        />

        <v-toolbar-title>
          <router-link to="/introduction" class="hidden-sm-and-down">
            <h3 class="text-white pt-2">Brain BookSheld</h3></router-link
          >
        </v-toolbar-title>
        <router-link to="/thinkIndex" class="hidden-sm-and-down">
          <u class="text-white ml-5"> 最新本の感想一覧 </u></router-link
        >
        <router-link to="/books" class="hidden-sm-and-down">
          <u class="text-white ml-5"> マイ本棚一覧 </u></router-link
        >
        <v-spacer />
        <changeLoginStatus />
      </v-app-bar>
      <v-main>
        <v-container>
          <SideBar v-model="isOpenSideBar" :close="changeDrawerFlag" />
          <nuxt />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const isOpenSideBar = ref(false)
    const changeDrawerFlag = () => {
      isOpenSideBar.value = !isOpenSideBar.value
      console.log(isOpenSideBar.value, 'ちぇんじふらぐ')
    }
    return {
      isOpenSideBar,
      changeDrawerFlag,
    }
  },
})
</script>

<style scoped>
.header-container {
  position: fixed;
}
</style>
