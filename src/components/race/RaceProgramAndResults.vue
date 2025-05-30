<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import type { RaceRound } from '@/types/race';
import RoundList from '@/components/race/RoundList.vue';

const store = useStore();

const programScroll = ref<InstanceType<typeof RoundList> | null>(null);
const resultsScroll = ref<InstanceType<typeof RoundList> | null>(null);

const allRounds = computed(() => store.getters.allRounds as RaceRound[]);

watch(() => allRounds.value.find(r => r.isActive), async (activeRound) => {
  if (activeRound) {
    const programRoundElement = programScroll.value?.$el.querySelector(
      `[data-round="${activeRound.roundNumber}"]`
    );

    if (programRoundElement) {
      programRoundElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }

    const resultsRoundElement = resultsScroll.value?.$el.querySelector(
      `[data-round="${activeRound.roundNumber}"]`
    );

    if (resultsRoundElement) {
      resultsRoundElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }
});
</script>

<template>
  <div class="race-program-results">
    <RoundList
      title="Program"
      icon="note"
      :showTime="false"
      :showStatus="true"
      ref="programScroll"
    />

    <RoundList
      title="Results"
      icon="flag"
      :showTime="true"
      :showStatus="false"
      ref="resultsScroll"
    />
  </div>
</template>

<style scoped>
@import '@/assets/styles/raceProgramAndResults.scss';
</style>
