<template>
  <v-text-field
    variant="outlined"
    :label="label"
    :rules="rules"
    v-model="model"
    type="text"
    :required="required"
    :placeholder="placeholder"
    :error-messages="errorMessages"
  ></v-text-field>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {type: String, required: true},
  label: {type: String, required: true},
  required: {type: Boolean, default: true},
  placeholder: {type: String, default: ''},
  externalError: { type: Boolean, default: false },
});
const errorMessages = ref([]);
const maskedModel = ref(props.modelValue);
let maskCanChange = '';

const rules = computed(() => {
  const rules = [];
  if (props.required) {
    rules.push((v) => !!v || 'Campo obrigatório');
  }
  rules.push((v) => /^[0-9]*$/.test(v) || 'O telefone deve conter apenas números.');
  rules.push((v) => v.length >= 10 || 'Telefone inválido');
  rules.push((v) => v.length <= 11 || 'Telefone inválido');
  return rules;
});


const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

watch(() => props.externalError,
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
