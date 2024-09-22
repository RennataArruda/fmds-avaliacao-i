<template>
    <main-header label="Meus Eventos"/>

    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi-calendar" color="primary"></v-icon> &nbsp;<span class="text-primary">Buscar Eventos</span>

        <v-spacer></v-spacer>

        <v-text-field
          v-model="search" density="compact" label="Pesquisa rápida"
          prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line>
        </v-text-field>
        <v-btn class="ml-3" density="compact" to="/evento"
               color="primary" icon="mdi-plus" v-tooltip="'Adicionar Evento'"></v-btn>
      </v-card-title>

      <v-card-text>
        <v-data-table
          v-model:search="search"
          :headers="headers"
          :items="eventos"
          density="compact"
          item-key="id"
          no-data-text="Nenhum evento encontrado"
          :items-per-page-options="itensPerPage">

          <template v-slot:item.confirms="{ item }">
            {{getConfirmsText(item)}}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon="mdi-eye" class="ma-1" size="x-small" :to="'/evento/' + item.id"
              color="primary" v-tooltip="'Visualizar'"/>

            <v-btn icon="mdi-delete" class="ma-1" size="x-small" @click="confirmDelete(item)"
              color="error" v-tooltip="'Deletar'"/>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

  <confirm-dialog ref="confirmDialog" message="Tem certeza que deseja excluir este evento?" @result="handleDelete"/>
  <alerts :type="alertType" :message="alertMessage" :visible="snackbarVisible" />
</template>

<script setup>
import {ref} from 'vue';
import { useEventosStore } from '@/stores/eventos';
import MainHeader from "@/components/others/main-header.vue";
import ConfirmDialog from "@/components/others/confirm-dialog.vue";
import Alerts from "@/components/others/alerts.vue";
const eventos = ref(useEventosStore().getEventos);
const eventToDelete = ref(null);

const snackbarVisible = ref(false);
const alertType = ref('');
const alertMessage = ref('');

const search = ref('');


const itensPerPage = ref([
  {value: 5, title: '5'},
  {value: 10, title: '10'},
  {value: 15, title: '15'}
]);

const headers = ref([
  {title: 'Tipo', align: 'start', key: 'tipo'},
  {title: 'Nome', align: 'start', key: 'nome'},
  {title: 'Local', align: 'start', key: 'local'},
  {title: 'Data', align: 'start', key: 'data'},
  {title: 'Confirmados', align: 'start', key: 'confirms'},
  {title: '', align: 'start', key: 'actions', sortable: false}
]);

const getConfirmsText = (evento) => {
  const convidados = evento.convidados || [];
  const confirmados = convidados.map(c => c.confirmado).reduce((acc, c) => acc + c, 0);
  return `${confirmados} de ${convidados.length}`;
}

const confirmDelete = (item) => {
  eventToDelete.value = item;
  confirmDialog.value.openDialog();
};

const handleDelete = (confirmed) => {
  if (confirmed) {
    useEventosStore().removeEvento(eventToDelete.value.id);
    showSuccess();
    setTimeout(() => {
      eventos.value = useEventosStore().getEventos;
      snackbarVisible.value = false;
    }, 200);
  }
};

const confirmDialog = ref(null);

const showSuccess = () => {
  alertType.value = 'success';
  alertMessage.value = 'Operação realizada com sucesso!';
  snackbarVisible.value = true;
};

</script>


