<template>
    <v-sheet class="d-flex flex-wrap align-center justify-lg-start justify-md-start justify-sm-center mb-1">
      <v-sheet class="ma-2 pa-2">
        <v-responsive>
          <v-img
            src="@/assets/Aura-Logo.png"
            class="rounded-circle"
            width="125"
            height="125"
          ></v-img>
        </v-responsive>
      </v-sheet>
      <v-sheet class="ma-2 pa-2">
        <h1 class="kalam-light text-primary text-sm-h4" >Aura Eventos</h1>
        <span class="text-grey-lighten-1">Cuidamos de cada detalhe, você aproveita cada momento.</span>
      </v-sheet>
    </v-sheet>
    <p class="text-justify text-grey-darken-1 pr-15 pl-15">Na Aura Eventos, cuidamos de cada detalhe para que você possa desfrutar plenamente dos momentos mais
      importantes da sua vida. Oferecemos um serviço completo de organização e gestão de eventos, desde casamentos a
      aniversários e confraternizações. Nosso time de especialistas trabalha com dedicação para transformar suas
      ideias em realidade, personalizando cada aspecto do evento, desde a decoração, buffet, música até a logística.
      Nosso objetivo é garantir que tudo seja perfeito, para que você possa relaxar e aproveitar cada instante com
      seus convidados, sem preocupações. Na Aura Eventos, cada momento é uma celebração inesquecível.</p>

    <v-carousel :show-arrows="false" hide-delimiters cycle hide-delimiter-background class="mt-3">
      <v-carousel-item v-for="item in itensCarrossel" :key="item.src" :src="item.src" :alt="item.alt"></v-carousel-item>
    </v-carousel>
    <h3 class="kalam-light text-primary mt-3">Principais Tipo de Eventos</h3>
    <v-row  class="mt-3">
      <v-col v-for="(evento, i) in tipoEventos" :key="i" cols="12" md="4">
        <v-card
          variant="tonal" class="mx-auto" color="primary"
          max-width="344" :prepend-icon="evento.icon" :title="evento.title"/>
      </v-col>
    </v-row>
</template>

<script setup>
import {ref} from 'vue'

const tipoEventos = ref([
  {
    icon: 'mdi-cake-layered',
    title: 'Casamentos',
  },
  {
    icon: 'mdi-glass-cocktail',
    title: 'Confraternizações',
  },
  {
    icon: 'mdi-cake-variant',
    title: 'Aniversários',
  },
  {
    icon: 'mdi-party-popper',
    title: 'Festas',
  },
  {
    icon: 'mdi-grill',
    title: 'Encontros Casuais',
  },
  {
    icon: 'mdi-office-building',
    title: 'Eventos Corporativos',
  },
])

const itensCarrossel = ref([
  {
    src: new URL('@/assets/evento 1.jpeg', import.meta.url).href,
    alt: 'Confraternização de Empresa',
  },
  {
    src: new URL('@/assets/evento 2.jpeg', import.meta.url).href,
    alt: 'Casamentos',
  },
  {
    src: new URL('@/assets/evento 3.jpeg', import.meta.url).href,
    alt: 'Confraternização de Empresa II',
  },
  {
    src: new URL('@/assets/evento 4.jpeg', import.meta.url).href,
    alt: 'Casamentos II',
  },
  {
    src: new URL('@/assets/evento 5.jpeg', import.meta.url).href,
    alt: 'Encontros Casuais',
  },
  {
    src: new URL('@/assets/evento 6.jpeg', import.meta.url).href,
    alt: 'Festas',
  },
])
</script>

<style>

</style>
