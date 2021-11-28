<template>
  <div>
    <v-navigation-drawer
      :value="value"
      @input="$emit('close')"
      absolute
      temporary
    >
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item to="/introduction">
            <v-list-item-title> Brain BookSheld</v-list-item-title>
          </v-list-item>
          <v-list-item to="/thinkIndex">
            <v-list-item-title> 最新本の感想一覧 </v-list-item-title>
          </v-list-item>

          <v-list-item to="/books">
            <v-list-item-title> マイ本棚一覧 </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      Type: Boolean,
      default: false,
    },
  },
  setup() {},
})
</script>
