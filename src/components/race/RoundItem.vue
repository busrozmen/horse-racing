<script setup lang="ts">
import { computed } from 'vue';
import type { RoundItemProps } from '@/types/race';
import { getOrdinalSuffix } from '@/utils/helper'

const props = defineProps<RoundItemProps>();

const getLiveResults = () => {
  if (!props.currentPositions || !props.round.horses || !props.horseTimes) return [];
  const liveResults = props.round.horses.map((horse, index) => {
    const progress = props.currentPositions?.[horse.id] || 0;
    const time = props.horseTimes?.[horse.id] || 0;
    return {
      horse,
      position: index + 1,
      progress,
      time: Math.round(time * 100) / 100,
      isFinished: progress >= 100
    };
  });

  liveResults.sort((a, b) => {
    if (a.isFinished && b.isFinished) {
      return a.time - b.time;
    }
    if (a.isFinished && !b.isFinished) return -1;
    if (!a.isFinished && b.isFinished) return 1;
    
    return b.progress - a.progress;
  });

  liveResults.forEach((result, index) => {
    result.position = index + 1;
  });

  return liveResults;
};

const displayResults = computed(() => {
  if (!props.showTime) {
    return props.round.horses?.map((horse, index) => ({
      horse,
      position: index + 1,
      time: null,
      progress: 0
    })) || [];
  }

  if (props.round.isCompleted && props.round.results) {
    return props.round.results;
  }
  else if (props.currentPositions && props.round.isActive && props.horseTimes) {
    return getLiveResults();
  }
  else {
    return props.round.horses?.map((horse, index) => ({
      horse,
      position: index + 1,
      time: null,
      progress: 0
    })) || [];
  }
});
</script>

<template>
  <div class="round-item" :class="{
    active: round.isActive,
    completed: round.isCompleted,
  }" :data-round="round.roundNumber">
    <div class="round-item__header">
      <span class="round-item__title">
        {{ round.roundNumber }}{{ getOrdinalSuffix(round.roundNumber) }} Lap -
        {{ round.distance }}m
      </span>
      <span v-if="props.showStatus" class="round-item__status" :class="{
        completed: round.isCompleted,
        active: round.isActive,
        pending: !round.isActive && !round.isCompleted
      }">
        <IconMdiCheck v-if="round.isCompleted" />
        <IconMdiHorseVariantFast v-else-if="round.isActive" />
        <IconMdiHourglass v-else />
      </span>
    </div>

    <TransitionGroup name="horse-list" tag="div" class="round-item__horses">
      <div v-for="result in displayResults" :key="`${result.horse.id}-${showTime ? 'result' : 'program'}`"
        class="round-item__horse" :class="{
          winner: showTime && result.position === 1,
          second: showTime && result.position === 2,
          third: showTime && result.position === 3,
        }">
        <span class="round-item__horse-position">
          {{ result.position }}
        </span>
        <span class="round-item__horse-name">
          {{ result.horse.name }}
        </span>
        <span v-if="showTime && result.time !== null && result.time !== undefined" class="round-item__horse-time">
          {{ result.time.toFixed(3) }}s
        </span>
       
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
@import '@/assets/styles/roundItem.scss';
</style>