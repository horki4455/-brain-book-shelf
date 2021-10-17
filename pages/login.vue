<template>
  <div class="pt-10">
    <!-- ログイン時 -->
    <div v-if="userStatus" key="login">
      <p>{{ user.displayName }}</p>

      <p>ユーザー: {{ $store.getters.getUserName }}</p>
      <v-btn color="red" @click="doLogout()">ログアウト</v-btn>
    </div>
    <!-- 未ログイン時 -->
    <div v-else key="logout">
      <div class="d-flex justify-content-center">
        <h3>
          <p>brain-booksharfe</p>
        </h3>
      </div>
      <div>
        <v-form>
          <div class="d-flex justify-content-center">
            <v-col cols="10" class="mb-0">
              <!-- TODO:形状の変更 -->
              <TextInput
                type="email"
                v-model="mailaddress"
                label="メールアドレス"
              />
            </v-col>
          </div>
          <div class="d-flex justify-content-center">
            <v-col cols="10">
              <TextInput type="password" v-model="password" label="password" />
            </v-col>
          </div>

          <div class="d-flex justify-content-center">
            <v-btn
              color="blue lighten-2"
              dark
              rounded
              width="214"
              @click="login()"
              >メールアドレスでログイン</v-btn
            >
            <v-btn
              color="red lighten-2"
              dark
              rounded
              width="214"
              @click="doLogin()"
              class="ml-3"
              >googleでログイン</v-btn
            >
          </div>
        </v-form>
        <div class="my-10">
          <div class="d-flex justify-content-end">
            <div>
              <router-link class="router" to="signup"
                >アカウントを作成へ進む</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useStore,
  useRouter,
} from '@nuxtjs/composition-api'
import { auth } from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const mailaddress = ref('')
    const password = ref('')
    const user = computed(() => {
      return store.getters.user
    })
    const userStatus = computed(() => {
      return store.getters.isSignedIn
    })
    const doLogin = () => {
      store.dispatch('login').catch((err) => {
        alert(err.message)
      })
    }
    // ログアウト処理
    const doLogout = () => {
      store
        .dispatch('signOut')
        .then(() => {
          alert('ログアウトしました')
          // router.go({ name: '/login' })
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    // ログイン処理
    const login = () => {
      auth
        .signInWithEmailAndPassword(mailaddress.value, password.value)
        .then(() => {
          alert('ログインしました')
          // router.go({ name: '/books' })
        })
        .catch((err) => {
          alert(err.message)
        })
        .catch((err) => {
          alert(err.message)
        })
    }
    return {
      mailaddress,
      password,
      user,
      userStatus,
      doLogin,
      doLogout,
      login,
    }
  },
})
</script>
