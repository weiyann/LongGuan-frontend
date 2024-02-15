import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GuestListView from '../views/GuestListView.vue';
import GuestEdit from '../views/guest-edit/[gid].vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/guestlist',
      name: 'guestlist',
      component: GuestListView
    },
    {
      path: '/guestlist/add',
      name: 'guestlist-add',
      component: () => import('../views/GuestAddView.vue')
    },
    {
      path: '/guest-edit/:gid',
      name: 'guest-edit',
      component: GuestEdit
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
});

export default router;
