<script setup>
defineProps({
  prod: Object,
});
const emit = defineEmits(['select']);
</script>

<template>
  <q-card class="text-center q-pa-md q-ma-md">
    <q-img :src="`${prod.img}`" class="" :alt="`Image of ${prod.name}`" />
    <div style="height: 4rem; width: 20vh">
      <h5 class="">{{ prod.name }}</h5>
    </div>
    <p class="card-text">{{ prod.beschreibung }}</p>
    <p class="card-text fw-bold text-center mb-2">€{{ prod.preis }}</p>
    <q-btn
      v-if="prod.anzahl > 0"
      class="btn btn-success d-block mx-auto"
      id="vibrate"
      @click="emit('select', prod.produkt_id)"
    >
      Warenkrob
    </q-btn>
    <q-btn v-else class="" disabled>Mehr gibt es nicht</q-btn>

    <p class="text-center q-mt-md">Kategorie: {{ prod.kategorie }}</p>
    <p class="text-left">Anzahl: {{ prod.anzahl }}</p>
  </q-card>
</template>

<style></style>
