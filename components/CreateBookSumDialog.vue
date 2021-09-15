<template>
  <v-card>
    <v-card-title class="d-flex justify-content-center">
      <span>読書データの作成</span>
    </v-card-title>
    <v-card-text>
      <div>
        <v-row class="mt-2">
          <v-col cols="4">
            <TextInput label="タイトル" v-model="title" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="ID" v-model="id" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="著者" v-model="auther" :clearable="false" />
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="4">
            <TextInput label="読了日" v-model="finishDay" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="ステータス" v-model="status" :clearable="false" />
          </v-col>
          <v-col cols="4">
            <TextInput label="ジャンル" v-model="kind" :clearable="false" />
          </v-col>
        </v-row>
        <!-- TODO: 複数個登録可能にする -->
        <div class="my-9">
          <v-textarea v-model="think" outlined label="要約/感想" />
        </div>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="success" @click="submit">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { ref, defineComponent, toRefs } from '@vue/composition-api'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
    think: {
      type: String,
      default: '',
    },
    finishDay: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    kind: {},
  },
  setup(props, { emit }) {
    const createDefaultInput = () =>
      ref({
        title: '',
        think: '',
        finishDay: '',
        status: '',
        kind: '',
      })
    const submit = () => {
      emit('clickSubmit', createDefaultInput)
    }
    return {
      submit,
      //
      ...toRefs(createDefaultInput),
    }
  },
})
</script>
