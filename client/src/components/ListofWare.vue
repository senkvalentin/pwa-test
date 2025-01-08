<script setup>
defineProps({
  ware: Array,
});
const emit = defineEmits(['delete']);
</script>

<template>
  <q-card class="row q-pa-md">
    <q-img :src="`${ware.map((el) => el.img).join(', ')} `" class="col-4"></q-img>
    <div class="col-7 q-ml-md">
      <div class="text-h5 text-primary">{{ ware.map((el) => el.name).join(', ') }}</div>
      <div class="text-h6 text-primary">€{{ ware.map((el) => el.preis).join(', ') }}</div>
    <q-btn
      class="text-end bg-red-3"
      icon="delete"
      @click="emit('delete', ware.map((el) => el.name).join(', '))"
    >
    </q-btn>
    </div>
  </q-card>
</template>

<style></style>
