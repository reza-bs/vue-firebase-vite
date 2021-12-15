
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { reactive } from 'vue';
import firebaseConfig from './firebase.config';

class FireBaseService{

  getBooks(){
    const books = reactive([]);
    initializeApp(firebaseConfig);

    const db = getFirestore();
    const colRef = collection(db, "books");
    const q = query(colRef, orderBy("createdAt"));

    // const bookList: any[] = [];

    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
    });

    return {books}
  }
}

const firebaseService = new FireBaseService();

export default firebaseService;