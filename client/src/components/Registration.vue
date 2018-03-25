<template>
<div class="content">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Todo Ala Ala</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <div class="form-row">
            <div class="form-group form-group-top col-md-5">
              <input v-model="email" type="text" class="form-control" id="email" placeholder="Email Address">
            </div>
            <div class="form-group form-group-top col-md-5">
              <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            </div>
            <button v-on:click="submitloginform" type="button" class="btn btn-outline-primary btn-top">Sign in</button>
          </div>
        </li>
      </ul>
    </div> 
  </nav>
  <signupchildren></signupchildren>
</div>
</template>

<script>
import routes from '@/router'
import signupchildren from '@/components/SignupChildren'
import axios from 'axios'
import swal from 'sweetalert'
export default {
  components: {
    signupchildren
  },
  data () {
    return {
      email: '',
      password: '',
      quotes: ''
    }
  },
  created () {
    localStorage.clear()
  },
  methods: {
    submitloginform () {
      let loginform = {
        email: this.email,
        password: this.password
      }
      let countblank = 0
      Object.keys(loginform).forEach((key, index) => {
        if (loginform[key] === '') {
          countblank++
        }
      })
      if (countblank > 0) {
        swal ({
          title: 'Error',
          text: 'Email and Password are required',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        axios.post('http://localhost:3000/registration/login',loginform).then(response => {
          const token = response.data
          this.email = ''
          this.password = ''
          localStorage.setItem('taatkn', token)
          this.login = true
          routes.push({
            path: '/'
          })
        })
      }
    }
  }
}
</script>

<style scoped>
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
.form-group-top{
  margin: 0 !important;
  padding: 0 10px !important;
}
.btn-top{
  margin-left: 10px !important;
  margin-top: 0px !important;
  padding: 0 8px !important;
}
</style>
