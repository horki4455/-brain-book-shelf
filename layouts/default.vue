<template>
  <div>
    <v-app class="app">
      <v-app-bar color="primary" app dark hight="60">
        <v-toolbar-title>Brain BookSheld</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-menu offset-y>
            <template v-slot:activator="{on}">
              <v-btn v-on="on" text>user name</v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Consulting and support</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Discord community</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-app-bar>
    </v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </div>
</template>
<style scoped>
.v-application {
  background-color: white;
}
</style>
