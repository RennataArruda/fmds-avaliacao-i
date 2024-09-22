<template>
  <v-text-field
    variant="outlined"
    :label="label"
    :rules="rules"
    v-model="model"
    type="time"
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

const rules = computed(() => {
  const rules = [];
  if (props.required) {
    rules.push((v) => !!v || 'Campo obrigatório');
  }
  return rules;
});



// Atualiza o valor do modelValue
const emit = defineEmits(['update:modelValue']);
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

watch(() => props.modelValue, (newVal) => {
  if (props.mask) {
    maskedModel.value = props.mask(newVal);
  } else {
    maskedModel.value = newVal;
  }
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
