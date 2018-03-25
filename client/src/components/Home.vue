<template>
  <div class="content">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Todo Ala Ala</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a v-on:click="signout" class="nav-link" href="#">Sign Out</a>
          </li>
        </ul>
      </div> 
    </nav>
    <addproject></addproject>
    <div class="row">
      <div class="col-lg-3 home-side-bar">
        <div class="project-header">
          <div class="project-title col-lg-10">
            <h2 class="project-title-font">Project</h2>
          </div>
          <div class="project-add col-lg-2">
            <a data-toggle="modal" data-target="#addproject" class="project-add-icon" style="padding: 0;border: 0;font-size:1.1em"><i class="fas fa-plus"></i></a>
          </div>
        </div>
        <div class="project-content-nest">
          <div v-for="(project, i) in projects" :key="i" class="card card-project">
            <div class="card-bod card-body-project">
              <div class="project-name col-lg-10">
                  <router-link class="project-name-font-route" :to="{name: 'Todo', params: { projectid: project._id }}">{{project.name}}</router-link>
              </div>
              <div class="project-delete col-lg-2">
                <a v-on:click="removeproject(project._id)" class="project-delete-icon" style="padding: 0;border: 0;"><i class="fas fa-trash"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import addproject from '@/components/AddProject'
import {mapMutations, mapState} from 'vuex'
import routes from '@/router'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    addproject
  },
  created () {
    const token = localStorage.getItem('taatkn')
    if (!token) {
      localStorage.clear()
      routes.push({
        path: '/registration'
      })
    } else {
      axios.get('http://localhost:3000/',{
        headers: {
          token
        }
      }).then(response => {
        this.changeproject(response.data.project)
      })
      .catch(err => {
        localStorage.clear()
        routes.push({
          name: 'Registration'
        })
      })
    }
  },
  methods: {
    ...mapMutations([
      'changeproject'
    ]),
    signout () {
      localStorage.clear()
      routes.push({
        name: 'Registration'
      })
    },
    removeproject (projectid) {
      swal({
        title: 'Caution',
        text: 'You will also delete all the todo list inside this project',
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
      }).then(res => {
        if (res === 'confirm') {
          axios.delete('http://localhost:3000/removeproject/' + projectid, {
            headers: {
              token: localStorage.getItem('taatkn')
            }
          }).then(response => {
            this.changeproject(response.data.project)
          })
        }
      })
    }
  },
  computed: {
    ...mapState ([
      'projects'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.navbar {
  padding: 15px 40px !important;
}
.navbar-brand {
  font-family: 'Pacifico', cursive !important;
  font-size: 2em;
  font-weight: 400;
}
.navbar-collapse{
  justify-content: flex-end !important;
}

.row{
  margin: 40px;
}

.home-side-bar{
  margin: 0;
  height: 600px;
}
.project-header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.project-title{
  padding: 0;
  text-align: left;
}
.project-title-font{
  font-size: 1.8em;
  font-weight: normal;
  margin: 0
}
.project-add{
  padding: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.project-add-icon:hover{
  cursor: pointer;
}
.card-project{
  margin-bottom: 15px;
}
.card-body-project{
  display: flex;
  justify-content: space-between;
  padding: 10px !important;
}
.project-name{
  text-align: left;
  padding: 0;
}
.project-content-nest{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.project-name-font{
  font-size: 1em;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 24px;
}
.project-delete{
  display: flex;
  justify-content: flex-end;
  padding: 0;
}
.project-delete-icon:hover{
  cursor: pointer;
}
.project-name-font-route{
  color: #007bff;
}
.project-name-font-route:hover{
  text-decoration: none;
}
</style>
