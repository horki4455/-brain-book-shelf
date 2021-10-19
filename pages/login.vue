<template>
  <div class="pt-10">
    <div>
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
              @click="emailLogin()"
              >メールアドレスでログイン</v-btn
            >
            <v-btn
              color="red lighten-2"
              dark
              rounded
              width="214"
              @click="doGoogleLogin()"
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
    const userStatus = computed(() => {
      return store.getters.isSignedIn
    })
    const doGoogleLogin = () => {
      store.dispatch('googleLogin')
    }

    // ログイン処理・TODO:これもstoreで管理へ移行
    const emailLogin = async () => {
      auth
        .signInWithEmailAndPassword(mailaddress.value, password.value)
        .then((result) => {
          const user = result.user
          store.commit('setUserUid', user.uid)
          store.commit('setUserName', user.displayName)
        })
        .then(() => {
          alert('ログインしました')
          router.push({ name: 'books' })
        })

        .catch((err) => {
          alert(err.message)
        })
    }
    return {
      mailaddress,
      password,
      // user,
      userStatus,
      doGoogleLogin,
      emailLogin,
    }
  },
})
</script>
