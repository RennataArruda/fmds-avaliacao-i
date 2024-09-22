<template>

  <main-header label="Evento" text-inicial="Adicione, edite ou visualize as informações do seu evento."/>
  <v-container max-width="90%" class="ma-auto">
    <v-form ref="form" v-model="isFormValid" lazy-validation>
      <section-header label="Dados do Contratante" icon="mdi-account"/>
      <v-row>
        <v-col cols="12" sm="12">
          <common-input v-model="evento.contratante.nome" label="Nome"
                        type="text" :required="true" :external-error="onSubmitFormInvalid">
          </common-input>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <input-email v-model="evento.contratante.email" label="E-mail"
                       :required="true" :external-error="onSubmitFormInvalid">
          </input-email>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <input-telefone v-model="evento.contratante.telefone" label="Telefone"
                        :required="true" :external-error="onSubmitFormInvalid">
          </input-telefone>
        </v-col>
      </v-row>

      <section-header label="Dados do Evento" icon="mdi-balloon"/>
      <v-row>
        <v-col cols="12" md="6" sm="12">
          <common-input v-model="evento.nome" label="Nome do Evento"
                        type="text" :required="true" :external-error="onSubmitFormInvalid">
          </common-input>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <select-tipo-evento v-model="evento.tipo" label="Tipo de Evento"
                              :required="true" :external-error="onSubmitFormInvalid">
          </select-tipo-evento>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <input-data v-model="evento.data" label="Data do Evento"
                        :required="true" :external-error="onSubmitFormInvalid">
          </input-data>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <input-time v-model="evento.horaEvento" label="Hora do Evento"
                        :required="true" :external-error="onSubmitFormInvalid">
          </input-time>
        </v-col>
        <v-col cols="12" md="3" sm="6">
          <common-input-number v-model="evento.qtdConvidados" label="Quantidade de Convidados"
                        :required="true" :external-error="onSubmitFormInvalid">
          </common-input-number>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <common-input v-model="evento.local" label="Local" type="text"
                        :required="true" :external-error="onSubmitFormInvalid">
          </common-input>
        </v-col>

        <v-col cols="12">
          <input-textarea v-model="evento.descricao" label="Descrição do Evento" :required="false"
                          :external-error="onSubmitFormInvalid">
          </input-textarea>
        </v-col>
      </v-row>

      <section-header label="Convidados" icon="mdi-account-group" :has-template="true">
        <template #action>
          <v-btn color="primary" variant="text" @click="openConvidadoModal(null)" prepend-icon="mdi-plus">Adicionar</v-btn>
        </template>
      </section-header>

      <v-row>
        <v-col cols="12">
          <v-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">Nome</th>
                <th class="text-left">Telefone</th>
                <th class="text-left">Confirmado</th>
                <th class="text-center"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(convidado, index) in evento.convidados" :key="index">
                <td>{{ convidado.nome }}</td>
                <td>{{ convidado.telefone }}</td>
                <td>{{ convidado.confirmado ? 'Sim' : 'Não' }}</td>
                <td class="text-center">
                  <v-btn class="ma-1" color="primary" @click="openConvidadoModal(index)" size="x-small" icon="mdi-pencil"/>
                  <v-btn class="ma-1" color="error" @click="evento.convidados.splice(index, 1)" size="x-small" icon="mdi-delete"/>
                </td>
              </tr>
              </tbody>
            </template>
          </v-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn class="ml-1 ma-1 " variant="tonal" to="/meus-eventos" color="error" prepend-icon="mdi-cancel">
            Voltar
          </v-btn>

          <v-btn class="ml-1 ma-1" variant="tonal" @click="submitForm" color="primary"
                 prepend-icon="mdi-check-circle-outline">
            Salvar
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>

  <ConvidadoModal
    :modal-open="convidadoModalOpen"
    :is-editing="isEditingConvidado"
    :convidado="convidadoObject"
    @confirm="confirmarConvidado"
    @close="convidadoModalOpen = false"
  />

  <alerts :type="alertType" :message="alertMessage" :visible="snackbarVisible" />
</template>

<script setup>
import {ref } from 'vue';
import CommonInput from "@/components/forms/common-input.vue";
import SelectTipoEvento from "@/components/forms/select-tipo-evento.vue";
import InputTextarea from "@/components/forms/input-textarea.vue";
import SectionHeader from "@/components/others/section-header.vue";
import MainHeader from "@/components/others/main-header.vue";
import ConvidadoModal from "@/components/modals/ConvidadoModal.vue";
import InputData from "@/components/forms/input-data.vue";
import InputTime from "@/components/forms/input-time.vue";
import InputEmail from "@/components/forms/input-email.vue";
import InputTelefone from "@/components/forms/input-telefone.vue";
import CommonInputNumber from "@/components/forms/common-input-number.vue";
import Alerts from "@/components/others/alerts.vue";
import { useEventosStore } from '@/stores/eventos';
import { useRouter, useRoute } from 'vue-router';
import { generateUUID } from '@/utils/uuid';

const $route = useRouter();
const $routeCurrent = useRoute();
const id = ref($routeCurrent.params.id);
let $evento = null;

if (!!id.value)
  $evento = useEventosStore().getEventoById(id.value);

const isFormValid = ref(false);
const onSubmitFormInvalid = ref(false);
const evento = ref($evento || {
  contratante: {
    nome: '',
    email: '',
    telefone: '',
  },
  nome: '',
  tipo: '',
  data: '',
  horaEvento: '',
  qtdConvidados: 0,
  local: '',
  descricao: '',
  convidados: [],
});

const convidadoModalOpen = ref(false);
const isEditingConvidado = ref(false);  // Define se estamos editando ou adicionando
const convidadoObject = ref({});
let editIndex = -1;

const openConvidadoModal = (index) => {
  if (index !== null && index !== -1) {
    isEditingConvidado.value = true;
    convidadoObject.value = { ...evento.value.convidados[index] };
    editIndex = index;
  } else {
    isEditingConvidado.value = false;
    convidadoObject.value = {};
  }
  convidadoModalOpen.value = true;
}

const confirmarConvidado = (convidadoData) => {
  if (isEditingConvidado.value && editIndex !== -1)
    evento.value.convidados[editIndex] = { ...convidadoData };
  else
    evento.value.convidados.push({ ...convidadoData });

  convidadoModalOpen.value = false;
};

const submitForm = () => {
  if (!!isFormValid.value) {
    const erro = validarFormulario();
    if (!!erro) {
      showError(erro);
      setTimeout(() => {snackbarVisible.value = false;}, 3000);
    } else {
      if (!evento.value.id) {
        evento.value.id = generateUUID();
        useEventosStore().addEvento(evento.value);
      } else {
        useEventosStore().updateEvento(evento.value, id.value);
      }
      showSuccess();

      setTimeout(() => {
        snackbarVisible.value = false;
        $route.push('/meus-eventos');
      }, 1000);
    }
  } else {
    onSubmitFormInvalid.value = true;

    setTimeout(() => {
      onSubmitFormInvalid.value = false;
    }, 3000);
  }
};

const validarFormulario = () => {
  const qtdRealConvidados = evento.value.convidados.length;
  const qtdConvidados = evento.value.qtdConvidados;

  if (qtdRealConvidados > qtdConvidados) {
    return "A quantidade de convidados informada é menor que a quantidade de convidados adicionados. Verifique!";
  }
}

const snackbarVisible = ref(false);
const alertType = ref('');
const alertMessage = ref('');

const showSuccess = () => {
  alertType.value = 'success';
  alertMessage.value = 'Operação realizada com sucesso!';
  snackbarVisible.value = true;
};

const showError = (erroMessagem) => {
  alertType.value = 'error';
  alertMessage.value = erroMessagem;
  snackbarVisible.value = true;
};

</script>
