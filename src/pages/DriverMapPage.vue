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
                <span class="arrow-left">&#8592;</span>
              </div>
              <div class="text-wrapper-5">Lista de Viajes Disponibles</div>
              <div class="right-button" @click="navigateToUserMapPage"></div>
            </div>
          </div>

          <div class="trip-list">
            <div
              v-for="(trip, index) in trips"
              :key="index"
              class="trip-item"
              @click="calcularRuta(trip)"
            >
              <div class="trip-info">
                <div><span class="info-label">Nombre:</span> {{ trip.name }}</div>
                <div><span class="info-label">Inicio:</span> {{ trip.start }}</div>
                <div><span class="info-label">Destino:</span> {{ trip.destination }}</div>
                <div><span class="info-label">Precio:</span> {{ trip.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MapComponent from '@/components/MapComponent.vue';

export default {
  components: {
    MapComponent
  },
  data() {
    return {
      trips: [
        { name: "Viaje a la playa", start: "San José", destination: "Jaco", price: "$50" },
        { name: "Viaje de montaña", start: "San José", destination: "Volcán Arenal", price: "$80" },
        { name: "Viaje cultural", start: "San José", destination: "Cartago", price: "$30" }
        // Puedes añadir más objetos de viaje según sea necesario
      ]
    };
  },
  methods: {
    calcularRuta(trip) {
      console.log("Calculando ruta para:", trip);
      // Aquí podrías implementar la lógica para calcular la ruta
    },
    goToLoginPage() {
      this.$router.push('/')
    },
    navigateToUserMapPage() {
      // Lógica para navegar a UserMapPage
      this.$router.push({ name: 'UserMapPage' });
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
