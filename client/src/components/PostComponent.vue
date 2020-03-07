<template>
<div>

 
<b-button v-b-modal.modal-1>Add Note</b-button>
<b-modal id="modal-1" @show="resetModal"
      @hidden="resetModal" @ok="handleOk" title="Add Your Note">
    <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="messageState"
          label="Message"
          label-for="name-input"
          invalid-feedback="Message is required"
        >
          <b-form-input
 
            v-model="message"
            :state="messageState"

            required
          ></b-form-input>
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
     
      <p>{{post.message}}</p>
      <p>{{post.encryptionMessage}}</p>
      <button v-on:click="deletePost(post._id)">Delete</button>
      <button v-on:click="update(post._id)">Update</button>

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
      messageState: null,
      message: '',
      text: ''
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
      PostService.updatePost(id).then(() => {
        
      })
    },

    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.messageState = valid
        return valid
      },
      resetModal() {
        this.message = ''
        this.messageState = null
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

        PostService.insertPost({
          message: self.message
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
