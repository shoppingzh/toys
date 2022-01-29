<template>
  <div class="page" :style="{ 'background-color': bgColor }">
    <div class="main">
      <div class="tips">{{ tips }}</div>
      <div class="video-wrap">
        <video ref="video" autoplay playsinline webkit-playsinline />
      </div>
    </div>
  </div>
</template>

<script setup>
import useUserMedia from '@/hooks/useUserMedia'
import { reactive, ref } from 'vue'
import { getSessionCode, verify } from '@/api/facelive'
import { blobToBase64 } from '@/utils/file'

const TOKEN = '24.25f3f4d0fbde8875a8f4b54fbdeff24b.2592000.1645167291.282335-25531109'
const ACTION_TIPS = {
  0: '请眨眨眼',
  4: '请抬头',
  5: '请低头'
}

/**
 * 1. 获取会话ID与随机动作
 * 2. 开启摄像头，并开始录制
 * 3. 指示用户完成动作
 * 4. 屏幕闪烁
 * 5. 结束录制，获得录制数据，上传录制数据，校验，返回结果
 * 6. 提示用户
 */
const { stream, active, start: startCapture, stop: stopCapture } = useUserMedia({ video: true })
const session = reactive({
  id: null,
  actions: []
})
const video = ref(null)
const mr = ref(null)
const blob = ref(null)
const tips = ref(null)
const bgColor = ref(null)

const initSession = () => {
  return new Promise(async(resolve, reject) => {
    try {
      const { result } = await getSessionCode(TOKEN, {
        type: 1,
        min_code_length: 1,
        max_code_length: 1
      })
      Object.assign(session, {
        id: result.session_id,
        actions: result.code.split('').map(o => parseInt(o))
      })
      resolve(session)
    } catch (err) {
      reject(err)
    }
  })
}

async function stageInit() {
  try {
    await initSession()
  } catch (err) {
    alert('初始化认证信息失败')
    return
  }
  stageCapture()
}

async function stageCapture() {
  try {
    await startCapture()
  } catch (err) {
    alert('视频捕捉失败！')
    return
  }
  video.value.srcObject = stream.value
  const blobParts = []
  mr.value = new MediaRecorder(stream.value)
  mr.value.ondataavailable = e => {
    blobParts.push(e.data)
  }
  mr.value.onstop = () => {
    blob.value = new Blob(blobParts, { type: 'video/mp4' })
    stageVerify()
  }
  mr.value.start()

  stageAction()
}

function stageAction() {
  const action = session.actions[0]
  if (action == null) return alert('没有需要完成的动作！')
  tips.value = ACTION_TIPS[action]
  setTimeout(() => {
    stageFlash()
  }, 2000)
}

function stageFlash() {
  tips.value = '屏幕即将闪烁，请保持不动'
  const colors = ['#f5222d', '#1890ff', '#eb2f96', '#52c41a', '#faad14', '#13c2c2']
  const flash = () => {
    bgColor.value = colors.shift()
    if (bgColor.value) {
      setTimeout(() => {
        flash()
      }, 350)
    } else {
      mr.value && mr.value.stop()
    }
  }
  flash()
}

async function stageVerify() {
  video.value.pause()
  video.value.style['filter'] = `blur(10px)`
  stopCapture()
  tips.value = '正在检测，请稍后..'
  try {
    const base64 = await blobToBase64(blob.value)
    try {
      const { result } = await verify(TOKEN, {
        type_identify: 'action',
        video_base64: base64.split(',')[1],
        session_id: session.id
      })
      alert(`识别成功！活体检测打分：${result.score}`)
    } catch (err) {
      alert(err.message)
    }
  } catch (err) {
    return alert(err)
  }
}

stageInit()

</script>

<style lang="less" scoped>
  @size: 200px;
  .page {
    width: 100%;
    height: 100%;
  }
  .tips {
    height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 800;
  }
  .main {
    position: fixed;
    width: @size;
    left: 50%;
    margin-left: -(@size / 2);
    top: 20%;
  }
  .video-wrap {
    width: @size;
    height: @size;
    background-color: rgba(0, 0, 0, .8);
    border-radius: 50%;
    overflow: hidden;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }
  }
</style>