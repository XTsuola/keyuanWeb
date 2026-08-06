<template>
    <div class="kanban">
        <header class="page-header">
            <div>
                <h1 class="page-title">看板娘</h1>
                <p class="page-sub">{{ statusText }}</p>
            </div>
        </header>
        <div ref="containerRef" class="model-container" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const containerRef = ref<HTMLDivElement | null>(null);
const statusText = ref("模型加载中…");

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let model: THREE.Group | null = null;
let rafId = 0;

function resize() {
    const el = containerRef.value;
    if (!el || !camera || !renderer) return;
    const { clientWidth: w, clientHeight: h } = el;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

function animate() {
    rafId = requestAnimationFrame(animate);
    controls?.update();
    if (scene && camera && renderer) {
        renderer.render(scene, camera);
    }
}

function init() {
    const el = containerRef.value;
    if (!el) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf3f4f6);

    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 1.2, 4);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 10, 7);
    scene.add(ambient, dir);

    resize();

    const loader = new FBXLoader();
    loader.load(
        "/liuyin.fbx",
        (object) => {
            model = object;
            model.scale.set(0.001, 0.001, 0.001);
            model.position.set(0, 0, 0);
            scene?.add(model);
            statusText.value = "拖拽旋转 · 滚轮缩放";
        },
        undefined,
        () => {
            statusText.value = "模型加载失败";
        }
    );

    animate();
    window.addEventListener("resize", resize);
}

onMounted(() => {
    init();
});

onUnmounted(() => {
    window.removeEventListener("resize", resize);
    cancelAnimationFrame(rafId);
    controls?.dispose();
    if (model && scene) scene.remove(model);
    renderer?.dispose();
    if (renderer?.domElement?.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
    }
    scene = null;
    camera = null;
    renderer = null;
    controls = null;
    model = null;
});
</script>

<style lang="less" scoped>
.kanban {
    box-sizing: border-box;
    height: calc(100vh - 140px);
    padding: 12px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.page-header {
    flex: none;
}

.page-title {
    margin: 0;
    font-size: 18px;
    font-weight: 650;
}

.page-sub {
    margin: 2px 0 0;
    color: #8c8c8c;
    font-size: 12px;
}

.model-container {
    flex: 1;
    min-height: 0;
    border-radius: 12px;
    overflow: hidden;
    background: #f3f4f6;
    border: 1px solid #f0f0f0;
}
</style>
