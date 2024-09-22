<template>
  <div class="ma-2 pa-2">
    <h1 class="kalam-light text-primary text-sm-h4">{{ label }}</h1>
    <span class="text-grey-lighten-1">{{textInicial}}</span>
  </div>

  <v-divider class="mt-1 mb-3"></v-divider>
</template>

<script setup>
const props = defineProps({
  label: { type: String, required: true },
  textInicial: { type: String, default: '' }
});
</script>
