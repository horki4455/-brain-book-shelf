<template>
  <div class="pt-10">
    <v-form>
      <div class="d-flex justify-content-center mb-5">
        <h3>新しいアカウントを作成</h3>
      </div>

      <div class="d-flex justify-content-center">
        <v-col cols="10" class="mb-0">
          <!-- TODO:正規表現で「＠」必須にする -->
          <TextInput
            v-model="mailaddress"
            label="メールアドレス"
            :rules="[required]"
          />
        </v-col>
      </div>
      <div class="d-flex justify-content-center">
        <v-col cols="10">
          <TextInput
            type="password"
            v-model="password"
            label="password"
            :rules="[required, limit_length]"
          />
        </v-col>
      </div>
    </v-form>

    <div class="d-flex justify-content-center">
      <RoundedButton class="mr-5" text="登録" @click="signUp" />>
    </div>
    <div class="d-flex justify-content-end mt-5">
      <router-link class="router" to="login">ログイン画面へ戻る</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  useStore,
  useRouter,
  toRefs,
} from '@nuxtjs/composition-api'
import { auth } from '@/plugins/firebase'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    const datas = reactive({
      password: '',
      mailaddress: '',
    })
    const userStatus = computed(() => {
      return store.getters.isSignedIn
    })
    const signUp = () => {
      auth
        .createUserWithEmailAndPassword(datas.mailaddress, datas.password)
        .then(() => {
          alert('ユーザーが作成されました！')
          router.push({
            name: 'login',
          })
        })
        .catch((err) => {
          alert('ユーザーが作成されませんでした')
          console.log(err.message)
        })
    }
    const required = (value: string) => !!value || '必ず入力してください'
    const limit_length = (value: string) =>
      value.length <= 12 || '12文字以内で入力してください'

    return {
      ...toRefs(datas),
      userStatus,
      signUp,
      required,
      limit_length,
    }
  },
})
</script>
