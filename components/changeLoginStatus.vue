<template>
  <div>
    <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="text-white" v-on="on" text>
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
import { defineComponent, useStore, useRouter } from '@nuxtjs/composition-api'
import { auth } from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = () => {
      return store.getters.user
    }
    const currentUserEmail = auth.currentUser.email
    const userStatus = () => {
      // ログインするとtrue
      return store.getters.isSignedIn
    }
    const doLogout = () => {
      store
        .dispatch('signOut')
        .then(() => {
          router.push({ name: '/login' })
        })
        .catch((err) => {
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
