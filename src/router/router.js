import Main from '@/pages/Main.vue'
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/current',
    component: Main,
    children: [
        {
            path: 'current',
            name: 'current',
            component: () => import('../pages/current/index.vue')
        },
        {
            path: 'history',
            name: 'history',
            component: () => import('../pages/history/index.vue')
        }
    ]
};
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    otherRouter
];
