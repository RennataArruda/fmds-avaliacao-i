<template>
  <v-textarea
    :label="label"
    v-model="model"
    :rules="computedRules"
    :placeholder="placeholder"
    :rows="rows"
    :error-messages="errorMessages"
  ></v-textarea>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: true },
  placeholder: { type: String, default: '' },
  rows: { type: Number, default: 3 },
  externalError: { type: Boolean, default: false }
});

const errorMessages = ref([]);

const computedRules = computed(() => {
  const rules = [];
  if (props.required) {
    rules.push((v) => !!v || 'Campo obrigatório');
  }
  return rules;
});

const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

watch(
  () => props.externalError,
  (newVal) => {
    if (newVal) {
      errorMessages.value = computedRules.value
        .map((rule) => rule(props.modelValue))
        .filter((msg) => msg !== true);
    } else {
      errorMessages.value = [];
    }
  }
);
</script>
