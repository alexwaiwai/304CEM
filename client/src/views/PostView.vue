<template>
  <div>
    <NavBar/>
    <div class="border">
      <div class="main">
        <article>
          <div style="display: inline-flex; padding-bottom: 8px; border-bottom: 1px solid rgba(var(--ce3,239,239,239),1);">
            <header class="header">
              <router-link :to="{ name: 'User', params: { username: user.username }}" class="link">
                {{user.username}}
              </router-link>
            </header>
            <div style="margin-left:390px; display: inline-flex">
              <div style="width: 0px;" v-if="creator">
                <router-link :to="{ name: 'PostEdit', params: { id: id }}" class="link">
                  Edit
                </router-link>
              </div>
              <img src="../../public/return.png" @click="goBack" style="width: 20px; height:20px;cursor: pointer" v-bind:style=" creator ? 'margin-left: 35px;' : '' ">
            </div>
          </div>
          <section style="font-size: 10px;
            text-align: left;
            padding-left: 8px;
            font-family: monospace;
            padding-top: 5px;
            font-weight: 600;
            padding-bottom: 2px;
            border-bottom: 1px solid rgba(var(--ce3,239,239,239),1)"
            v-if="location" @click="setShowMap">📍 {{location}}
          </section>
          <div id="map-canvas" ref="map-canvas" v-bind:class="{'showMap' : showMap , 'hideMap' : !showMap}"></div>
          <img :src="src + imgID + '/500/500'" style="padding-top:2px;padding-bottom:10px">
          <div style="display:block;">
            <div style="text-align:left; width:20px; height:20px;padding-left:10px;padding-bottom:10px" v-if="liked" @click="like">❤️</div>
            <div style="text-align:left; width:20px; height:20px;padding-left:10px;padding-bottom:10px" v-else @click="like">🤍</div>
            <div style="display:block; padding-top:5px; padding-bottom:5px" v-if="likes.length">
              <div style="text-align:left; width:50px;padding-left:5px">{{likes.length}} likes</div>
            </div>
          </div>
          <div class="caption" style="width: 100%; height:70px">
            <div class="tmp">
              <h2 class="user">
                <router-link :to="{ name: 'User', params: { username: user.username }}" class="link">
                  {{user.username}}
                </router-link>
              </h2> <span class="comment">{{ caption }}</span>
            </div>
          </div>
          <div v-for="comment in comments" v-bind:key="comment._id">
            <Comment :id="comment._id"/>
          </div>
          
          <section style="padding-top:10px;">
            <form @submit.prevent="createComment" style="display: inline-flex">
              <textarea aria-label="Add a comment…" placeholder="Add a comment…" autocomplete="off" autocorrect="off" v-model="newComment"></textarea>
              <button type="submit" :disabled="!newComment" v-bind:class="{'but' : newComment, 'disable' : !newComment}" 
                style="top : -1px;">Post</button>
            </form>
          </section>

        </article>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';  
import Comment from '../components/Comment'
import NavBar from '../components/NavBar'

export default {
  name : "PostView",
  data() {
    return {
      id : '',
      src : 'https://picsum.photos/id/',
      caption : '',
      imgID : -1,
      likes : [],
      user : '',
      creator : false,
      liked : false,
      comments : [],
      newComment : '',
      currentUser : '',
      newEditComment : '',
      edit : false,
      location : '',
      showMap : true,
      map : ''
    }
  },
  components: {
    'Comment' : Comment,
    'NavBar' : NavBar
  },
  methods : {
    setShowMap(){
      this.showMap = !this.showMap;
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
    goBack(){
      this.$router.go(-1)
    },
    async fetch(){
      console.log(this.$store.state)
      let data = await axios.get(`http://localhost:3000/posts/${this.$route.params.id}`);
      console.log(data)
      this.id = this.$route.params.id;
      this.caption = data.data.caption;
      this.imgID = data.data.imgID
      this.likes = data.data.likes
      this.user = data.data.user
      this.location = data.data.location
      if(this.location){
        var latlng = new google.maps.LatLng(0, 0);
        var mapOptions = {
          zoom: 15,
          center: latlng
        };
        var map = new google.maps.Map(this.$refs['map-canvas'], mapOptions);

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': this.location}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            // Center map on location
            map.setCenter(results[0].geometry.location);
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      }
      this.showMap = false;
      this.creator = this.user.username === this.$store.state.user.username
      this.liked = this.likes.includes(this.user.username)
      this.currentUser = this.$store.state.user.username;
    },
    async createComment(){
      await axios.post(`http://localhost:3000/comment/`, {
        userID : this.$store.state.user._id,
        postID : this.$route.params.id,
        comment : this.newComment
      });
      this.newComment = '';
      this.getComment()
    },
    changeEdit (){
      this.edit = !this.edit;
    },
    async editComment(){
      console.log('editComment')
    },
    async getComment(){
      const newComments = await axios.get(`http://localhost:3000/posts/${this.$route.params.id}/comments`)
      this.comments = newComments.data
    },
    async check(){
      try {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user)
          if (!user){
            this.$router.push({name : "Login"})
          }else{
            if(!this.$store.state.email || !this.$store.state.user){
              this.$store.commit('setEmail', user.email)
              this.getUser()
            }
            this.fetch();
            this.getComment();
          }
        });
      } catch (error) {
        this.errorMessage = error.message
      }
    },
    async getUser(){
      const currentUser = await axios.get(`http://localhost:3000/user/email/${this.$store.state.email}`);
      console.log(currentUser)
      this.$store.commit('setUser', currentUser.data)
      this.username = this.$store.state.user.username
    }
  },
  mounted() {
    this.check()
    console.log(this.$store.state)
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
  padding: 0;
  -webkit-box-align: stretch;
  align-items: stretch;
  border: 0 solid #000;
  box-sizing: border-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  flex-shrink: 0;
  margin: 0;
  position: relative;
}

.display{
  display: block;
  width: 100%;
}

.before-photo {
  display: block;
  overflow: hidden;
}

.comments {
  border-left: 1px solid rgba(var(--ce3,239,239,239),1);
  top: 72px;
  padding: 0;
}

.border {
  align-items: center;
  background-color: rgba(var(--d87,255,255,255),1);
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  border-radius: 5px;
  margin: 0 0 10px;
  padding: 10px 0;
  max-width: 500px;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  max-height: 1200px;
}

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

#map-canvas {
  height: 150px;
  weight: 100%;
}

.showMap{
  display:grid;
}

.hideMap{
  display:none;
}
a:link {
  color: black;
}
</style>