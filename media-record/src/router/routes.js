export default [{
  path: '/',
  component: () => import('@/views/index/index.vue')
}, {
  path: '/audio',
  component: () => import('@/views/audio/index.vue')
}, {
  path: '/video',
  component: () => import('@/views/video/index.vue')
}]
