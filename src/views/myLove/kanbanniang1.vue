<template>
  <div>
    <div ref="container" class="model-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

declare var window: any

const container = ref<any>(null)

// 创建场景
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xeeeeee)

// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
camera.position.set(0, 1, 5)

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

let controls: any = null
let model: any = null

const loadFBXModel = () => {
  const loader = new FBXLoader()

  loader.load(
    '/liuyin.fbx', // FBX文件路径
    (object) => {
      model = object

      // 调整模型位置和大小
      model.scale.set(0.001, 0.001, 0.001)
      model.position.set(0, 0, 0)

      // 添加到场景
      scene.add(model)

      // 添加灯光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(5, 10, 7)
      scene.add(directionalLight)
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
      console.error('An error happened', error)
    }
  )
}

const animate = () => {
  requestAnimationFrame(animate)
  if (controls) controls.update()
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

onMounted(() => {
  if (container.value) {
    container.value.appendChild(renderer.domElement)

    // 添加轨道控制器
    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // 加载模型
    loadFBXModel()

    // 开始动画循环
    animate()

    // 监听窗口大小变化
    window.addEventListener('resize', onWindowResize)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  if (model) scene.remove(model)
  renderer.dispose()
})
</script>

<style lang="less" scoped>
.model-container {
  width: 100%;
  height: 100vh;
}
</style>