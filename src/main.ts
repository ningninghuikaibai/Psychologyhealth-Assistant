import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./style.css"

// 函数式 API（经 AutoImport imports 映射引入）不会自动加载样式，需手动引入
import "element-plus/es/components/message/style/css"
import "element-plus/es/components/message-box/style/css"
import "element-plus/es/components/notification/style/css"
import "element-plus/es/components/loading/style/css"

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 全局注册 element-plus 图标，路由 meta 中可以用字符串名称引用
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())
app.use(router)

app.mount('#app')
