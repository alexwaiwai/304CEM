<template>
  <div>
    <NavBar/>
    <div>
      <div class="home">
          <div class="gallery">
            <div class="gallery-panel"
                v-for="post in posts"
                :key="post._id">
              <router-link :to="{ name: 'PostView', params: { id: post._id }}">
                <img :src="'https://picsum.photos/id/' + post.imgID + '/600/600'">
              </router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';  

import NavBar from '../components/NavBar'
import Post from '../components/Post'

export default {
  name : "User",
  data() {
    return {
      posts : [],
    }
  },
  components: {
    'NavBar' : NavBar,
    'Post' : Post,
  },
  methods : {
    async fetch(){
      let data = await axios.get(`http://localhost:3000/user/${this.$route.params.username}/posts`);
      if(data.data.length > 0) {
        this.posts = (data.data).reverse()
      }
    }
  },
  mounted() {
    this.fetch();
  }
}
</script>

<style scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  grid-gap: 1rem;
  max-width: 80rem;
  margin: 5rem auto;
  padding: 0 5rem;
}
.gallery-panel img {
  width: 18vw;
  height: 18vw;
  object-fit: cover;
  border-radius: 0.75rem;
}
</style>