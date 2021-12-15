<template>
  <div>

    <div v-if="isSignedIn">
      <div class="nav">
        <router-link to="/" @click.native="clicked">log out</router-link>
      </div>
      
      <div class="home">
        <ShowBooks/>
      </div>
    </div>

    <div v-else>
      <div class="nav">
        <router-link :to="{name: 'SignIn'}">Sign In</router-link> | 
        <router-link :to="{name: 'SignUp'}">Sign Up</router-link>
      </div>

      <div class="home">
        <router-view/>
      </div>
    </div>

    
  </div>
</template>

<script lang="ts">
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { defineComponent, ref } from 'vue';
import ShowBooks from '../components/ShowBooks.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import firebaseConfig from '../firebase/firebase.config';
import state from '../state';

export default defineComponent({
  name: 'Home',
  components: {
    ShowBooks,
    SignIn,
    SignUp
  },

  setup(){
    console.log(state.store.isSignedin)
    const isSignedIn = ref(state.store.isSignedin)

    initializeApp(firebaseConfig)

    const auth = getAuth()

    onAuthStateChanged(auth, (user)=>{
      console.log("user Status changed: ", user)
      if(user){
        state.store.isSignedin= true
      }
      else{
        state.store.isSignedin= false
      }
      isSignedIn.value = state.store.isSignedin
      console.log("state : ", isSignedIn.value)
    })

    const clicked = () =>{
      signOut(auth)
      .then(()=>{
        state.store.isSignedin = false
        isSignedIn.value = state.store.isSignedin
        alert("User signed out")
      }).catch((err)=>{
        alert(err.message)
      })
    }
    return {isSignedIn ,clicked}
  }
})
</script>

<style scoped>
.home{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.nav{
  float:right;
}
</style>