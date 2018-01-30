import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ManageChaptersPage from '../pages/ManageChaptersPage.vue';
import ManageStoriesPage from '../pages/ManageStoriesPage.vue';
import ManageStoryPage from '../pages/ManageStoryPage.vue';
import ManageMyProfilePage from '../pages/ManageMyProfilePage.vue';
import AdminRootPage from '../pages/AdminRootPage.vue';
import AdminDashboardPage from '../pages/AdminDashboardPage.vue';
import AdminUsersPage from '../pages/AdminUsersPage.vue';
import DeveloperTestPage from '../pages/DeveloperTestPage.vue';

Vue.use(Router);

export function createRouter() {
  const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),

    routes: [

      // ------------------------------------------------------------- Home Page
      {
        path: '/',
        name: 'home',
        component: HomePage,
      },

      // -------------------------------------------------- Manage Chapters Page
      {
        path: '/manage/chapters',
        name: 'manage-chapters',
        component: ManageChaptersPage,
      },

      // ---------------------------------------------------- Manage Story Pages
      {
        path: '/manage/stories',
        name: 'manage-stories',
        component: ManageStoriesPage,
      },
      {
        path: '/manage/story/:activeStoryID',
        name: 'manage-story',
        props: true,
        component: ManageStoryPage,
      },
      { path: '/manage/story', redirect: '/manage/stories' },

      // ------------------------------------------------ Manage My Profile Page
      {
        path: '/manage/profile',
        name: 'manage-profile',
        component: ManageMyProfilePage,
      },
      { path: '/manage', redirect: '/manage/profile' },

      // ----------------------------------------------------------- Admin Pages
      {
        path: '/admin',
        component: AdminRootPage,
        children: [
          {
            path: '',
            name: 'admin-dashboard',
            component: AdminDashboardPage,
          },
          {
            path: 'users',
            name: 'admin-users',
            component: AdminUsersPage,
          },
        ],
      },

      // ------------------------------------------------------ Dev Testing Page
      {
        path: '/dev/test',
        name: 'dev-test',
        component: DeveloperTestPage,
      },
      { path: '/dev', redirect: '/dev/test' },

    ],
  });

  return router;
}
