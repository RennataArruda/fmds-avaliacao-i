<template>
  <v-snackbar
    v-model="visibleModel"
    :color="snackbarColor"
    top
    right
    :timeout="3000"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="visibleModel = false">Fechar</v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  type: {type: String, required: true, validator: value => ['success', 'error'].includes(value)},
  message: {type: String, required: true},
  visible: {type: Boolean, default: false}
});

const emit = defineEmits(['update:visible']);
const snackbarVisible = ref(props.visible);
const visibleModel = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
});

watch(() => props.visible, (newVal) => {
  snackbarVisible.value = newVal;
});

const snackbarColor = computed(() => {
  return props.type === 'success' ? 'green darken-2' : 'red darken-2';
});

watch(snackbarVisible, (newVal) => {
  if (!newVal) emit('update:visible', false);
});
</script>
