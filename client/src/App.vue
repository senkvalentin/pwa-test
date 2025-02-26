<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-accent">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title>HandOver</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" side="left" bordered>
      <q-list>
        <q-item clickable v-ripple to="/home">
          <q-item-section>Home</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/about">
          <q-item-section>About</q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="logout">
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style>
@font-face {
  font-family: 'Montserrat';
  src: url('/fonts/Montserrat/Montserrat-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Lora';
  src: url('/fonts/Lora/Lora-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'LibreBodoni';
  src: url('/fonts/LibreBodoni/LibreBodoni-Regular.ttf') format('truetype');
}
</style>
