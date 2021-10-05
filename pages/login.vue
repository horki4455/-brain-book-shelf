<template>
  <div class="pt-10">
    <!-- ログイン時 -->
    <div v-if="userStatus" key="login">
      <p>{{ user.displayName }}</p>

      <p>ユーザー: {{ $store.getters.getUserName }}</p>
      <v-btn color="red" @click="doLogout">ログアウト</v-btn>
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
              <TextInput type="email" v-model="mailaddress" label="メールアドレス" />
            </v-col>
          </div>
          <div class="d-flex justify-content-center">
            <v-col cols="10">
              <TextInput type="password" v-model="password" label="password" />
            </v-col>
          </div>

          <div class="d-flex justify-content-center">
            <v-btn color="blue lighten-2" dark rounded width="214" @click="login">メールアドレスでログイン</v-btn>
            <v-btn
              color="red lighten-2"
              dark
              rounded
              width="214"
              @click="doLogin"
              class="ml-3"
            >googleでログイン</v-btn>
          </div>
        </v-form>
        <div class="my-10">
          <div class="d-flex justify-content-end">
            <div>
              <router-link class="router" to="SignUp">アカウントを作成へ進む</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {auth, db, firebase} from '@/plugins/firebase'

export default{
  // TODO:compositionAPIに書き換える
  data(){
    return{
      mailaddress: '',
      password: ''
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
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.mailaddress, this.password)
        .then(() => {
          alert('ログインしました')
          this.$router.go({path: this.$router.currentRoute.path, force: true})
          this.$router.push({
            name: 'chatspace'
          })
        })
        .catch((err) => {
          alert(err.message)
        })
        .catch((err) => {
          alert(err.message)
        })
    },
    doLogin() {
      this.$store.dispatch('login')
        .catch((err) => {
          alert(err.message)
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


