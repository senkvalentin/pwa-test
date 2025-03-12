<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserStore } from '@/stores/userStore.js';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const user = useUserStore();

// Locations list
const locations = ref([]);
const searchQuery = ref('');
const filteredLocations = ref([]);

// Modal Controls
const showModal = ref(false);
const isEditing = ref(false);
const currentLocation = ref({ id: null, name: '' });

// Ladezustand für den Dialog
const visible = ref(false);

// Fetch locations from the API
const getLocations = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/locations');
    locations.value = response.data;
    filteredLocations.value = response.data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    $q.notify({
      type: 'negative',
      message: 'Error fetching locations. Please try again later.',
    });
  }
};

// Filter locations based on search query
const filterLocations = () => {
  filteredLocations.value = locations.value.filter((location) =>
    location.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  console.log('filteredLocations:', filteredLocations.value);
  
};

// Async Funktion, um die GPS-Daten abzurufen und als Promise zurückzuliefern
const getGpsData = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          $q.notify({
            type: 'negative',
            message: 'Failed to get location data.'
          });
          reject(error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      reject(new Error('Geolocation not supported'));
    }
  });
};

// Save or edit location (zuerst GPS abrufen und dann speichern)
const saveLocation = async () => {
  visible.value = true;
  try {
    // Abrufen der GPS-Daten
    const coords = await getGpsData();

    if (isEditing.value) {
      // Update location
      await axios.put(
        `http://localhost:3000/api/locations/${currentLocation.value.id}`,
        {
          name: currentLocation.value.name,
          address: `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`
        }
      );
      $q.notify({
        type: 'positive',
        message: 'Location updated successfully!'
      });
    } else {
      // Create new location
      const response = await axios.post('http://localhost:3000/api/locations', {
        name: currentLocation.value.name,
        address: `Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`,
        latitude: coords.latitude,
        longitude: coords.longitude
      });
      locations.value.push(response.data);
      $q.notify({
        type: 'positive',
        message: 'Location created successfully!'
      });
    }
    getLocations();
    closeModal();
  } catch (error) {
    console.error('Error saving location:', error);
    $q.notify({
      type: 'negative',
      message: 'Error saving location. Please try again later.'
    });
  } finally {
    visible.value = false;
  }
};

// Open the modal for editing or creating
const openModal = (location = null) => {
  if (location) {
    isEditing.value = true;
    currentLocation.value = { ...location }; // Copy the location to edit
  } else {
    isEditing.value = false;
    currentLocation.value = { id: null, name: '' };
  }
  showModal.value = true;
};

// Close the modal
const closeModal = () => {
  showModal.value = false;
  currentLocation.value = { id: null, name: '' };
};

// Navigate to checklists page when a location is clicked
const goToChecklists = (locationId) => {
  router.push(`/locations/${locationId}/checklists`);
};

onMounted(() => {
  getLocations();
});

// Logout function
const logout = () => {
  user.logout();
  $q.notify({
    type: 'positive',
    message: 'Successfully logged out!'
  });
  router.push('/');
};
</script>
<template>
  <q-page-container class="main-container">
    <!-- Header -->
    <div class="header-section">
      <div class="header-logo">
        <q-img src="/handover-logo-02.png"></q-img>
      </div>
      <h1 class="header-title">Handing over made easy!</h1>
      <div class="header-logo">
        <q-img src="/handover-logo-02.png"></q-img>
      </div>
    </div>
    <div class="logout-container">
      <q-btn no-caps @click="logout()" class="logout-button"> Logout </q-btn>
    </div>

    <!-- Search & Actions -->
    <div class="search-container">
      <q-input
        outlined
        placeholder="Search Locations..."
        v-model="searchQuery"
        @input="filterLocations"
        class="search-input"
      ></q-input>
      <q-btn
        color="primary"
        icon="add"
        label="Add Location"
        @click="openModal()"
      ></q-btn>
    </div>

    <!-- Locations List -->
    <div class="locations-container">
      <h2 class="locations-title">Locations</h2>
      <div class="card locations-card">
        <q-list bordered>
          <q-item
            v-for="location in filteredLocations"
            :key="location.id"
            clickable
            class="location-item"
            @click="goToChecklists(location.id)"
          >
            <q-item-section>
              <q-item-label class="location-name">{{ location.name }}</q-item-label>
               <q-item-label class=" location-name">{{ location.address }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                dense
                icon="edit"
                color="primary"
                @click.stop="openModal(location)"
              ></q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- Modal for Add/Edit Location -->
    <q-dialog v-model="showModal" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ isEditing ? 'Edit Location' : 'New Location' }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            outlined
            v-model="currentLocation.name"
            placeholder="Enter location name"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="negative" @click="closeModal"></q-btn>
          <q-btn flat label="Save" color="primary" @click="saveLocation"></q-btn>
        </q-card-actions>
        <!-- q-inner-loading wird basierend auf "visible" angezeigt -->
        <q-inner-loading :showing="visible">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page-container>
</template>

<style scoped>
/* Main container */
.main-container {
  padding: 20px;
  background-color: #f2f2f2; /* Neutral background from global styles */
}

/* Header Section */
.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary-blue);
  color: white;
  padding: 20px;
  border-radius: 8px;
}

.header-logo {
  flex: 0 0 auto;
  width: 60px;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0;
  color: var(--primary-yellow);
}

/* Search & Actions */
.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 10px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
}

/* Logout Button */
.logout-container {
  display: flex;
  justify-content: flex-end;
  margin: 20px 0;
}

.logout-button {
  background-color: var(--primary-yellow);
  color: var(--primary-black);
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: var(--primary-green);
  color: white;
}

/* Locations Section */
.locations-container {
  margin-top: 20px;
}

.locations-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--primary-black);
  margin-bottom: 10px;
}

.locations-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.location-item {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.location-item:hover {
  background-color: var(--secondary-blue);
  transform: scale(1.02);
}

.location-name {
  font-size: 16px;
  font-weight: 500;
}
</style>
