<template>
  <div>
    <div>
      <!-- ログイン時 -->
      <div v-if="userStatus" key="login" class="navbar-item">
        <p class="navbar-item">{{ user.displayName }}</p>
        <!-- <div>画像表示場所</div> -->
        <p>ユーザー: {{ $store.getters.getUserName }}</p>
        <v-btn type="danger" @click="doLogout">ログアウト</v-btn>
      </div>
      <!-- 未ログイン時 -->
      <div v-else key="logout">
        <div class="card__text">ログイン</div>
        <Signin />
        <div class="button-wrapper">
          <span type="button" @click="doLogin">
            <v-btn size="large" type="danger">googleアカウントでログイン</v-btn>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {auth, db} from '@/plugins/firebase'
export default{
  // TODO:compositionAPIに書き換える
  data(){
    return{
      
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


