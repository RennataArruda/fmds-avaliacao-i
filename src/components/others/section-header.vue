<template>
  <v-row class="align-center mb-1 mt-1">
    <v-col cols="auto">
      <v-icon color="primary">{{ icon }}</v-icon>
    </v-col>
    <v-col>
      <h3 class="text-primary">{{ label }}</h3>
    </v-col>
    <v-col cols="auto" v-if="!!hasTemplate">
      <slot name="action"></slot>
    </v-col>
  </v-row>
  <v-divider color="primary"></v-divider>
</template>

<script setup>
const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  hasTemplate: { type: Boolean, default: false },
});
</script>
