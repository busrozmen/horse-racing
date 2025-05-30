<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { Horse } from '@/types/race';

const store = useStore();

const horses = computed(() => store.getters.allHorses as Horse[]);
const activeRound = computed(() => store.getters.activeRound);

const isHorseRacing = (horseId: number): boolean => {
  if (!activeRound.value) return false;
  return activeRound.value.horses.some((horse: Horse) => horse.id === horseId);
};
</script>

<template>
  <div class="horse-list__container">
    <div class="horse-list__header">
      <h2>Horse List</h2>
    </div>
    <div class="horse-list__table">
      <div class="horse-list__table--header">
        <span>Name</span>
        <span>Condition</span>
      </div>
      <div class="horse-list__table--body">
        <div
          v-for="horse in horses"
          :key="horse.id"
          class="horse-list__table--row"
          :class="{ racing: isHorseRacing(horse.id) }"
        >
          <div class="horse-list__item">
            <div class="horse-list__item--icon" :style="{ color: horse.color }">  
                 <IconMdiHorse />
            </div>
            <span>{{ horse.name }}</span>
          </div>
          <span>{{ horse.condition }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/horseList.scss';
</style>
