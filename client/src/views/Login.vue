<template>
  <div>
    <form class="border" @submit.prevent="login">
      <br/>
      <div class="input">
        <div class="box">
          <label class="label">
            <span v-bind:class="{'in' : email}" >Email</span>
            <input class="test" v-bind:class="{'not-empty' : email}" type="mail" v-model="email">
          </label>
        </div>
      </div>

      <div class="input">
        <div class="box">
          <label class="label">
            <span v-bind:class="{'in' : password}" >Password</span>
            <input class="test" v-bind:class="{'not-empty' : password}" type="password" v-model="password">
          </label>
        </div>
      </div>
      
      <div>
        {{ errorMessage }}
      </div>

      <div>
        <button :disabled="!email || password.length < 6" type="submit">
          Login
        </button>
      </div>

    </form>

    <div class="border" style="margin-top: 0px">
      <p>
      Don't have an account?
      <router-link :to="{ name: 'Register'}">
        Sign up
      </router-link>
      </p>
    </div>
  </div>
  
  
</template>

<script>
import axios from 'axios';
import Icon from '../components/Icon.vue'
import firebase from 'firebase/app';
import 'firebase/auth';  

export default {
  name : "Login",
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    }
  },
  components: {
    "Icon" : Icon,
  },
  methods : {
    async login() {
      try{
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password);
          })
      }catch(err){
        console.log(err)
        this.errorMessage = err
      }
    },
    async check(){
      try {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user)
          if (user){
            this.$store.commit('setEmail', user.email)
            console.log(this.$store.state.email)
            this.getUser()
            this.$router.push({name : "Home"})
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
    console.log(this.$store.state.email)
  }
}
</script>

<style scoped>

div {
  display: grid;
  place-items: center;
}

.border {
  align-items: center;
  background-color: rgba(var(--d87,255,255,255),1);
  border: 1px solid rgba(var(--b6a,219,219,219),1);
  border-radius: 5px;
  margin: 0 0 10px;
  padding: 10px 0;
  max-width: 350px;
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.input {
  margin: 0 40px 6px;
}

.box {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-appearance: none;
  background: #fafafa;
  background: rgba(var(--b3f,250,250,250),1);
  border: 1px solid #dbdbdb;
  border: 1px solid rgba(var(--ca6,219,219,219),1);
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #262626;
  color: rgba(var(--i1d,38,38,38),1);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  font-size: 14px;
  position: relative;
  width: 100%;
}

label {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 36px;
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 0;
  -ms-flex: 1 0 0;
  flex: 1 0 0;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
}

span {
  color: #8e8e8e;
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  position: absolute;
  padding-left: 10px;
  transition-duration: 0.1s;
}

.in {
  transform: scale(.83333) translateY(-10px);
}

input {
  -webkit-writing-mode: horizontal-tb !important;
  text-rendering: auto;
  color: -internal-light-dark(black, white);
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  display: inline-block;
  text-align: start;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
  -webkit-rtl-ordering: logical;
  cursor: text;
  font: 400 13.3333px Arial;
}

.type {
  padding-top: 16px;
  font-size: 10px;
}

.not-empty {
  font-size: 12px !important;
  padding: 14px 0 2px 8px !important;
}

.label {
  display: flex;
  height: 36px;
  -webkit-box-flex: 1;
  -webkit-flex: 1 0 0;
  -ms-flex: 1 0 0;
  flex: 1 0 0;
  padding: 0;
  position: relative;
  margin: 0;
  min-width: 0;
}

span{
  color: rgba(var(--f52,142,142,142),1);
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  pointer-events: none;
  position: absolute;
  text-overflow: ellipsis;
  transform-origin: left;
  transition: transform ease-out .1s,-webkit-transform ease-out .1s;
  user-select: none;
  white-space: nowrap;
}

.test{
  background: rgba(var(--b3f,250,250,250),1);
  border: 0;
  -webkit-box-flex: 1;
  flex: 1 0 auto;
  margin: 0;
  outline: 0;
  overflow: hidden;
  padding: 9px 0 7px 8px;
  text-overflow: ellipsis;
  -webkit-appearance: none;
  font-size: 16px;
}

button {
  background-color: rgba(var(--d69,0,149,246),.6);
  opacity: 1;
  border: 1px solid;
  border-radius: 4px;
  color: rgba(var(--eca,255,255,255),1);
  position: relative;
  font-size: 14px;    
  display: block;
  font-weight: 600;
  padding: 5px 9px;
  text-align: center;
  width: 270px;
  cursor: auto;
}

button[disabled], button:disabled{
  background-color: rgba(var(--d69,0,149,246),.3);
  opacity: .3;
}
</style>