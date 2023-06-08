import { createRouter, createWebHistory } from 'vue-router';

import AllTasks from './pages/AllTasks.vue'
import FavoriteTasks from './pages/FavoriteTasks.vue'
import DayTasks from './pages/DayTasks.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:'/', redirect:'/all-tasks'},
        {path:'/all-tasks', component: AllTasks},
        {path:'/favorite-tasks', component: FavoriteTasks},
        {path:'/my-day-tasks', component: DayTasks}
    ]
})

export default router;