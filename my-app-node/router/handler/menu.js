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

            label: '文件管理',
            icon: 'folder',
            children: [
                {
                    path: '/uploadFile',
                    name: 'uploadFile',
                    label: '文件上传',
                    icon: 'setting',
                    url: 'UploadFile.vue'
                },
                {
                    path: '/excelUpload',
                    name: 'excelUpload',
                    label: '上传excel',
                    icon: 'setting',
                    url: 'ExcelUpload.vue'
                },
                {
                    path: '/excelExport',
                    name: 'excelExport',
                    label: '导出excel',
                    icon: 'setting',
                    url: 'ExcelExport.vue'
                },
            ]

        },
        {
            label: '编辑器',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '富文本',
                    icon: 'setting',
                    url: 'PageOne.vue'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: 'markdown',
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
        // {
        //     path: '/user',
        //     name: 'user',
        //     label: '用户管理',
        //     icon: 'user',
        //     url: 'User.vue'
        // },
        {
            path: '/fundlist',
            name: 'fundlist',
            label: '资金管理',
            icon: 'bank-card',
            url: 'FundList.vue'
        },
        {

            label: '文件管理',
            icon: 'folder',
            children: [
                {
                    path: '/uploadFile',
                    name: 'uploadFile',
                    label: '文件上传',
                    icon: 'setting',
                    url: 'UploadFile.vue'
                },
                {
                    path: '/excelUpload',
                    name: 'excelUpload',
                    label: '上传excel',
                    icon: 'setting',
                    url: 'ExcelUpload.vue'
                },
                {
                    path: '/excelExport',
                    name: 'excelExport',
                    label: '导出excel',
                    icon: 'setting',
                    url: 'ExcelExport.vue'
                },
            ]

        },
        {
            label: '编辑器',
            icon: 'location',
            children: [
                {
                    path: '/page1',
                    name: 'page1',
                    label: '富文本',
                    icon: 'setting',
                    url: 'PageOne.vue'
                },
                {
                    path: '/page2',
                    name: 'page2',
                    label: 'markdown',
                    icon: 'setting',
                    url: 'PageTwo.vue'
                }
            ]
        }
    ]
}
