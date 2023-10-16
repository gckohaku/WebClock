import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/404.vue'
import Index from '../views/IndexView.vue'
import Clock from '../views/ClockView.vue'
import Edit from '../views/EditView.vue'
import Develop from '../views/DevelopView.vue'
import AnalogChoice from '../views/AnalogClock.vue'
import DigitalChoice from '../views/DigitalClock.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'index',
			component: Index
		},
		{
			path: '/index',
			redirect: '/'
		},
		{
			path: '/edit',
			name: 'edit',
			component: Edit
		},
		{
			path: '/dev',
			name: 'dev',
			component: Develop
		},
		{
			path: '/dev/clock',
			name: 'developingClock',
			component: Clock
		},
		{
			path: '/dev/clock/analog',
			name: 'analogClock',
			component: AnalogChoice
		},
		{
			path: '/dev/clock/analog/:type',
			name: 'analogClockTest',
			component: Clock
		},
		{
			path: '/dev/clock/digital',
			name: 'digitalClock',
			component: DigitalChoice
		},
		{
			path: '/dev/clock/digital/:type',
			name: 'digitalClockTest',
			component: Clock
		},
		{
			path: '/:pathMatch(.*)',
			name: 'notFound',
			component: NotFound
		}
	]
})

export default router
