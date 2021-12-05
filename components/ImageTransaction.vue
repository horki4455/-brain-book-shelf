<template>
  <v-container>
    <v-progress-linear v-model="fileLoading" stream></v-progress-linear>
    <v-file-input v-model="inputFile" accept=".jpeg"></v-file-input>
    <v-btn :disabled="!inputFile" @click="upload(inputFile)"> submit </v-btn>
    <v-btn @click="getStorage">ダウンロード</v-btn>
    <!-- <div>'きているぽいが処理がうまくいってない'{{ getFile }}</div> -->

    <v-img max-height="150" max-width="250" :src="getFile" />

    <!-- <div v-for="i in getFile" :key="i.userId" style="white-space: pre-line">
      <p>id : {{ i.userId }}</p>
      <p>name : {{ i.name }}</p>
      <p>age : {{ i.age }}</p>
    </div> -->
  </v-container>
</template>

<script>
import { storage } from '@/plugins/firebase'

export default {
  name: 'Storage',
  data: () => ({
    getFile: '',
    fileLoading: '',
    inputFile: null,
  }),
  async created() {
    await this.getStorage()
  },
  methods: {
    //ファイルのアップロード
    upload(file) {
      const storageRef = storage.ref(`assets/${file.name}`) //ファイルの参照
      const uploadTask = storageRef.put(file) //ファイルのアップロード
      //アップロードとその状況の監視
      uploadTask.on(
        'state_changed',
        //送信中
        (snapshot) => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.fileLoading = percentage
        },
        //エラー
        (error) => {
          console.log(error)
        },
        //完了
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              this.fileLoading = 0 //v-progress-linerの初期化
              this.inputFile = null //ファイル入力欄の初期化
              return this.$axios.get(url)
            })
            .then((response) => {
              const data = response.data
              this.getFile = data.users
            })
        }
      )
    },
    getStorage() {
      console.log('ダウンロード')
      const file = storage.ref('assets/山.jpeg') //ファイルの参照
      file
        .getDownloadURL()
        .then((url) => {
          return this.$axios.get(url)
        })
        .then((response) => {
          // console.log(response.config.url)
          const data = response.config.url
          this.getFile = data
        })
    },
  },
}
</script>
