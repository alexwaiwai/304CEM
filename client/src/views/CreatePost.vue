<template>
  <div>
    <NavBar/>
    <div class="border">
      Post Creation
      <div style="display: inline">
        <img src="../../public/return.png" @click="goBack" style="width: 20px; height:20px; padding-left: 550px;">
      </div>

      <div style="display: flex; padding-bottom:5px;">
        <img :src="src + random + '/500/500'" style="padding-left: 12px;" @click="test">
        <img src="../../public/refresh.png" @click="refresh" style="width: 10px; height:10px; padding-bottom: 490px; padding-left: 2px;">
      </div>
      
      <section style="padding-top:10px;" class="section-location">
        <div class="input" style="display: inline;width:550px;height:40px;">
          <div class="box">
            <label>
              <input class="test" v-bind:class="{'not-empty-location' : location}" type="text" v-model="location" placeholder="Location" ref="location">
            </label>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:10px;">
        <form @submit.prevent="create">
          <div class="input" style="display: inline">
            <div class="box">
              <label>
                <span v-bind:class="{'in' : caption}" >Caption</span>
                <input class="test" v-bind:class="{'not-empty' : caption}" type="mail" v-model="caption">
              </label>
            </div>
          </div>
          <button type="submit" :disabled="!caption" v-bind:class="{'but' : caption, 'disable' : !caption}" style="top : -1px;">Post</button>
        </form>
      </section>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';  

import NavBar from '../components/NavBar'
export default {
  name: 'CreatePost',
  data() {
    return {
      random : '',
      src : 'https://picsum.photos/id/',
      caption : '',
      location : ''
    }
  },
  components: {
    'NavBar' : NavBar
  },
  methods : {
    test(){
      console.log(this.location);
    },
    goBack (){
      this.$router.go(-1)
    },
    async create(){
      console.log('create')
      const data = await axios.post(`http://localhost:3000/posts`,{
        email: this.$store.state.email,
        imgID : this.random,
        caption : this.caption,
        location : this.location
      })
      console.log(data)
      console.log(this.$store.state.user._id)
      this.$router.push({ name: 'User', params: { username: this.$store.state.user.username }})
    },
    async refresh(){
      this.random = Math.floor(Math.random() * 999);
      console.log(this.$store.state.user._id)
    }
  },
  mounted() {
    this.refresh();
    const autocomplete = new google.maps.places.Autocomplete(
      this.$refs["location"],
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(22.3193, 114.1694)
        ),
      });
    autocomplete.addListener("place_changed", () => {
      this.location = this.$refs["location"].value;
      console.log(this.location)
    })
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
  padding-top: 5px;
  max-width: 600px;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  max-height: 1200px;
}

.input {
  width: 460px;
  display: inline-block !important;
  margin-right: 10px;
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

.not-empty-location {
  font-size: 12px !important;
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

.section-location {
  border-top: 1px solid #efefef;
  border-top: 1px solid rgba(var(--ce3,239,239,239),1);
  color: #8e8e8e;
  color: rgba(var(--f52,142,142,142),1);
  flex-shrink: 0;
  font-size: 14px;
  line-height: 30px;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  color: #8e8e8e;
  color: rgba(var(--f52,142,142,142),1);
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
}

.section {
  margin-top: 8px;
  padding-left: 16px;
  padding-right: 16px;
  order: 6;
  border-top: 1px solid #efefef;
  border-top: 1px solid rgba(var(--ce3,239,239,239),1);
  color: #8e8e8e;
  color: rgba(var(--f52,142,142,142),1);
  flex-shrink: 0;
  font-size: 14px;
  line-height: 18px;
  min-height: 56px;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  max-width: 570px;
  border-top: 1px solid rgba(var(--ce3,239,239,239),1);
  color: #8e8e8e;
  color: rgba(var(--f52,142,142,142),1);
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  font-size: 14px;
  line-height: 18px;
  min-height: 56px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

textarea {
  background: 0 0;
  border: 0;
  color: #262626;
  color: rgba(var(--i1d,38,38,38),1);
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  font-size: inherit;
  max-height: 80px;
  outline: 0;
  padding: 0;
  resize: none;
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
  appearance: auto;
  background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
  -webkit-rtl-ordering: logical;
  flex-direction: column;
  resize: auto;
  cursor: text;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  column-count: initial !important;
  margin: 0em;
  font: 400 13.3333px Arial;
  width: 450px !important;
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

.but {
  top : -5px !important;
}

a:link {
  color: black;
}
</style>