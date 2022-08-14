<template>
  <div class="container">
    <transition-group name="slide" v-if="props.data.state === 200">
      <div class="row" v-if="step === 0">
        收到投图：{{ props.data.data.courseId }} - 来自：{{ props.data.data.userName }}
      </div>
      <div class="row" v-if="step === 1">
        关卡名： {{ props.data.data.name }}
      </div>
      <div class="row" v-if="step === 2">
        难度： {{ props.data.data.difficultyName }}&nbsp;
        <span style="color: rgba(0, 0, 0, 0.85)">（{{ props.data.data.clearRate }}）</span>&nbsp;
        {{ props.data.data.clears }} / {{ props.data.data.attempts }}
      </div>
      <div class="row" v-if="step === 3">
        <span style="color: #ed5a65;">赞：{{ props.data.data.likes }}</span>&nbsp;
        <span style="color: #1781b5;">不好：{{ props.data.data.boos }}</span>
      </div>
      <div class="row" v-if="step === 4">
        <span>作者时间：{{ props.data.data.uploadTimePretty }}</span>&nbsp;
        <span>最速：{{ props.data.data.worldRecordPretty }}</span>
      </div>
    </transition-group>
    <!-- Unnormal -->
    <div class="row" v-else-if="props.data.state === 451">
      {{ props.data.data.userName }} 的投图 {{ props.data.data.courseId }} 之前已经有人投过，等待游玩
    </div>
    <div class="row" v-else-if="props.data.state === 452">
      {{ props.data.data.userName }} 的投图 {{ props.data.data.courseId }} 已经玩过
    </div>
    <div class="row" v-else-if="props.data.state === 442">
      {{ props.data.data.userName }} 的投图图号验证失败
    </div>
    <div class="row" v-else>
      {{ props.data.data.userName }} 的投图 {{ props.data.data.courseId }}{{ props.data.message }}
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { IData } from '../data/interface';

const emit = defineEmits(['shown']);
const props = defineProps<{ data: IData; in: boolean; }>();
const step = ref(0);

const animate = () => {
  setTimeout(() => {
    step.value = 1;
  }, 2000);
  setTimeout(() => {
    step.value = 2;
  }, 4000);
  setTimeout(() => {
    step.value = 3;
  }, 6000);
  setTimeout(() => {
    step.value = 4;
  }, 8000);
  setTimeout(() => {
    emit('shown');
  }, 10000)
}

watchEffect(
  () => {
    if (props.in) {
      if (props.data.state === 200) {
        animate();
      } else {
        setTimeout(() => {
          emit('shown');
        }, 10000)
      }
    }
  }
)
</script>

<style scoped>
.container {
  padding: 0;
  margin: 0;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2em;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.slide-leave-active {
  position: absolute;
}

.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(100%);
}
</style>
