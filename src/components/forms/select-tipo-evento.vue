<template>
  <v-select
    variant="outlined"
    :items="options"
    :label="label"
    :rules="rules"
    v-model="model"
    :required="required"
    :error-messages="errorMessages"
  ></v-select>
</template>

<script setup>
import { computed } from 'vue';

const errorMessages = ref([]);
const props = defineProps({
  modelValue: {type: String, required: true,},
  label: {type: String, required: true,},
  required: {type: Boolean, default: true,},
  externalError: { type: Boolean, default: false },
});

const options = [
  'Casamentos',
  'Confraternizações',
  'Aniversários',
  'Festas',
  'Encontros Casuais',
  'Eventos Corporativos',
  'Não se aplica'
];

const rules = computed(() => {
  const rules = [];
  if (props.required) {
    rules.push((v) => !!v || 'Selecione uma opção');
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
      errorMessages.value = rules.value
        .map((rule) => rule(props.modelValue))
        .filter((msg) => msg !== true);
    } else {
      errorMessages.value = [];
    }
  }
);
</script>
