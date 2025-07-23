<template>
  <Button :loading="true" type="text">正在加载</Button>
  <CircularProgress :value="0.89" :unknown="false"></CircularProgress>
  <CircularProgress :unknown="true"></CircularProgress>
</template>
<script setup lang="ts">
import Ripple from './components/ripple.vue'
import Button from './components/button.vue'
import CircularProgress from './components/circular-progress.vue';
</script>
