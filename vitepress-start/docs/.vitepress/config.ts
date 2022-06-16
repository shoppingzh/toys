import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: '玩一下',
  description: '',

  themeConfig: {
    nav: [{
      text: '文档',
      link: '/doc/1.md'
    }],
    sidebar: {
      '/doc/': [{
        text: '文档',
        items: [{
          text: '格式化',
          link: '/'
        }]
      }]
    }
  }
})
