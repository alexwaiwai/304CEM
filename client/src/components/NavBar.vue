<template>
  <div>
    <div style="display:inline-flex;width:680px">
      <router-link to="/" style="margin-right:90px">
        <div>
          <img src="../assets/main.png">
        </div>
      </router-link>
      <div style="margin-right:50px">
        <input v-on:keyup.enter="search" v-model="inputUser">
      </div>
      <router-link :to="{ name: 'User', params: { username: 'test1' }}" style="margin-left:50px">
        <img src="../../public/self.png" style="height:25px ;width:25px ;padding-top:10px">
      </router-link>
      <router-link :to="{ name: 'CreatePost'}" style="margin-left:80px">
        <img src="../../public/new.png" style="height:25px ;width:25px ;padding-top:10px">
      </router-link>
      <div style="margin-left:80px;padding-top:10px;cursor: pointer;" v-on:click="logout" >
        <img src="../../public/logout.png" style="height:25px ;width:25px">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';  

export default {
  name: 'NavBar',
  data() {
    return {
      username: '',
      inputUser: ''
    }
  },
  methods: {
    async search(){
      const data = await axios.get(`http://localhost:3000/user/${this.inputUser}/id`)
      if(!data.data)
        alert('No user found')
      else
        this.$router.push({ name: 'User', params: { username: this.inputUser }})
    },
    async logout(){
      await firebase.auth().signOut()
      console.log(firebase.auth().currentUser)
      this.$store.commit('setUser', '')
      this.$store.commit('setEmail', '')
      this.$router.push({ name: 'Login'})
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
  text-align: center;
  padding-top: 10px;
  padding-bottom: 5px;
}

</style>