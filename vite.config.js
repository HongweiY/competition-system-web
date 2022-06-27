import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from "postcss-pxtorem"
import {resolve} from 'path'
// import utils from './src/utils/utils'
//
//
// const rootValue = utils.fontSize()

// https://vitejs.dev/config/
export default defineConfig({

    server: {
        port: 8000, // 设置服务启动端口号
        open: false, // 设置服务启动时是否自动打开浏览器
        cors: true, // 允许跨域
        strictPort: false, // 若端口被占用则启动下一个端口
        // 设置代理，根据我们项目实际情况配置
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9000',
            },
        },
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
        }
    },
    plugins: [vue()]
})
