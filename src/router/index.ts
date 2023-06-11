import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/404.vue'
import AnalogClock from '../views/ClockView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue')
		},
		{
			path: '/clock',
			name: 'clock',
			component: AnalogClock
		},
		{
			path: '/:pathMatch(.*)',
			name: 'notfound',
			component: NotFound
		}
	]
})

export default router
