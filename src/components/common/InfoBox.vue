<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="info-box">
    <div class="info-box__content">
      <slot></slot>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/styles/infoBox.scss';
</style>
