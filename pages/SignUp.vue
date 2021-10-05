<template>
  <div class="pt-10">
    <v-form>
      <div class="d-flex justify-content-center mb-5">
        <h3>新しいアカウントを作成</h3>
      </div>

      <div class="d-flex justify-content-center">
        <v-col cols="10" class="mb-0">
          <!-- TODO:作成・ログインが機能していないので修正 -->
          <TextInput type="email" v-model="mailaddress" label="メールアドレス" />
        </v-col>
      </div>
      <div class="d-flex justify-content-center">
        <v-col cols="10">
          <TextInput type="password" v-model="password" label="password" />
        </v-col>
      </div>
    </v-form>

    <div class="d-flex justify-content-center">
      <v-btn color="red lighten-2" dark rounded width="214" @click="signUp">登録</v-btn>
    </div>
    <div class="d-flex justify-content-end mt-5">
      <router-link class="router" to="login">ログイン画面へ戻る</router-link>
    </div>
  </div>
</template>
<script>

import {auth, db,firebase} from '@/plugins/firebase'
export default{
  data(){
    return{
      newTodo: '',
			newLimit: '',
			koreageru: 'hoge',
      doorStatus: true,
      name: 'authentication',
      password: '',
      mailaddress: ''
			
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      return this.$store.getters.isSignedIn;
    }
  },
  methods: {
    doLogin() {
      this.$store.dispatch('login').then(() => {
          alert('ログイン成功！')
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        })
        .catch((err) => {
          alert(err.message)
        })
    },
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          alert('ユーザーが作成されました！')
          this.$router.push({
            name: 'login'
          })
        })
        .catch((err) => {
          alert('ユーザーが作成されませんでした')
          console.log(err.message)
        })
    },
    // ログアウト処理
    doLogout: function(err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          alert('ログアウトしました')
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }
};
</script>
