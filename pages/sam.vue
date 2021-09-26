<template>
  <div class="body">
    <div>
      <div class="header">
        <span class="top-title">chat-room</span>
        <span></span>
      </div>
      <div class="card__wrapper">
        <div>
          <div v-for="todo in $store.getters.getTodos" :key="todo.id">
            <v-card>
              <div>内容：{{todo.limit}}</div>

              <v-btn color="primary" @click="selectedId = todo.id">編集</v-btn>

              <TextInput v-model="updateTodo" />
              <v-btn @click="editTodo(todo.id)">更新</v-btn>
              <v-btn @click="selectedId = ''">キャンセル</v-btn>

              <v-btn type="danger" @click="deleteTodo(todo.id)">削除</v-btn>
            </v-card>
          </div>
          <div>
            <TextInput v-model="createBookInput" />
            <v-btn @click="addTodo">送信する</v-btn>
          </div>
        </div>
        <div>{{todos}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import {db} from '@/plugins/firebase'

export default{
  data(){
    return{
      updateTodo: '',
			createBookInput: '',
      todos: '',
      Todos: [],
      selectedId: '',
    }
  },
	methods:{
		login(){
			this.$store.dispatch('login')
    },
    addTodo(){
      const limit = this.createBookInput

      this.$store.dispatch('addTodo', {limit})
      this.createBookInput = ''
		},
		deleteTodo(docId){
			db.collection("todos").doc(docId).delete()
    },
    editTodo(docId){
      console.log(docId)
      db.collection("todos").doc(docId).update({
        'limit': this.updateTodo,
      },)
      this.selectedId = ''
    },
  },


  mounted() {
    db.collection('todos')
      .onSnapshot(snapshot => {
        this.$store.commit("clearTodo")
        snapshot.forEach(doc => {
          let data = doc.data()
          let id = { id: doc.id }
          const content = { ...data, ...id }
          this.$store.commit("addTodo", content)
          }
        )
      })
  }
}
</script>
