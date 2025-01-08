<script setup>
import {useRouter} from 'vue-router';
import axios from 'axios';
import {ref} from 'vue';
const router = useRouter();

let vorname = ref('');
let nachname = ref('');
let email = ref('');
let password = ref('');
let valid = ref('');

const register = async () => {
  if (
    vorname.value === '' ||
    nachname.value === '' ||
    email.value === '' ||
    password.value === ''
  )
    return (valid.value = 'Please fill in all fields!');

  try {
    const {data} = await axios.post('http://localhost:3000/api/register', {
      vorname: vorname.value,
      nachname: nachname.value,
      email: email.value,
      password: password.value,
    });
    console.log(data);
    if (data.message == 'User created') {
      navigator.vibrate(200);
      alert('User created');
      router.push('/');
    }
    if (data.message == 'Email already exists')
      return (valid.value = data.message);
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
          filled
          label="Vorname *"
          v-model="vorname"
          lazy-rules
        />

        <q-input filled label="Nachname *" v-model="nachname" class="q-mb-md">
        </q-input>
        <q-input
          filled
          label="Email *"
          v-model="email"
          type="email"
          class="q-mb-md"
        >
        </q-input>
        <q-input
          filled
          type="password"
          label="Password *"
          v-model="password"
          class="q-mb-md"
        >
        </q-input>

        <div style="margin-top: 40px" class="q-gutter-x-sm">
          <q-btn label="Create account" @click="register()" color="primary" />
          <q-btn flat label="Login" to="/" />
          <span class="text-red">{{ valid }}</span>
          hello
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<style></style>
