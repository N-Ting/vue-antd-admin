import vue from '@vitejs/plugin-vue'
/**
 * * 扩展setup插件，支持在script标签中使用name属性
 * usage: <script setup name="MyComp"></script>
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// rollup打包分析插件
import {visualizer} from 'rollup-plugin-visualizer'

import { configHtmlPlugin } from './html'
import { unocss } from './unocss'

// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite"


import { configMockPlugin } from './mock'
/**
 * * 组件库按需引入插件
 * usage: 直接使用组件,无需在任何地方导入组件
 */
import Components from 'unplugin-vue-components/vite'
import {AntDesignVueResolver} from "unplugin-vue-components/resolvers"


export function createVitePlugins(viteEnv, isBuild) {
  const plugins = [
    vue(),
    VueSetupExtend(),
    configHtmlPlugin(viteEnv, isBuild),
    unocss(),
    AutoImport({
      //安装两行后你会发现在组件中不用再导入ref，reactive等
      imports: ['vue', 'vue-router'],
      dts: "src/auto-import.d.ts",
      //ant-design-vue
      resolvers: [AntDesignVueResolver()]
    }),
    Components({
      resolvers: [AntDesignVueResolver({
        // 不加载css, 而是手动加载css. 通过手动加载less文件并将less变量绑定到css变量上, 即可实现动态主题色
          importStyle: false,
          // 加载所有icon
          resolveIcons: true,
      })],
    }),
  ]
  if (isBuild) {
    plugins.push(
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    )
  }

  if (viteEnv?.VITE_APP_USE_MOCK) {
    plugins.push(configMockPlugin(isBuild))
  }
  return plugins
}