/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        default: "var(--color)",
        primary: "var(--el-color-primary)",
        success: "var(--el-color-success)",
        warning: "var(--el-color-warning)",
        danger: "var(--el-color-danger)",
        info1: "var(--el-color-info)",
        info2: "var(--sm-color)",
        info3: "var(--md-color)",
      },
    },
  },
  plugins: [],
};
