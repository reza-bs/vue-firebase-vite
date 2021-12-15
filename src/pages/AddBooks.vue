<template>
  <div>
    <h1>Add Books</h1>
    <div>
    <form @submit.stop.prevent="addBooks">
      <label for="">Title</label>
      <input type="text" placeholder="Title" v-model="title">

      <label for="">Author</label>
      <input type="text" placeholder="Author" v-model="author">

      <button>Add Book</button>
    </form>
  </div>
  </div>
</template>

<script lang="ts">
import { initializeApp } from "firebase/app";
import {
addDoc,
collection,
getFirestore, serverTimestamp
} from "firebase/firestore";
import { defineComponent } from 'vue';
import firebaseConfig from '../firebase/firebase.config';
// import firebaseConfig from './firebase.config';

export default defineComponent({
  name: "AddBooks",

  data(){
    return {
      title:"",
      author: ""
    }
  },

  methods:{
    addBooks(){
      initializeApp(firebaseConfig);

      const db = getFirestore();
      const colRef = collection(db, "books");
      // const q = query(colRef, orderBy("createdAt"));
      
      addDoc(colRef, {
        title: this.title,
        author: this.author,
        createdAt: serverTimestamp(),
      }).then(()=>{
        alert('success')
        this.$router.push('/')
      }).catch((err)=>{
        alert(err.message)
      })
    }
  }
})
</script>