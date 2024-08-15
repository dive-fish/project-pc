# project-pc
element-ui基础模板-自用
```
│  .env  // 环境变量-开发
│  .env.production // 环境变量-生产
│  .eslintrc-auto-import.json // 自动导入配置
│  .eslintrc.cjs // eslint配置
│  package-lock.json // 依赖
│  package.json // 依赖
│  tailwind.config.js // tailwind配置
│  vite.config.js // vite配置
│  
├─build-cjs // vite打包后的cjs
│      
└─src
    │  App.vue // 入口vue--设置全局样式、刷新页面时重新加载数据
    │  main.js
    │  
    ├─apis // api入口 用import.meta.glob导入所有目录并生成，依赖assembleContexts.js
    │      
    ├─assets         
    ├─components // 全局组件用x-开头
    │  ├─base
    │  │      x-auth.vue // 权限组件
    │  │      x-empty.vue // 空数据展示组件
    │  │      x-icon.vue // 使用element-icon图标或svg组件
    │  │      
    │  ├─data
    │  │      x-table.vue // 表格组件
    │  │      
    │  ├─feedback
    │  │      x-change-lang.vue // 切换语言组件
    │  │      x-contextmenu.vue // 右键菜单组件
    │  │      x-delete.vue // 删除组件-用于x-table
    │  │      x-dialog.vue // 弹窗组件
    │  │      
    │  ├─form // 表单组件可单独使用或搭配x-form使用
    │  │      x-checkbox.vue 
    │  │      x-date-picker.vue
    │  │      x-dialog-form.vue
    │  │      x-form.vue 
    │  │      x-password-input.vue
    │  │      x-query.vue
    │  │      x-radio.vue
    │  │      x-select.vue
    │  │      x-sent.vue
    │  │      
    │  └─nav
    │          x-back-home.vue
    │          x-tabs.vue
    │          
    ├─layouts // 布局在页面中使用 route配置
    │  │  container-form.vue // 用于登录注册等页面
    │  │  default.vue // 默认布局
    │  │  main.vue // 主布局
    │  │
    ├─locale 用import.meta.glob导入所有目录并生成，依赖assembleContexts.js
    │          
    ├─pages // 页面
    │      
    ├─request // axios请求封装
    │      index.js
    │      
    ├─router // 路由
    │      index.js
    │      permission.js // 用户权限
    │      
    ├─rules // 正则验证
    │      index.js // 验证回调函数 建立在validate和element-ui基础上
    │      validate.js // 验证函数
    │      
    ├─stores // pinia
    │      useAuthStore.js // 权限
    │      useLocaleStore.js // 语言
    │      useUserStore.js // 用户
    │      
    └─utils
            aesRsaUtils.js // 加密解密
            assembleContexts.js // import.meta.glob生成
            cookie.js // cookie操作
            cookieUser.js // 用户信息cookie操作
            copy.js // 复制
            dateFormate.js // 日期格式化
            message.js // 消息提示
            useSubmit.js // vue-request提交表单时使用
            useTableData.js // vue-request表格数据时使用
```

# 版本要求
node版本20+
# 安装依赖
npm i
# 启动
npm run dev
