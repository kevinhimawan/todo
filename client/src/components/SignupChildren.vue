<template>
  <div class="row">
    <div class="col-lg-7 quotes-site">
      <blockquote class="blockquote quote-quote">
        <p class="mb-0">{{quotes.quote}}</p>
        <footer class="blockquote-footer"><cite title="Source Title">{{quotes.author}}</cite></footer>
      </blockquote>
    </div>
    <div class="col-lg-5 signupform">
      <div class="title-top">
        <h1 class="title-main-font">Create New Account</h1>
        <h4>It's always free</h4>
      </div>
      <form>
        <div class="form-group col-lg-8">
          <label for="username">Username</label>
          <input v-model="form.username" type="text" class="form-control" id="username">
        </div>
        <div class="form-group col-lg-8">
          <label for="emailsignup">Email</label>
          <input v-model="form.email" type="email" class="form-control" id="emailsignup">
        </div>
        <div class="form-group col-lg-8">
          <label for="passwordsignup">Password</label>
          <input v-model="form.password" type="password" class="form-control" id="passwordsignup">
        </div>
        <div class="form-group col-lg-8">
          <label for="confirmation-password">Confirmation Password</label>
          <input v-model="form.confirmation_password" type="password" class="form-control" id="confirmation-password">
        </div>
        <button type="button" v-on:click="createacount" class="btn btn-outline-primary">Create Account</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import routes from '@/router'
export default {
  data () {
    return {
      quotes: '',
      form: {
        username: '',
        email: '',
        password: '',
        confirmation_password: ''
      },
    }
  },
  created () {
    axios.get('https://talaikis.com/api/quotes/random/').then(response => {
      console.log(response.data)
      this.quotes = response.data
    })
  },
  methods: {
    createacount () {
      let countblank = 0
      Object.keys(this.form).forEach((key, index) => {
        if (this.form[key] === '') {
          countblank++
        }
      })
      if (countblank > 0) {
        swal ({
          title: 'Found Blank Input',
          text: 'All sign-up form input are required',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        if(this.form.password !== this.form.confirmation_password) {
          console.log('hey')
          swal ({
            title: 'Confirmation password is not match',
            icon: 'warning',
            button: 'Revise'
          })
        } else {
          axios.post('http://localhost:3000/registration/signup', this.form).then(response => {
            localStorage.setItem('taatkn', response.data)
            routes.push({
              path: '/'
            })
          })
        }
      }
    }
  }
}
</script>

<style>
.form-control{
  font-size: .9em !important;
}
  .row{
    margin: 40px 10px;
  }
  .form-group{
    text-align: left;
    padding: 0;
    margin-bottom: 10px;
  }

  .signupform{
    text-align: left;
  }

  .title-main-font{
    font-size: 2em;
  }

  .title-top{
    margin-bottom: 20px;
  }

  label{
    margin-bottom: 8px;
  }

  .btn{
    margin-top: 20px;
  }

  .quotes-site {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
    padding: 0 40px;
  }

  .quote-quote{
    padding-right: 80px;
  }
</style>
