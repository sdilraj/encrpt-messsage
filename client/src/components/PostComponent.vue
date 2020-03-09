<template>
<div>

 
<b-button v-on:click="openAddPost()">Add Note</b-button>
<b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="message"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
                :state="encryptionState"
                label="Encryption Type"
               label-for="name-input"
                invalid-feedback="Encryption Type is required"
             >
                <b-form-select v-model="selected" :options="options"></b-form-select>
              </b-form-group>
      </form>
    </b-modal>
  <div class ="container">

  


    <h1> Latest Posts</h1>
    <!-- Create Post HERE -->

    <hr>
    <p class = "error" v-if="error">{{error}} </p>
    <div class = "posts-container">
      <div class="posts"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
      >
     
      <p>Message: {{post.message}}</p>
      <p>Encrypted Message: {{post.encyrptedMessage}}</p>
      <p>Encyrption Type: {{post.encryptiontype}}</p>

      <button v-on:click="deletePost(post._id)">Delete</button>
      <button v-b-modal.modal-prevent-closing  v-on:click="openUpdatePost(post)">Update</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import PostService from '../PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts:[],
      error: '',
      name: '',
      nameState: null,
      submittedNames: [],
      mode: '',
      messageState: null,
      encryptionState: null,
      message: '',
      id: null,
      text: '',
      payload : {},
       selected: null,
        options: [
          { value: "pigLatin", text: 'Pig latin'},
          { value: "emoGize", text: 'Emo-gize ' },
          { value: "letterScramble", text: 'Letter-scramble ' },
          { value: null, text: 'Nothing'}
        ]
    }
     
  },
  created: function() {
    PostService.getPosts().then((response) => {
      console.log(response.data)
      this.posts = response.data;
    }).catch(error => {
      console.error(error);
    })
  },
  methods: {
    deletePost: function(id) {
      PostService.deletePost(id).then(() => {
        this.posts = this.posts.filter((post) => {
          return post._id != id;
        });
      }).catch(error => {
        console.log(error);
      })

    },
    updatePost: function(id) {
      const payload = {
        message: this.message,
        encryptiontype: this.encryptiontype
      };

      PostService.updatePost(id, payload).then(() => {
        return PostService.getPosts()
      }).then(response => {
        console.log(response);
        self.posts = response.data;

        // Hide the modal manually
        self.$nextTick(() => {
          self.$bvModal.hide('modal-prevent-closing')
        })
      });


    },

    
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid

        var self = this;
        if (!this.checkFormValidity()) {
          return
        }

        if (this.mode === "EDIT") {
          this.updateSubmit();
        }
        else {
        PostService.insertPost({
          message: self.message, encryptiontype: self.selected
        }).then(() => {
          return PostService.getPosts()
        }).then(response => {
          console.log(response);
          self.posts = response.data;
          // Hide the modal manually
          self.$nextTick(() => {
            self.$bvModal.hide('modal-prevent-closing')
          })
        });
        }

      },
      openAddPost() {
        this.id = null;
        this.message = "";
        this.selected = null;

        this.mode = "ADD";
        this.$bvModal.show('modal-prevent-closing')
      },
      openUpdatePost(post) {
        this.id = post._id;
        this.message = post.message;
        this.selected = post.encryptiontype;

        this.mode = "EDIT";
        this.$bvModal.show('modal-prevent-closing')
      },
      updateOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.updateSubmit()
      },
      updateSubmit() {
        // Exit when the form isn't valid
        var self = this;

        if (!this.checkFormValidity()) {
          return
        }

        PostService.updatePost(self.id, {
          message: self.message, encryptiontype: self.selected
        }).then(() => {
          return PostService.getPosts()
        }).then(response => {
          console.log(response);
          self.posts = response.data;

          // Hide the modal manually
          self.$nextTick(() => {
            self.$bvModal.hide('modal-prevent-closing')
          })
        });
      }

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div.container{
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  front-size: 13px;
}

p.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
