<template>
  <div>
    <NavBar/>
    <div style="padding-top:50px">
      <div class="home">
        <div v-for="post in posts" v-bind:key="post._id">
          <Post :id="post._id"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';  

import Post from '../components/Post'
import NavBar from '../components/NavBar'

export default {
  name: 'Home',
  components: {
    'Post' : Post,
    'NavBar' : NavBar
  },
  data(){
    return {
      posts : []
    }
  },
  methods: {
    test(isVisible){
      console.log('bottom')
    },
    async fetch(){
      console.log('fetch')
      try{
        let posts = await axios.get(`http://localhost:3000/posts/`);
        console.log(posts)
        this.posts = posts.data
        this.posts = this.posts.sort(() => Math.random() - 0.5)
      } catch (err) {
        console.log(err)
      }
    },
    async logg(){
      this.$store.commit('setEmail', '')
      this.$store.commit('setUser', '')
      const data = await firebase.auth().signOut()
      console.log(data)
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
            this.fetch()
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
    }
  },
  mounted() {
    this.check()
  }
}
</script>
