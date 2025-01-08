<script setup>
import axios from 'axios';
import {useRouter} from 'vue-router';

import {ref} from 'vue';
import {useUserStore} from '@/stores/userStore.js';
const router = useRouter();
const {saveUserData} = useUserStore();

let email = ref('');
let password = ref('');
const valid = ref('');

const login = async () => {
  if (email.value === '' || password.value === '')
    return (valid.value = 'Please fill in all fields!');
  try {
    const {data} = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value,
    });
    if (data.message == 'User does not exists') {
      return (valid.value = data.message);
    }
    console.log(data);
    saveUserData(data.benutzer_id, data.vorname, data.nachname, data.email);
    navigator.vibrate(200);
    router.push('/home');
  } catch (err) {
    console.log(err);
  }
};
</script>

<template>
  <div class="row justify-center">
    <div class="col-md-2 q-mb-md">
      <q-img
        src="/handover-logo-02.png"
        style="width: 200px"
        class="lt-sm"
      ></q-img>
      <q-img src="/handover-logo-02.png" class="gt-md"></q-img>
    </div>
    <div class="col-12"></div>
    <q-card class="q-pa-md col-md-4 col-xs-10">
      <h1 class="text-h6">Login</h1>
      <q-form class="q-mt-md">
        <q-input
          class="q-mb-md"
          type="email"
          v-model="email"
          filled
          label="Your email *"
          lazy-rules
        />

        <q-input filled type="password" v-model="password" label="Password *">
        </q-input>

        <div style="margin-top: 40px" class="q-gutter-x-sm">
          <q-btn label="Login" id="vibrate" color="primary" @click="login()" />
          <q-btn flat label="Sign Up" to="/register" />
          <span class="text-red"> {{ valid }}</span>
          <q-btn flat label="Continue without login" to="/home" />
        </div>
      </q-form>
    </q-card>
  </div>
</template>
