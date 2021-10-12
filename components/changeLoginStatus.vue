<template>
  <div>
    <v-toolbar-items>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="text-white" v-on="on" text>
            <div v-if="userStatus">
              <p>user: {{ $store.getters.getUserName }}</p>
            </div>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <div @click="doLogout">ログアウト</div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <router-link to="mypage">マイページ</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user
    },
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignedIn
    },
  },
  methods: {
    doLogout: function (err) {
      this.$store
        .dispatch('signOut')
        .then(() => {
          alert('ログアウトしました')
          // TODO: ここの処理おかしい
          this.$router.go({ path: this.$router.currentRoute.path, force: true })
        })
        .catch((err) => {
          alert(err.message)
        })
    },
  },
}
</script>
