<template>
  <div>
    <div class="main" style="max-width:600px;">
      <article>
        <header>
          <div class="display">
            <router-link style="width:300px; max-width:300px" :to="{ name: 'User', params: { username: user.username }}" class="link">
              {{ user.username }}
            </router-link>
            <div class="dot" style="padding-left:252px">
              <svg aria-label="More options" style="display: block; position: relative;" fill="#262626" height="16" role="img" viewBox="0 0 48 48" width="16">
                <circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle>
                <circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5"></circle>
                <circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5"></circle>
              </svg>
            </div>
          </div>
        </header>
        <router-link :to="{ name: 'PostView', params: { id: postID }}">
          <img :src="src + imgID + '/600/600'" style="padding-top:10px; padding-bottom:5px; border-bottom: 1px solid rgba(var(--ce3,239,239,239),1);"/>
        </router-link>
        <div style="display:block;">
          <div style="text-align:left; width:20px; height:20px;padding-left:10px" v-if="liked" @click="like">❤️</div>
          <div style="text-align:left; width:20px; height:20px;padding-left:10px" v-else @click="like">🤍</div>
        </div>
        <div style="display:block; border-bottom: 1px solid rgba(var(--ce3,239,239,239),1); padding-top:5px; padding-bottom:5px" v-if="likes.length">
          <div style="text-align:left; width:50px;padding-left:5px">{{likes.length}} likes</div>
        </div>
        <div class="caption" style="width: 100%;">
          <div class="tmp">
            <h2 class="user">
              <router-link :to="{ name: 'User', params: { username: user.username }}" class="link">
                {{user.username}}
              </router-link>
            </h2> <span class="comment">{{ caption }}</span>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';  

export default {
  name : "Post",
  props: ['id'],
  data() {
    return {
      email : '',
      postID : 0,
      src : 'https://picsum.photos/id/',
      caption : '',
      imgID : '',
      likes : [],
      user : '',
      creator : false,
      liked : false
    }
  },
  components: {
  },
  methods : {
    async fetch(){
      console.log(this.id)
      let data = await axios.get(`http://localhost:3000/posts/${this.id}`);
      this.postID = this.id
      this.caption = data.data.caption;
      this.imgID = data.data.imgID
      this.likes = data.data.likes
      this.user = data.data.user
      const currentUser = await axios.get(`http://localhost:3000/user/email/${this.email}`);
      this.creator = this.user.username === currentUser.data.username
      this.liked = this.likes.includes(this.user.username)
    },
    async like(){
      if(!this.liked)
        this.likes.push(this.user.username);
      else
        this.likes = this.likes.filter(like => like != this.user.username)
      this.liked = !this.liked
      console.log(this.likes)

      await axios.patch(`http://localhost:3000/posts/${this.id}/likePost`, {
        likes : this.likes
      });
    },
    async check(){
      try {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user)
          if (!user)
            this.$router.push({name : "Login"})
          else
            this.email = user.email
        });
      } catch (error) {
        this.errorMessage = error.message
      }
    }
  },
  mounted() {
    this.check();
    this.fetch();
  }
}
</script>

<style scoped>

div {
  display: grid;
  place-items: center;
}

.main {
  align-items: center;
  margin: auto;
  max-width: 500px;
  pointer-events: auto;
  width: 100%;
}

article {
  width: 100%;
  border-radius: 3px;
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  margin-bottom: 24px;
  margin-left: -1px;
  margin-right: -1px;
}

header{
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  padding: 16px;
  border-bottom: 1px solid rgba(var(--ce3,239,239,239),1);
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

.display {
  display: inline-flex;
}

.caption {
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
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
  max-width: 400px;
  max-height: 54px;
}
a:link {
  color: black;
}
</style>