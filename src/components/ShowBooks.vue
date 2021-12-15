<template>
  <div>
    <h1>Books</h1>
    <div v-if="books?.length">
      <ul v-for="book in books" :key = "book.id">
        <!-- <li> <router-link to="/book/">{{ book.title }}</router-link> </li> -->
        <router-link :to="`/book/${book.id}`">{{ book.title }}</router-link>
      </ul>
    </div>

    <div v-else>
      <h1>There are no books available</h1>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import firebaseService from '../firebase/firebaseService';

export default defineComponent({
  name: 'ShowBooks',
  setup(){
    const { books } = firebaseService.getBooks()
    return { books }
  },
})
</script>
