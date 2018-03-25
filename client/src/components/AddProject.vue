<template>
  <div id="addproject" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add Project</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="name">Please choose a new name and description</label>
            <input v-model="form.projectname" type="text" class="form-control" id="name" placeholder="Enter new project name">
          </div>
          <a class="open-close-description" v-on:click="opendescrption">Description</a>
          <div v-bind:class="{ inactive: description_style }" class="form-group" style="margin-top: 10px;">
            <textarea v-model="form.description" type="text" rows="5" class="form-control" id="description" placeholder="This is optional"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button v-on:click="submitform" type="button" class="btn btn-primary">Submit</button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {mapMutations, mapState} from 'vuex'
export default {
  data () {
    return {
      description_style: true,
      form: {
        projectname: '',
        description: ''
      }
    }
  },
  methods: {
    opendescrption () {
      if (this.description_style === false) {
        console.log('hello')
        this.description_style = true
      } else {
        console.log('hey')
        this.description_style = false
        console.log(this.description_style)
      }
    },
    submitform () {
      if (this.form.projectname === '') {
        swal({
          title: 'Found Empty',
          text: 'Project name cannot be empty',
          icon: 'warning',
          button: 'Revise'
        })
      } else {
        let form = {
          token: localStorage.getItem('taatkn')
        }
        Object.keys(this.form).forEach((key, index) => {
          form[key] = this.form[key]
        })
        axios.post('http://localhost:3000/createproject', form).then(response => {
          this.changeproject(response.data.project)
          $('#addproject').modal('hide')
        }).catch(err => {
          console.log(err)
        })
      }
    },
    ...mapMutations([
      'changeproject'
    ])
  },
  computed: {
    ...mapState([
      'projects'
    ])
  }
}
</script>

<style>
.modal-body{
  text-align: left;
}
label{
  font-size: .9em;
}
.description-open:hover{
  text-decoration: none;
}
.inactive{
  display: none;
}
.open-close-description{
  color: #007bff !important;
}
.open-close-description:hover{
  cursor: pointer;
}
</style>
