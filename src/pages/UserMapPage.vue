<template>
  <div>
    <div class="map-container">
      <section class="search-bar">
        <div class="component">
          <div class="overlap-group">
            <div class="circle-button-left" @click="goToLoginPage">
              <img src="@/assets/Exit.png" alt="Exit" class="button-icon">
            </div>
            <div class="form-reserve"></div>
            <div class="element-input-field-with">
              <input class="field" placeholder="Ingrese su dirección" v-model="address" id="autocomplete"/>
              <input class="field" placeholder="Destino" v-model="destination"/>
              <div class="buttons-container">
                <button class="action-button" @click="getLocation">Obtener Posición Actual</button>
                <button 
                  class="action-button" 
                  :disabled="!address || !destination"
                  @click="createTrip"
                  @mouseover="toggleTooltip(true)"
                  @mouseleave="toggleTooltip(false)">
                  Iniciar Viaje
                </button>
                <span v-if="tooltipVisible" class="tooltip">Seleccionar Ruta</span>
              </div>
            </div>
            <div class="circle-button-right" @click="goToDriverMapPage">
              <img src="@/assets/Car.png" alt="Exit" class="button-icon2">
            </div>
          </div>
        </div>
      </section>

      <section class="map">
        <MapComponent 
          :markerPosition="markerPosition" 
          :center="mapCenter" 
          :destinationMarkerPosition="destinationMarkerPosition"
          :directions="directions"
          @map-click="handleMapClick"
        />
      </section>

      <!-- Modal -->
      <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <h2>Buscando conductor</h2>
          <p><span class="modal-label">Inicio:</span> {{ address }}</p>
          <p><span class="modal-label">Destino:</span> {{ destination }}</p>
          <div class="loading-spinner"></div>
        </div>
      </div>

      <!-- Modal para no conductores -->
      <div v-if="showDriverRestrictionModal" class="modal-overlay" @click="closeDriverRestrictionModal">
        <div class="modal-content" @click.stop>
          <h2>Apartado para Conductores</h2>
          <p>¿Quieres volverte uno?</p>
          <button @click="closeDriverRestrictionModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import MapComponent from '@/components/MapComponent.vue';

export default {
  name: "UserMapPage",
  components: {
    MapComponent,
  },
  data() {
    return {
      address: "",
      destination: "",
      markerPosition: null,
      destinationMarkerPosition: null,
      mapCenter: { lat: 10.6346, lng: -85.4400 },
      tooltipVisible: false,
      directions: null,
      isModalVisible: false,
      showDriverRestrictionModal: false,
    }
  },

  methods: {
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.getAddressFrom(position.coords.latitude, position.coords.longitude);
            this.showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.log(error.message);
          }
        );
      } else {
        console.log("Tu buscador no soporta la API de geolocalizacion");
      }
    },

    getAddressFrom(lat, long) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDKD3Hnr_ZjJ0zxWwvqE_Dkz_pu3Q4hQJs`)
        .then(response => {
          if (response.data.error_message) {
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
          }
        }).catch(error => {
          console.log(error.message);
        });
    },

    getDestinationAddressFrom(lat, long) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyDKD3Hnr_ZjJ0zxWwvqE_Dkz_pu3Q4hQJs`)
        .then(response => {
          if (response.data.error_message) {
            console.log(response.data.error_message);
          } else {
            this.destination = response.data.results[0].formatted_address;
            console.log(response.data.results[0].formatted_address);
            this.calculateRoute();
          }
        }).catch(error => {
          console.log(error.message);
        });
    },

    showUserLocationOnTheMap(latitude, longitude) {
      this.markerPosition = { lat: latitude, lng: longitude };
      this.mapCenter = { lat: latitude, lng: longitude };
      if (this.destinationMarkerPosition) {
        this.calculateRoute();
      }
    },

    handleMapClick({ lat, lng }) {
      console.log("Destination coordinates:", { lat, lng });
      this.destinationMarkerPosition = { lat, lng };
      this.getDestinationAddressFrom(lat, lng);
    },

    calculateRoute() {
      if (this.markerPosition && this.destinationMarkerPosition) {
        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
          {
            origin: this.markerPosition,
            destination: this.destinationMarkerPosition,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              this.directions = response;
            } else {
              console.log("Directions request failed due to " + status);
            }
          }
        );
      }
    },

    async createTrip() {
      const phoneNumber = localStorage.getItem('phoneNumber');
      if (!phoneNumber) {
        alert('No se ha encontrado el número de teléfono del usuario.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/api/CrearViaje', {
          phone_number: phoneNumber,
          start_point: this.address,
          end_point: this.destination,
        });

        alert('Viaje creado con éxito');
        this.openModal();
      } catch (error) {
        console.error('Error al crear el viaje:', error.response.data);
        alert('Hubo un error al crear el viaje: ' + error.response.data.error);
      }
    },

    toggleTooltip(visible) {
      this.tooltipVisible = visible;
    },

    openModal() {
      this.isModalVisible = true;
    },

    closeModal() {
      this.isModalVisible = false;
    },

    closeDriverRestrictionModal() {
      this.showDriverRestrictionModal = false;
    },

    goToLoginPage() {
      this.$router.push('/');
    },

    async goToDriverMapPage() {
      const phoneNumber = localStorage.getItem('phoneNumber');
      if (!phoneNumber) {
        alert('No se ha encontrado el número de teléfono del usuario.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/api/ObtenerTipoDeUsuario', {
          phone_number: phoneNumber
        });

        if (response.data === 'driver') {
          this.$router.push('/DriverMapPage');
        } else {
          this.showDriverRestrictionModal = true;
        }
      } catch (error) {
        console.error('Error al verificar el tipo de usuario:', error.response?.data || error);
        alert('Hubo un error al verificar el tipo de usuario.');
      }
    }
  }
};
</script>


<style scoped>
:root {
  --button-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  --body-text-font-family: Arial, sans-serif;
  --body-text-font-size: 14px;
  --body-text-font-style: normal;
  --body-text-font-weight: 400;
  --body-text-letter-spacing: normal;
  --body-text-line-height: 1.5;
}

.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.search-bar {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  padding: 10px;
  border-radius: 8px;
  width: calc(100% - 20px); /* Ensure it takes almost full width with some margin */
  max-width: 600px; /* Set a max-width to prevent it from being too wide */
}

.map {
  width: 100%;
  height: 100%;
}

.component {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
}

.overlap-group {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 33.34px;
  width: 100%;
  position: relative;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.modal-content h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-content p {
  font-size: 18px;
  margin-bottom: 20px;
}

.modal-content button {
  background-color: #34a853;
  color: #ffffff;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
  transition: background-color 0.3s ease;
}

.modal-content button:hover {
  background-color: #2c8c47;
}


.element-input-field-with {
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: #ffffff1a;
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px #00000040, inset 0px 4px 4px #00000040;
  padding: 16px;
  width: 100%;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.field {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: var(--button-shadow);
  color: #828282;
  font-family: var(--body-text-font-family);
  font-size: var(--body-text-font-size);
  padding: 10px;
  width: 100%;
}
.button-icon {
  width: 99px;
  height: 99px;
  margin-right: 0px;
}
.button-icon2 {
  width: 25px;
  height: 25px;
  margin-right: 0px;
}

.buttons-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.action-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #34a853;
  color: white;
  cursor: pointer;
  box-shadow: var(--button-shadow);
  font-family: var(--body-text-font-family);
  font-size: var(--body-text-font-size);
}

.action-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.tooltip {
  background-color: black;
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 12px;
  z-index: 10;
}

.circle-button1 {
  display: none; /* Hidden as it's not used anymore */
}

.circle-button-left {
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: #34a853;
  border-radius: 50%;
  box-shadow: var(--button-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
}

.circle-button-right {
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: #34a853;
  border-radius: 50%;
  box-shadow: var(--button-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
}

.circle-button-left .arrow-left,
.circle-button-right .arrow-right {
  color: #ffffff;
  font-size: 20px;
}

/* Estilos para el modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal-content {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 8px;
  box-shadow: var(--button-shadow);
  text-align: center;
  position: relative;
}

.modal-label {
  color: #34a853;
  font-weight: bold;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #34a853;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 20px auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
