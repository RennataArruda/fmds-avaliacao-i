<template>
  <v-dialog :model-value="modalOpen" persistent max-width="80%" @update:model-value="updateModalOpen">
    <v-card>
      <v-card-title>
        {{ isEditing ? 'Editar Convidado' : 'Adicionar Convidado' }}
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="isFormValid" lazy-validation>
          <v-row>
            <v-col cols="12" md="6">
              <common-input v-model="convidadoData.nome" label="Nome do Convidado"
                            :external-error="onSubmitFormInvalid" type="text" :required="true">
              </common-input>
            </v-col>
            <v-col cols="12" md="3">
              <input-telefone v-model="convidadoData.telefone" label="Telefone"
                            :external-error="onSubmitFormInvalid" type="text" :required="true" :is-telefone="true">
              </input-telefone>
            </v-col>
            <v-col cols="12" md="3">
              <v-label>Presença confirmada?</v-label>
              <v-switch v-model="convidadoData.confirmado" label="Sim" density="compact" color="primary" inset></v-switch>
            </v-col>
          </v-row>
        </v-form>

      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="fecharModal">Cancelar</v-btn>
        <v-btn color="primary" @click="confirmar">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import CommonInput from "@/components/forms/common-input.vue";
import InputTelefone from "@/components/forms/input-telefone.vue";
import { generateUUID } from '@/utils/uuid';

const isFormValid = ref(false);
const onSubmitFormInvalid = ref(false);
const props = defineProps({
  modalOpen: {type: Boolean, default: false},
  isEditing: {type: Boolean, default: false},
  convidado: {type: {}, default: null},
});


const emit = defineEmits(['confirm', 'close', 'update:modalOpen']);

const convidadoData = ref({
  nome: '',
  telefone: '',
  confirmado: false,
});

watch(() => props.convidado, (newVal) => {
  if (!!newVal) {
    convidadoData.value.id = newVal.id;
    convidadoData.value.nome = newVal.nome || '';
    convidadoData.value.telefone = newVal.telefone || '';
    convidadoData.value.confirmado = newVal.confirmado || false;

    console.log('convidadoData', convidadoData.value);
  }
});

const confirmar = () => {

  if (isFormValid.value) {
    if (props.isEditing) convidadoData.value.id = props.convidado.id;
    else convidadoData.value.id = generateUUID();

    emit('confirm', convidadoData.value);
    emit('update:modalOpen', false);
  } else {
    onSubmitFormInvalid.value = true;
    setTimeout(() => {
      onSubmitFormInvalid.value = false;
    }, 3000);
  }

};

const fecharModal = () => {
  emit('close');
  emit('update:modalOpen', false);
};

const updateModalOpen = (value) => {
  emit('update:modalOpen', value);
};
</script>
