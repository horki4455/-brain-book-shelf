<template>
  <div>
    <div>
      <!-- ログイン時にはフォームとログアウトボタンを表示 -->
      <div v-if="userStatus">
        <p>user: {{ $store.getters.getUserName }}</p>
        <!-- <div>画像表示予定</div> -->
        <el-button type="danger" @click="doLogout">Sign out</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
    // ログインするとtrue
      return this.$store.getters.isSignedIn;
    }
  },
  methods:{
    doLogout: function(err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          alert('ログアウトしました')
          // TODO: ここの処理おかしい
          this.$router.go({path: this.$router.currentRoute.path, force: true})
        })
        .catch((err) => {
          alert(err.message)
        })
    }
  }
}
</script>