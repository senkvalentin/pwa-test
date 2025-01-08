import { createRouter, createWebHistory } from 'vue-router';

import LoginView from '../views/LoginView.vue';
import ChecklistsView from '../views/ChecklistsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/locations/:locationId/checklists',
      name: 'checklists',
      component: () => import('../views/ChecklistsView.vue'),
      props: true, // Pass the locationId as a prop to the component
    },
  ],
});

export default router;
