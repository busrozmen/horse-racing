<script setup lang="ts">
import Header from '@/components/common/Header.vue'
import HorseList from '@/components/race/HorseList.vue'
import RaceTrack from '@/components/race/RaceTrack.vue'
import RaceProgramAndResults from '@/components/race/RaceProgramAndResults.vue'
</script>

<template>
  <Header></Header>
  <main>
    <HorseList />
    <RaceTrack />
    <RaceProgramAndResults />
  </main>
</template>