import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

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
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/features/admin/views/AdminLoginView.vue'),
    meta: { title: 'Admin Login' },
  },
  {
    path: '/admin',
    component: () => import('@/features/admin/components/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('@/features/admin/views/AdminDashboardView.vue'),
        meta: { title: 'Admin Dashboard' },
      },
      {
        path: 'projects',
        name: 'admin-projects',
        component: () => import('@/features/admin/views/AdminProjectsView.vue'),
        meta: { title: 'Manage Projects' },
      },
      {
        path: 'projects/new',
        name: 'admin-project-new',
        component: () => import('@/features/admin/views/AdminProjectEditView.vue'),
        meta: { title: 'New Project' },
      },
      {
        path: 'projects/:id/edit',
        name: 'admin-project-edit',
        component: () => import('@/features/admin/views/AdminProjectEditView.vue'),
        meta: { title: 'Edit Project' },
      },
      {
        path: 'resume',
        name: 'admin-resume',
        component: () => import('@/features/admin/views/AdminResumeView.vue'),
        meta: { title: 'Manage Resume' },
      },
      {
        path: 'articles',
        name: 'admin-articles',
        component: () => import('@/features/admin/views/AdminArticlesView.vue'),
        meta: { title: 'Manage Articles' },
      },
      {
        path: 'articles/new',
        name: 'admin-article-new',
        component: () => import('@/features/admin/views/AdminArticleEditView.vue'),
        meta: { title: 'New Article' },
      },
      {
        path: 'articles/:id/edit',
        name: 'admin-article-edit',
        component: () => import('@/features/admin/views/AdminArticleEditView.vue'),
        meta: { title: 'Edit Article' },
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('@/features/admin/views/AdminSettingsView.vue'),
        meta: { title: 'Site Settings' },
      },
    ],
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

// 全局路由守卫：认证检查 + 页面标题
router.beforeEach(async (to) => {
  const { isLoggedIn, loading } = useAuth()

  // 等待 auth 初始化完成
  if (loading.value) {
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: 'admin-login' }
  }

  if (to.name === 'admin-login' && isLoggedIn.value) {
    return { name: 'admin-dashboard' }
  }
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'Developer Portfolio Lab'
})
