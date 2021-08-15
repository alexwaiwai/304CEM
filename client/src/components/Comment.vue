<template>
  <div style="width: 100%;" v-bind:class="{ none: del }">
    <div class="caption" style="width: 100%;">
      <div class="tmp">
        <h2 class="user">
          <router-link :to="{ name: 'User', params: { username: user.username }}" class="link">
            {{ user.username }}
          </router-link>
        </h2> <span class="comment" style="width: 420px; display:inline-flex; padding-bottom: 10px;">{{ comment }}</span>
          <span v-if="true" @click="changeEdit">
            <svg aria-label="More options" style="" fill="#262626" height="16" role="img" viewBox="0 0 48 48" width="16">
              <circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle>
              <circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle>
              <circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle>
            </svg>
          </span>
      </div>
    </div>
    <div v-if='edit'>
      <section style="padding-top:10px;">
        <form @submit.prevent="editComment" style="display: inline-flex">
          <textarea aria-label="Edit your comment…" placeholder="Edit your comment…" autocomplete="off" autocorrect="off" v-model="newEditComment" style="margin-right:15px"></textarea>
          <div style="display:inline-grid">
            <img src="../../public/delete.jpg" @click="deleteComment" style="width: 15px; height:15px; cursor: pointer; margin-bottom: 20px; margin-left: 5px;">
            <button type="submit" :disabled="!newEditComment" v-bind:class="{'but' : newEditComment, 'disable' : !newEditComment}" 
              style="top : -13px;">Post</button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';  

export default {
  name : "Comment",
  props: ['id'],
  data() {
    return {
      src : 'https://picsum.photos/id/',
      comment : '',
      user : '',
      creator : false,
      currentUser : '',
      newEditComment : '',
      edit : false,
      post : '',
      del : false
    }
  },
  methods : {
    async fetch(){
      let data = await axios.get(`http://localhost:3000/comment/${this.id}`);
      this.user = data.data.user
      this.comment = data.data.comment
      this.post = data.data.post
    },
    changeEdit (){
      this.edit = !this.edit;
    },
    async editComment(){
      this.comment = this.newEditComment;
      await axios.patch(`http://localhost:3000/comment/${this.id}`, {
        editComment : this.comment
      })
      this.newEditComment = ''
    },
    async deleteComment(){
      if (confirm("You Sure to Delete this Comment?")) {
        await axios.delete(`http://localhost:3000/comment/${this.id}`)
        this.del = true;
      }
    }
  },
  mounted() {
    this.fetch()
  }
}
</script>

<style scoped>
.header {
  border-left: 1px solid rgba(var(--ce3,239,239,239),1);
  padding-left: 15px;
}

.link {
  text-decoration: none;
  font-weight: 600;
}

.link:visited{
  border: 0;
  display: inline;
  padding: 0;
  position: relative;
  background-color: transparent;
  user-select: auto;
  text-decoration: none;
  color: #000;
}

.link:hover{
  text-decoration: underline;
}

.caption {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  border-top: 1px solid rgba(var(--ce3,239,239,239),1);
  border-bottom: 1px solid rgba(var(--ce3,239,239,239),1);
}

.user{
  align-items: center;
  display: inline-flex;
}

h2{
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: 600;
  padding-left: 10px;
  padding-right: 2px;
}

.tmp{
  display: inline-block;
  flex-shrink: 1;
  min-width: 0;
  text-align: left;
}

.comment{
  max-width: 600px;
  max-height: 80px;
}

textarea{
  background: 0 0;
  border: 0;
  color: rgba(var(--i1d,38,38,38),1);
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: inherit;
  max-height: 80px;
  outline: 0;
  padding: 0;
  resize: none;
  width: 400px;
  padding-left: 15px;
  height: 45px !important;
}
button{
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: 0 0;
  border: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  text-transform: inherit;
  text-overflow: ellipsis;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: auto;
  border: 0;
  color: #0095f6;
  color: rgba(var(--d69,0,149,246),1);
  display: inline;
  padding: 0;
  position: relative;
}

.disable {
  opacity: .3;
  pointer-events: none;
}

.none {
  display : none;
}
</style>