<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { RaceRound } from '@/types/race';

defineProps<{
  title: 'Program' | 'Results';
  showTime: boolean;
  showStatus: boolean;
}>();

const store = useStore();
const hasProgram = computed(() => store.getters.hasProgram);
const allRounds = computed(() => store.getters.allRounds as RaceRound[]);
const racePositions = computed(() => store.getters.racePositions);
const currentRoundHorseTimes = computed(
  () => store.getters.currentRoundHorseTimes
);
const activeRoundIndex = computed(() => store.getters.activeRoundIndex);

const getHorseTimesForRound = (roundIndex: number) => {
  const round = allRounds.value[roundIndex];
  if (roundIndex === activeRoundIndex.value) {
    return currentRoundHorseTimes.value;
  }
  if (round.isCompleted && round.results) {
    const completedTimes: { [key: number]: number } = {};
    round.results.forEach((result) => {
      if (result.horse && result.time !== undefined) {
        completedTimes[result.horse.id] = result.time;
      }
    });
    return completedTimes;
  }
  return {};
};
</script>

<template>
  <div class="round-list__item">
    <div class="round-list__header">
      <h2>{{ title }}</h2>
    </div>

    <div class="round-list__content">
      <div class="round-list__section">
        <div v-if="!hasProgram" class="round-list__empty-section">
          <div class="round-list__empty-section-icon">
            <IconMdiNoteTextOutline v-if="title === 'Program'" />
            <IconMdiFlagCheckered v-else />
          </div>
          <p>No {{ title.toLowerCase() }} generated yet</p>
        </div>

        <div v-else class="round-list__items">
          <RoundItem
            v-for="(round, index) in allRounds"
            :key="`${title}-${round.roundNumber}`"
            :round="round"
            :show-time="showTime"
            :show-status="showStatus"
            :current-positions="showTime ? racePositions : undefined"
            :horse-times="showTime ? getHorseTimesForRound(index) : undefined"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/roundList.scss';
</style>
