import { defineStore } from 'pinia';

import { ref } from 'vue';

export const useUserStore = defineStore('userstore', () => {
  const user = ref({
    id: null,
    vorname: null,
    nachname: null,
    email: null,
  });

  const saveUserData = (id, vorname, nachname, email) => {
    user.value.id = id;
    user.value.vorname = vorname;
    user.value.nachname = nachname;
    user.value.email = email;
  };

  const logout = async () => {
    user.value.id = null;
    user.value.vorname = null;
    user.value.nachname = null;
    user.value.email = null;
  };

  const isAuthenticated = () => user.value.id != null;

  return { user, isAuthenticated, saveUserData, logout };
});
