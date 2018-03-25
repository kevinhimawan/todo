<template>
  <div class="content col-lg-10">
    <div class="content-header">
      <div class="form-group col-lg-11">
        <input v-model="newtodo" type="email" class="form-control" id="addtodo" placeholder="Create a new todo list here">
      </div>
      <div class="add-todo col-lg-1">
        <a v-on:click="addTodo" class="todo-add-icon"><i class="fas fa-plus"></i></a>
      </div>
    </div>
    <div class="cards-content">
      <div v-for="(to, i) in todo" :key="i" class="card">
        <div class="card-body card-body-todo">
          <div class="todo-name col-lg-11">
            <h4 class="todo-name-font">{{to.name}}</h4>
          </div>
          <div class="todo-action col-lg-1">
              <a v-on:click="removetodo(to._id)" class="todo-delete-icon" style="padding: 0;border: 0;"><i class="fas fa-trash"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState } from 'vuex';
export default {
  data () {
    return {
      newtodo: ''
    }
  },
  props: ['projectid'],
  created: function () {
    this.fetchdata()
  },
  methods: {
    ...mapMutations([
      'changetodo'
    ]),
    fetchdata () {
      axios.get(`http://localhost:3000/getprojectdata/${this.projectid}`).then(response => {
        this.changetodo(response.data.todo)
      })
    },
    addTodo () {
      let form = {
        todo: this.newtodo,
        projectid: this.projectid
      }
      let error = 0
      Object.keys(form).forEach((key, index) => {
        if (form[key] === '') {
          error++
        }
      })
      if (error > 0) {
        swal({
          title: 'Todo list is required',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        axios.post('http://localhost:3000/createtodo',form).then(response => {
          this.newtodo = ''
          this.changetodo(response.data.todo)
        })
      }
    },
    removetodo (todoid) {
      swal({
        title: 'Removed Todo',
        text: 'It will deleted forever',
        icon: 'warning',
        buttons: {
          confirm: {
            text: 'Confirm',
            value: 'confirm'
          },
          no: {
            text: 'Cancel',
            value: 'cancel'
          }
        }
      }).then((value) => {
        if (value == 'confirm') {
          axios.delete('http://localhost:3000/removetodo/' + todoid, {
            headers: {
              projectid: this.projectid
            }
          }).then(response => {
            console.log(response.data)
            this.changetodo(response.data.todo)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  },
  watch: {
    projectid: function () {
      this.fetchdata()
    }
  },
  computed: {
    ...mapState([
      'todo'
    ])
  }
}
</script>

<style scoped>
.content{
  display: flex;
  flex-direction: column;
  margin-left: auto;
}
.content-header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.form-group{
  margin-bottom: 0 !important;
  padding: 0 !important;
}
.form-control{
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  border-bottom: 1px solid #ced4da;
  padding-left: 0 !important;
  border-radius: 0;
  -webkit-appearance: none !important;
  box-shadow: none !important;
}
.add-todo{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 !important;
}
.todo-add-icon{
  padding: 0;
  border: 0;
  font-size: 1.1em
}
.todo-add-icon:hover{
  cursor: pointer;
}
.card-body-todo{
  display: flex;
  justify-content: space-between;
  padding: 10px 0 10px 10px !important;
}
.todo-name{
  text-align: left;
  padding: 0;
}
.todo-name-font{
  margin: 0;
  font-size: 1.2em !important;
  font-weight: 300;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.todo-action{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0
}
.todo-delete-icon:hover{
  cursor: pointer;
}
.card{
  margin-bottom: 15px;
}
</style>
