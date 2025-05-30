<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import type { RaceRound } from '@/types/race'

const store = useStore()

const allRounds = computed(() => store.getters.allRounds)
const isRacing = computed(() => store.getters.isRacing)
const hasProgram = computed(() => store.getters.hasProgram)
const allRoundsCompleted = computed(() => {
  const rounds = allRounds.value
  return rounds.length > 0 && rounds.every((round: RaceRound) => round.isCompleted)
})

const generateProgram = () => {
  store.dispatch('generateRaceProgram')
}

const toggleRace = () => {
  if (isRacing.value) {
    store.dispatch('pauseRace')
  } else {
    store.dispatch('startRace')
  }
}
</script>

<template>
  <header class="app-header">
    <h1>Horse Racing</h1>
    <div class="app-header__controls">
      <button @click="generateProgram" :disabled="isRacing && !allRoundsCompleted" class="button--generate">
        Generate Program
      </button>
      <button @click="toggleRace" :disabled="!hasProgram || allRoundsCompleted" class="button--start">
        {{ isRacing && !allRoundsCompleted ? 'Pause' : 'Start' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
@import "@/assets/styles/header.scss";
</style>