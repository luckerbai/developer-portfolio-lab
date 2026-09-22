import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/views/HomeView.vue'),
    meta: { title: 'Developer Portfolio Lab - Frontend Developer' },
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/features/resume/views/ResumeView.vue'),
    meta: { title: 'Resume - Developer Portfolio Lab' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/features/projects/views/ProjectListView.vue'),
    meta: { title: 'Projects - Developer Portfolio Lab' },
  },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('@/features/projects/views/ProjectDetailView.vue'),
    meta: { title: 'Project Detail - Developer Portfolio Lab' },
  },
  {
    path: '/lab',
    name: 'lab',
    component: () => import('@/features/lab/views/LabHomeView.vue'),
    meta: { title: 'Frontend Lab - Developer Portfolio Lab' },
  },
  {
    path: '/lab/components',
    name: 'lab-components',
    component: () => import('@/features/lab/views/ComponentSystemView.vue'),
    meta: { title: 'Component System - Frontend Lab' },
  },
  {
    path: '/lab/data-table',
    name: 'lab-data-table',
    component: () => import('@/features/lab/views/DataTableView.vue'),
    meta: { title: 'Data Table - Frontend Lab' },
  },
  {
    path: '/lab/command-palette',
    name: 'lab-command-palette',
    component: () => import('@/features/lab/views/CommandPaletteView.vue'),
    meta: { title: 'Command Palette - Frontend Lab' },
  },
  {
    path: '/lab/virtual-list',
    name: 'lab-virtual-list',
    component: () => import('@/features/lab/views/VirtualListView.vue'),
    meta: { title: 'Virtual List - Frontend Lab' },
  },
  {
    path: '/lab/drag-board',
    name: 'lab-drag-board',
    component: () => import('@/features/lab/views/DragBoardView.vue'),
    meta: { title: 'Drag & Drop Board - Frontend Lab' },
  },
  {
    path: '/lab/dashboard',
    name: 'lab-dashboard',
    component: () => import('@/features/lab/views/DashboardView.vue'),
    meta: { title: 'Dashboard - Frontend Lab' },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/features/about/views/AboutView.vue'),
    meta: { title: 'About - Developer Portfolio Lab' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/components/shared/NotFoundView.vue'),
    meta: { title: '404 - Not Found' },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 全局路由守卫：自动设置页面标题
router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'Developer Portfolio Lab'
})
