<template>
    <main-header label="Meus Eventos"/>

    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-responsive>
          <v-icon icon="mdi-calendar" color="primary"></v-icon> &nbsp;<span class="text-primary">Buscar Eventos</span>
          <v-row>
            <v-col cols="12" sm="10">
              <v-text-field
                v-model="search" density="compact" label="Pesquisa rápida"
                prepend-inner-icon="mdi-magnify" variant="solo-filled" flat hide-details single-line>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn class="ml-3" density="compact" to="/evento"
                     color="primary" icon="mdi-plus" v-tooltip="'Adicionar Evento'"></v-btn>
            </v-col>
          </v-row>



        </v-responsive>
      </v-card-title>

      <v-card-text>
        <v-data-table-server
          v-model:search="search"
          :headers="headers"
          :items="eventos"
          density="compact"
          :items-length="totalEventos"
          item-key="id"
          :loading="loading"
          @update:options="dataSearch"
          no-data-text="Nenhum evento encontrado"
          :items-per-page="itensPerPage"
          item-value="name"
          :items-per-page-options="itensPerPageOptions">
          <template v-slot:item.actions="{ item }">
            <v-btn
              icon="mdi-eye" class="ma-1" size="x-small" :to="'/evento/' + item.id"
              color="primary" v-tooltip="'Visualizar'"/>

            <v-btn icon="mdi-delete" class="ma-1" size="x-small" @click="confirmDelete(item)"
              color="error" v-tooltip="'Deletar'"/>
          </template>
        </v-data-table-server>
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
import api from '@/resources/eventosResource';
const eventos = ref([]);
const eventToDelete = ref(null);
const totalEventos = ref(0);
const loading = ref(false);

const snackbarVisible = ref(false);
const alertType = ref('');
const alertMessage = ref('');

const search = ref('');

const itensPerPage = ref(10);
const itensPerPageOptions = ref([
  {value: 5, title: '5'},
  {value: 10, title: '10'},
  {value: 15, title: '15'}
]);

const headers = ref([
  {title: 'Tipo', align: 'start', key: 'tipoEvento', sortable: false},
  {title: 'Nome', align: 'start', key: 'nomeEvento', sortable: false},
  {title: 'Local', align: 'start', key: 'localEvento', sortable: false},
  {title: 'Data', align: 'start', key: 'dataEvento'},
  {title: 'Confirmados', align: 'start', key: 'confirmados', sortable: false},
  {title: '', align: 'start', key: 'actions', sortable: false}
]);

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

const dataSearch = async (options) => {
  loading.value = true;
  const searchOptions = {}
  if (options) {
    if (options.sortBy.length > 0) {
      searchOptions.sortKey = options.sortBy[0].key;
      searchOptions.sortOrder = options.sortBy[0].order;
    }
    searchOptions.page = options.page || 1;
    searchOptions.limit = options.itemsPerPage || itensPerPage.value;
  }
  searchOptions.search = search.value;
  const response = await api.searchEventos(searchOptions);
  console.log(response);
  eventos.value = response.data;
  console.log(eventos.value);
  totalEventos.value = response.total;
  loading.value = false;
}



</script>


