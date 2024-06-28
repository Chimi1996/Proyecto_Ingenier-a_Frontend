<template>
  <div class="home">
    <div class="map-container">
      <section class="map">
        <MapComponent />
      </section>

      <div class="form-reserve5">
        <div class="content">
          <div class="copy">
            <div class="header">
              <div class="back-button" @click="goToLoginPage">
                <img src="@/assets/Exit.png" alt="Exit" class="button-icon">
              </div>
              <div class="text-wrapper-5">Lista de Viajes Disponibles</div>
              <div class="right-button" @click="navigateToUserMapPage">
                <img src="@/assets/Person.png" alt="Exit" class="button-icon2">
              </div>
            </div>
          </div>

          <div class="trip-list">
            <div
              v-for="(trip, index) in limitedTrips"
              :key="index"
              class="trip-item"
              @click="openModal(trip)"
            >
              <div class="trip-info">
                <div><span class="info-label">Inicio:</span> {{ trip.start_point }}</div>
                <div><span class="info-label">Destino:</span> {{ trip.end_point }}</div>
                <div><span class="info-label">Precio:</span> {{ trip.fare }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>¿Desea aceptar el viaje?</h2>
        <p><span class="modal-label">Inicio:</span> {{ selectedTrip.start_point }}</p>
        <p><span class="modal-label">Destino:</span> {{ selectedTrip.end_point }}</p>
        <p><span class="modal-label">Precio:</span> {{ selectedTrip.fare }}</p>
        <button @click="acceptTrip">Aceptar</button>
        <button @click="closeModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import MapComponent from '@/components/MapComponent.vue';

export default {
  components: {
    MapComponent
  },
  data() {
    return {
      trips: [], // Inicializar como un array vacío
      showModal: false,
      selectedTrip: null
    };
  },
  computed: {
    limitedTrips() {
      if (Array.isArray(this.trips)) {
        return this.trips.slice(-3).reverse(); // Tomar los últimos 3 viajes y revertir el orden para mostrar los más recientes primero
      }
      return [];
    }
  },
  methods: {
    openModal(trip) {
      this.selectedTrip = trip;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedTrip = null;
    },
    async acceptTrip() {
      try {
        const phoneNumber = localStorage.getItem('phoneNumber');
        const response = await axios.post('http://localhost:8000/api/acceptTrip', {
          id_trip: this.selectedTrip.id_trip, // Asegúrate de que el campo coincide con el backend
          phone_number: phoneNumber
        });
        alert('Viaje aceptado exitosamente');
        this.closeModal();
        this.fetchTrips(); // Actualiza la lista de viajes después de aceptar uno
      } catch (error) {
        console.error('Error al aceptar el viaje:', error.response.data);
        alert('Hubo un error al aceptar el viaje: ' + error.response.data.error);
      }
    },
    calcularRuta(trip) {
      console.log("Calculando ruta para:", trip);
      // Aquí podrías implementar la lógica para calcular la ruta
    },
    goToLoginPage() {
      this.$router.push('/');
    },
    navigateToUserMapPage() {
      // Lógica para navegar a UserMapPage
      this.$router.push({ name: 'UserMapPage' });
    },
    async fetchTrips() {
      try {
        const response = await axios.get('http://localhost:8000/api/ObtenerViajesEnEspera');
        if (Array.isArray(response.data)) {
          this.trips = response.data;
        } else {
          console.error('La respuesta del servidor no es un array:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener los viajes en espera:', error);
      }
    }
  },
  mounted() {
    this.fetchTrips(); // Llamar a fetchTrips cuando el componente se monte
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

.home {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.form-reserve5 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: rgba(255, 255, 255, 0.8); /* Less transparent */
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
  max-width: 400px;
  padding: 40px;
  z-index: 2;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
}

.copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.header {
  position: relative;
  width: 100%;
  text-align: center;
}

.button-icon {
  width: 99;
  height: 99px;
  margin-right: 0px;
}
.button-icon2 {
  width: 25px;
  height: 25px;
  margin-top: 7px;
}

.back-button {
  position: absolute;
  left: -60px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #34a853;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  box-shadow: var(--button-shadow); /* Ensure buttons have shadow */
}

.arrow-left {
  color: #ffffff;
  font-size: 24px;
}

.text-wrapper-5 {
  color: #000000;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 24px;
  font-weight: 600;
}

.right-button {
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #34a853;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  box-shadow: var(--button-shadow); /* Ensure buttons have shadow */
}

.trip-list {
  width: 100%;
  margin-top: 20px;
}

.trip-item {
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.trip-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-label {
  font-weight: bold;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.modal-content h2 {
  margin-bottom: 20px;
}

.modal-content button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #34a853;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #2c8c47;
}

@media (max-width: 768px) {
  .form-reserve5 {
    width: 90%;
    padding: 20px;
  }

  .content {
    max-width: 100%;
  }

  .back-button {
    left: -20px; /* Ajusta el posicionamiento en pantallas más pequeñas */
  }

  .right-button {
    right: -20px; /* Ajusta el posicionamiento en pantallas más pequeñas */
  }
}
</style>
