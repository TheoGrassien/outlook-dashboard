import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import MailDetailPage from '../pages/MailDetailPage.vue';
import MailNewPage from '../pages/MailNewPage.vue';
import { useUserStore } from '../lib/userStore.js';

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  {
    path: '/mail/:id',
    component: MailDetailPage,
    name: 'MailDetail',
    meta: { requiresAuth: true },
  },
  {
    path: '/mail/new',
    component: MailNewPage,
    name: 'MailNew',
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // Vérifier si la route nécessite une authentification
  if (to.meta.requiresAuth && !userStore.user) {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas connecté
    next('/');
  } else {
    next();
  }
});

export default router;
