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
              <!-- TODO:clearable押すとエラーたまになる -->
              <TextInput
                type="email"
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

          <div class="d-flex justify-content-center">
            <RoundedButton
              text="テストユーザーでログイン"
              color="green lighten-2"
              @click="testLogin"
              class="mr-2"
            />

            <RoundedButton
              text="メールアドレスでログイン"
              color="blue lighten-2"
              @click="emailLogin"
              class="mr-2"
            />

            <RoundedButton
              text="googleでログイン"
              color="red lighten-2"
              @click="doGoogleLogin"
              class="mr-2"
            />
          </div>
        </v-form>
        <div class="my-10">
          <div class="d-flex justify-content-end">
            <div>
              <router-link to="/signup">アカウントを作成へ進む</router-link>
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

export default defineComponent({
  setup() {
    const store = useStore()
    const mailaddress = ref('')
    const password = ref('')
    const testUserMailaddress = ref('test@example.com')
    const testUserPassword = ref('testtest')
    const userStatus = computed(() => {
      return store.getters.isSignedIn
    })
    const doGoogleLogin = () => {
      store.dispatch('googleLogin')
    }

    const testLogin = () => {
      store.dispatch('emailLogin', {
        Email: testUserMailaddress.value,
        Pass: testUserPassword.value,
      })
    }

    const emailLogin = () => {
      store.dispatch('emailLogin', {
        Email: mailaddress.value,
        Pass: password.value,
      })
    }
    const required = (value: string) => !!value || '必ず入力してください'
    const limit_length = (value: string) =>
      value.length <= 12 || '12文字以内で入力してください'
    return {
      // データ
      mailaddress,
      password,
      // メソッド
      testLogin,
      userStatus,
      doGoogleLogin,
      emailLogin,
      required,
      limit_length,
    }
  },
})
</script>
