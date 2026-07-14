import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'featured', component: () => import('./views/FeaturedView.vue') },
  { path: '/browse', name: 'browse', component: () => import('./views/SearchView.vue') },
  {
    path: '/tools/:slug',
    name: 'tool-detail',
    component: () => import('./views/ToolDetailView.vue'),
    props: true,
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue') },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
