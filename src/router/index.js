import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ConversationsIndexPage from '../pages/ConversationsIndexPage.vue';
import ConversationShowPage from '../pages/ConversationShowPage.vue';
import MailDetailPage from '../pages/MailDetailPage.vue';
import { useUserStore } from '../lib/userStore.js';

const routes = [
  { path: '/', component: HomePage },
  { path: '/conversations', component: ConversationsIndexPage },
  { path: '/conversations/:id', component: ConversationShowPage },
  { path: '/mail/:id', component: MailDetailPage, name: 'MailDetail' },
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
