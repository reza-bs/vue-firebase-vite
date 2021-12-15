<template>
  <div>
    <div id="signin">
      <h1>Sign In</h1>
      <form @submit.prevent="signIn">
        <div>
          <label>Email </label>
          <input type="email" name="" id="" v-model="email">
        </div>

        <div>
          <label>Password </label>
          <input type="password" name="" id="" v-model="password">
        </div>

        <div>
          <button type= 'submit'>Sign In</button>
        </div>
        
      </form>
    </div>
    
  </div>
</template>


<script lang="ts">
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { defineComponent } from 'vue';
import firebaseConfig from '../firebase/firebase.config';
import state from '../state';


export default defineComponent({
  name: "SignIn",

  data(){
    return {
      email: "",
      password: ""
    }
  },

  methods:{
    signIn(){
      initializeApp(firebaseConfig)

      const auth = getAuth()

      signInWithEmailAndPassword(auth, this.email, this.password)
      .then((cred:any)=>{
        alert("succesfully signed in")
        console.log("user:", cred.user)
        state.store.isSignedin = true
        console.log("signed in:", state.store.isSignedin)
      })
      .catch((err:any)=>{
        alert(err.message)
      })
    }
  }
})

</script>

<style scoped>
#signin{
  width: 80%;
  margin: 30px;
  padding: 30px;
  border: 1px solid green;
}
</style>