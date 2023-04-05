import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import VueMacros from 'unplugin-vue-macros/vite'
// @ts-ignore
import {transformShortVmodel} from '@vue-macros/short-vmodel';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueMacros({
            plugins: {
                vue: vue({
                    template: {
                        compilerOptions: {
                            nodeTransforms: [
                                transformShortVmodel({
                                    prefix: '::',
                                }),
                            ],
                        },
                    },
                }),
                // vueJsx: VueJsx(), // 如果需要
            },
        }),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),

    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
