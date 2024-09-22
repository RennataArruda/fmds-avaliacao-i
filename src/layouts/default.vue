<template>
  <v-app>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = !rail"
      >

        <v-list density="compact" nav>
          <v-list-item color="primary" to="/" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
          <v-list-item color="primary" to="/meus-eventos" prepend-icon="mdi-calendar" title="Meus Eventos" value="events"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container class="mb-16" max-width="95%">
          <router-view/>
        </v-container>
      </v-main>
    </v-layout>
    <AppFooter/>
  </v-app>
</template>

<script setup>
import AppFooter from "@/components/AppFooter.vue";
import {ref} from 'vue'

const drawer = ref(true)
const rail = ref(true)
</script>
