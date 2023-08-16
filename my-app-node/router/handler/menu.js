/**
 * @描述:登录返回的数据,这部分没有写在mysql中,使用非关系型数据库更好
 */
module.exports = {
    // 管理员的路由
    admin: [
        {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home.vue'
        },
        {
            path: '/mall',
            name: 'mall',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall.vue'
        },
        {
            path: '/user',
            name: 'user',
            label: '用户管理',
            icon: 'user',
            url: 'User.vue'
        },
        {
            path: '/fundlist',
            name: 'fundlist',
            label: '资金管理',
            icon: 'bank-card',
            url: 'FundList.vue'
        },
        {
            label: '其他',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '页面1',
                    icon: 'setting',
                    url: 'PageOne.vue'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: '页面2',
                    icon: 'setting',
                    url: 'PageTwo.vue'
                }
            ]
        }
    ],
    // 员工的路由
    employ: [
        {
            path: '/home',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home.vue'
        },
        {
            path: '/video',
            name: 'video',
            label: '商品管理',
            icon: 'video-play',
            url: 'Mall.vue'
        },
        {
            path: '/fundlist',
            name: 'fundlist',
            label: '资金管理',
            icon: 'bank-card',
            url: 'FundList.vue'
        },
    ]
}
