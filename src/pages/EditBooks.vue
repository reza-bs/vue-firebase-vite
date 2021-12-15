<template>
  <div>
    <h1>Edit Books</h1>
    <div>
    <form @submit.prevent="editBooks">
      <label for="">Title</label>
      <input type="text" placeholder="Title" name="title" v-model="title">

      <label for="">Author</label>
      <input type="text" placeholder="Author" name="author" v-model="author">

      <button type="submit">Edit Book</button>
    </form>

    <button @click="deleteBook">Delete Book</button>
  </div>
  </div>
</template>

<script lang="ts">
import { initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { defineComponent } from 'vue';
import firebaseConfig from '../firebase/firebase.config';

export default defineComponent({
  name: "EditBooks",

  data(){
    return {
      title:"",
      author: ""
    }
  },
  mounted(){
    initializeApp(firebaseConfig);

    const db = getFirestore();
    const colRef = collection(db, "books");
    const docRef = doc(db, "books", this.$route.params.id);
    getDoc(docRef)
    .then((doc:any)=> {
      this.title = doc.data().title
      this.author = doc.data().author
      console.log(doc.data().title, doc.data().author)
    })
    // console.log(docRef)
  },

  methods:{
    editBooks(){

      initializeApp(firebaseConfig);

      const db = getFirestore();
      const colRef = collection(db, "books");
      const docRef = doc(db, "books", this.$route.params.id);

      updateDoc(docRef, {
        title: this.title,
        author: this.author
      })
      .then(()=>{
        alert("successfully updated")
      })
      .catch((err :any)=>{
        alert(err.message)
      })
    },

    deleteBook(){
      initializeApp(firebaseConfig);

      const db = getFirestore();
      const colRef = collection(db, "books");
      const docRef = doc(db, "books", this.$route.params.id);

      deleteDoc(docRef)
      .then(()=>{
        alert("successfully deleted book")
        this.$router.push('/')
      })
      .catch((err: any)=>{
        alert(err.message)
      })
    }
  },
})
</script>