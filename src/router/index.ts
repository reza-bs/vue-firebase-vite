import { createRouter, createWebHistory } from "vue-router";
import ShowBooks from "../components/ShowBooks.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import AddBooks from "../pages/AddBooks.vue";
import EditBooks from "../pages/EditBooks.vue";
import Home from '../pages/Home.vue';



const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/",
        name: "SignIn",
        component: SignIn,
      },

      {
        path: "/",
        name: "SignUp",
        component: SignUp,
      },

      {
        path: "/",
        name: "ShowBooks",
        component: ShowBooks,
      },
    ],
    props: true,
  },

  {
    path: "/addbooks",
    name: "AddBooks",
    component: AddBooks,
  },

  {
    path: "/book/:id",
    name: "EditBooks",
    component: EditBooks,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
