<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import type { RaceRound } from '@/types/race';
import { getOrdinalSuffix } from '@/utils/helper';
import InfoBox from '@/components/common/InfoBox.vue';

const store = useStore();

const activeRound = computed(
  () => store.getters.activeRound as RaceRound | undefined
);
const racePositions = computed(() => store.getters.racePositions);
const hasProgram = computed(() => store.getters.hasProgram);
const allRounds = computed(() => store.getters.allRounds);
const allRoundsCompleted = computed(() => {
  const rounds = allRounds.value;
  return (
    rounds.length > 0 && rounds.every((round: RaceRound) => round.isCompleted)
  );
});

const getHorsePosition = (horseId: number): number => {
  return racePositions.value[horseId] || 0;
};
</script>

<template>
  <div class="race-track__container">
    <div class="race-track__header">
      <h2 v-if="activeRound">
        {{ activeRound.roundNumber
        }}{{ getOrdinalSuffix(activeRound.roundNumber) }} Lap -
        {{ activeRound.distance }}m
      </h2>
      <h2 v-else>Ready to Race</h2>
    </div>

    <div v-if="hasProgram && !allRoundsCompleted" class="race-track__lanes">
      <div v-for="index in 10" :key="index" class="race-track__lane">
        <div class="race-track__lane--number">{{ index }}</div>
        <div class="race-track__lane--item">
          <IconMdiHorse
            v-if="activeRound && activeRound.horses[index - 1]"
            class="race-track__lane--horse"
            :style="{
              left: getHorsePosition(activeRound.horses[index - 1].id) + '%',
              color: activeRound.horses[index - 1].color,
            }"
          />
        </div>
      </div>

      <div class="race-track__finish-line">
        <div class="race-track__finish-text">FINISH</div>
      </div>
    </div>

    <InfoBox
      v-else-if="!hasProgram"
      title="Generate Program to Start Racing"
      description='Click "Generate Program" to create 6 rounds of exciting horse races!'
      ><IconMdiFlagCheckered class="race-track__info-box--flag-icon"
    /></InfoBox>
    <InfoBox
      v-else-if="allRoundsCompleted"
      title="All Races Completed!"
      description='Click "Generate Program" to start a new racing program!'
      ><IconMdiTrophy class="race-track__info-box--trophy-icon"
    /></InfoBox>
  </div>
</template>

<style scoped>
@import '@/assets/styles/raceTrack.scss';
</style>