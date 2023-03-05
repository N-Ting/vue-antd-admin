// 集成 vite-plugin-html 主要是为了对 index.html 进行压缩和注入动态数据，例如替换网站标题和cdn

// 版本要在3.2.0,为以下引用方式
import {createHtmlPlugin} from 'vite-plugin-html'


export function configHtmlPlugin(viteEnv, isBuild) {
    const { VITE_APP_TITLE } = viteEnv
    const htmlPlugin = createHtmlPlugin({
      minify: isBuild,
      inject: {
        data: {
          title: VITE_APP_TITLE,
        },
      },
    })
    return htmlPlugin
  }