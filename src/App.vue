<template>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <br>
  <Textarea placeholder="输入一群大傻子" :disabled="false" :resize="true" default-value="你好" :error="true" :readonly="false"></Textarea>
  <Input type="text" placeholder="输入"></Input>
</template>
<script setup lang="ts">
import Ripple from './components/ripple.vue'
import IconButton from './components/icon-button.vue'
import Button from './components/button.vue'
import CircularProgress from './components/circular-progress.vue'
import Filed from './components/field.vue'
import Input from './components/input.vue'
import Textarea from './components/textarea.vue'
</script>
