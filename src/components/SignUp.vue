<template>
  <div>

    <div id="signup">
      <h1>Sign Up</h1>
      <form @submit.prevent="signUp">
        <div>
          <label>Email </label>
          <input type="email" name="" id="" v-model="email">
        </div>


        <div>
          <label>Password </label>
          <input type="password" name="" id="" v-model="password">
        </div>

        <div>
          <button type= 'submit'>Sign Up</button>        
        </div>

      </form>
    </div>
    
  </div>
</template>

<script lang="ts">
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { defineComponent } from 'vue'
import firebaseConfig from '../firebase/firebase.config'
import state from '../state'

export default defineComponent({
  name: "SignUp",

  data(){
    return {
      email: "",
      password: ""
    }
  },

  methods:{
    signUp(){
      initializeApp(firebaseConfig)
      const auth = getAuth()
      createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((cred: any)=>{
        alert("succesfully created user")
        console.log("user:", cred.user)
        state.store.isSignedin = true
        console.log("signed in:", state.store.isSignedin)
      })
      .catch((err: any)=>{
        alert(err.message)
      })
    }
  }

})
</script>

<style scoped>
#signup{
  width: 80%;
  margin: 30px;
  padding: 30px;
  border: 1px solid red;
}
</style>