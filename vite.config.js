import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";

import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import autoprefixer from "autoprefixer";
import tailwind from "tailwindcss";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages({
      // 页面路由路径
      dirs: "src/pages",
      // 排除的文件
      exclude: ["**/components/*.vue"],
      // 会生成的路由文件
      extensions: ["vue"],
      // importMode(filepath) {
      //   // sync目录加载的页面
      //   const syncPageNames = ["login", "register", "resetting"];
      //   return syncPageNames.includes(filepath) ? "sync" : "async";
      // },
    }),
    Layouts({
      layoutsDirs: "src/layouts",
      pagesDir: "src/pages",
      defaultLayout: "default",
    }),
    // 自动引入
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        {
          "vue-request": ["useRequest"],
          "@/request": ["useInstance"],
          "@/utils/message": [["default", "$message"]],
          "@/locale": [["default", "$i18n"]],
        },
      ],
      resolvers: [ElementPlusResolver()],
      include: [/\.vue$/, /\.vue\?vue/, /\.js$/],
      eslintrc: {
        enabled: true,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true,
      },
    }),
    // 按需引入
    Components({
      resolvers: [ElementPlusResolver()],
      extensions: ["vue"],
      // 全局注册src/common里的组件
      dirs: ["src/components/"],
      dts: false,
    }),
    // svg
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/images")],
      symbolId: "icon-[name]",
    }),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue"],
    }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer(), tailwind()],
    },
  },
  // 别名配置
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@comp": path.resolve(__dirname, "./src/components"),
    },
  },
  // 运行配置
  server: {
    // 端口号
    port: 1005,
    // 本地开发环境可以使用ip访问
    host: "0.0.0.0",
    // 自动打开浏览器
    open: true,
    hmr: true,
  },
  // 打包配置
  build: {
    terserOptions: {
      directives: true,
      drop_console: true,
      drop_debugger: true,
      comments: true,
    },
    rollupOptions: {
      output: {
        // 对静态资源进行单独分包
        assetFileNames: "assets/[ext]/[name].[hash].[ext]",
        // 分包 https://rollupjs.org/configuration-options/#output-manualchunks
        manualChunks: (id) => {
          // assets/css/tailwind.scss
          if (id.includes("tailwind")) {
            return "tailwindcss";
          }
          if (id.includes("element-plus/icons-vue")) {
            return "element-plus-icons";
          }
          if (id.includes("element-plus")) {
            return "element-plus";
          }
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
