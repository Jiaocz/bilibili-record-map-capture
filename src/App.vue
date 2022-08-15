<script setup lang="ts">
import { ref } from 'vue'
import { IData } from './data/interface'
import MapShowcaseVue from './components/MapShowcase.vue';

const ws = new WebSocket('ws://localhost:8080/danmuWs');
const InfoList = ref<IData[]>([]);
const errorFlag = ref(false)
const initialized = ref(false)

ws.onopen = () => {
  console.log('WebSocket conntected');
}

ws.onmessage = (ev) => {
  console.log('Message received', JSON.parse(ev.data));
  const data: IData = JSON.parse(ev.data)
  if (data.state === 100) {
    initialized.value = true
  } else {
    InfoList.value.push(data)
  }
}

ws.onclose = () => {
  console.log('WebSocket closed');
}

ws.onerror = (err) => {
  console.log('WebSocket error', err);
  errorFlag.value = true
}

const handleShown = () => {
  InfoList.value.shift()
}
</script>

<template>
  <div class="container">
    <span v-if="!initialized">
      初始化中...
    </span>
    <span v-if="errorFlag" style="color: #CC1313;">
      发生错误，请联系开发人员
    </span>
    <TransitionGroup name="fade">
      <map-showcase-vue v-for="(map, index) in InfoList" :key="index" :data="map" :in="index === 0" @shown="handleShown"></map-showcase-vue>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.container {
  padding: 0;
  margin: 0;
  height: 1em;
  overflow: hidden;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.face
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
