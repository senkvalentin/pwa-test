<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';
import {useQuasar} from 'quasar';

const $q = useQuasar();
const route = useRoute();
const locationId = ref(route.params.locationId); // Get the locationId from the route parameters
const checklists = ref([]);
const showModal = ref(false); // Modal for creating/editing checklists
const isEditing = ref(false);
const currentChecklist = ref({id: null, name: ''});

// Fetch checklists for the location
const getChecklists = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/locations/${locationId.value}/checklists`
    );
    checklists.value = response.data;
  } catch (error) {
    console.error('Error fetching checklists:', error);
    $q.notify({
      type: 'negative',
      message: 'Error fetching checklists. Please try again later.',
    });
  }
};

// Save or edit checklist
const saveChecklist = async () => {
  try {
    if (isEditing.value) {
      // Update existing checklist
      await axios.put(
        `http://localhost:3000/api/checklists/${currentChecklist.value.id}`,
        {
          name: currentChecklist.value.name,
        }
      );
      $q.notify({
        type: 'positive',
        message: 'Checklist updated successfully!',
      });
    } else {
      // Create a new checklist
      const response = await axios.post(
        `http://localhost:3000/api/locations/${locationId.value}/checklists`,
        {
          name: currentChecklist.value.name,
        }
      );
      checklists.value.push(response.data); // Add the new checklist to the list
      $q.notify({
        type: 'positive',
        message: 'Checklist created successfully!',
      });
    }
    getChecklists(); // Refresh the checklists
    closeModal();
  } catch (error) {
    console.error('Error saving checklist:', error);
    $q.notify({
      type: 'negative',
      message: 'Error saving checklist. Please try again later.',
    });
  }
};

// Open the modal for creating or editing a checklist
const openModal = (checklist = null) => {
  if (checklist) {
    isEditing.value = true;
    currentChecklist.value = {...checklist}; // Copy checklist data to edit
  } else {
    isEditing.value = false;
    currentChecklist.value = {id: null, name: ''}; // Reset for new checklist
  }
  showModal.value = true;
};

// Close the modal
const closeModal = () => {
  showModal.value = false;
  currentChecklist.value = {id: null, name: ''};
};

// Delete a checklist
const deleteChecklist = async (checklistId) => {
  try {
    await axios.delete(`http://localhost:3000/api/checklists/${checklistId}`);
    checklists.value = checklists.value.filter(
      (checklist) => checklist.id !== checklistId
    );
    $q.notify({
      type: 'positive',
      message: 'Checklist deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting checklist:', error);
    $q.notify({
      type: 'negative',
      message: 'Error deleting checklist. Please try again later.',
    });
  }
};

onMounted(() => {
  getChecklists(); // Fetch the checklists when the component is mounted
});
</script>

<template>
  <q-page-container>
    <!-- Header -->
    <q-card class="header-card">
      <q-card-section>
        <h2>Checklists for Location {{ locationId }}</h2>
      </q-card-section>
    </q-card>

    <!-- Checklists List -->
    <div class="checklists-container">
      <q-btn
        color="primary"
        icon="add"
        label="Add Checklist"
        @click="openModal()"
        class="add-checklist-btn"
      ></q-btn>

      <q-list bordered>
        <q-item v-for="checklist in checklists" :key="checklist.id" clickable>
          <q-item-section>
            <q-item-label>{{ checklist.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              flat
              dense
              icon="edit"
              color="primary"
              @click.stop="openModal(checklist)"
            ></q-btn>
            <q-btn
              flat
              dense
              icon="delete"
              color="negative"
              @click.stop="deleteChecklist(checklist.id)"
            ></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Modal for Add/Edit Checklist -->
    <q-dialog v-model="showModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ isEditing ? 'Edit Checklist' : 'New Checklist' }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="currentChecklist.name"
            placeholder="Enter checklist name"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="negative"
            @click="closeModal"
          ></q-btn>
          <q-btn
            flat
            label="Save"
            color="primary"
            @click="saveChecklist"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<style scoped>
/* Header Styles */
.header-card {
  margin-bottom: 20px;
}

/* Add Button */
.add-checklist-btn {
  margin-bottom: 20px;
}

/* Checklist Container */
.checklists-container {
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 8px;
}
</style>
