import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import MailDetailPage from '../pages/MailDetailPage.vue';
import MailNewPage from '../pages/MailNewPage.vue';
import { useUserStore } from '../lib/userStore.js';

const routes = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/mail/:id', component: MailDetailPage, name: 'MailDetail' },
  { path: '/mail/new', component: MailNewPage, name: 'MailNew' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.path.startsWith('/conversations') && !userStore.user) {
    next('/');
  } else {
    next();
  }
});

export default router;
