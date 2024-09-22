<template>
  <v-dialog v-model="dialogVisible" persistent max-width="400px">
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel">Cancelar</v-btn>
        <v-btn color="primary" text @click="confirm">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: { type: String, default: 'Confirmar' },
  message: { type: String, required: true }
});

const emit = defineEmits(['result']);

const dialogVisible = ref(false);

const openDialog = () => {
  dialogVisible.value = true;
};

const confirm = () => {
  emit('result', true);
  dialogVisible.value = false;
};

const cancel = () => {
  emit('result', false);
  dialogVisible.value = false;
};

defineExpose({
  openDialog
});
</script>
