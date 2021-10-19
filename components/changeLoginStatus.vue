<template>
  <div>
    <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="text-white" v-on="on" text>
            {{ userStatus }}
            <div v-if="userStatus">
              <p>
                ユーザー名:
                {{
                  $store.getters.getUserName
                    ? $store.getters.getUserName
                    : currentUserEmail
                }}
              </p>
            </div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <div @click="doLogout()">ログアウト</div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <router-link to="/mypage">マイページ</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </div>
</template>
<script>
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const user = () => {
      return store.getters.user
    }
    const currentUserEmail = store.getters.getCurrentUserEmail
    const userStatus = () => {
      return store.getters.isSignedIn
    }
    const doLogout = () => {
      store.dispatch('signOut').catch((err) => {
        alert(err.message)
      })
    }
    return {
      userStatus,
      user,
      doLogout,
      currentUserEmail,
    }
  },
})
</script>
