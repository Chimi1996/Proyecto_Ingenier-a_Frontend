<template>
  <div class="home">
    <div class="form-reserve">
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
</template>

<script>
export default {
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
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.form-reserve {
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: #ffffff1a;
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px #00000040, inset 0px 4px 4px #00000040;
  width: 100%;
  max-width: 600px;
  padding: 40px;
  opacity: 0.9;
  margin-top: -250px; /* Ajusta este valor para mover el contenido hacia arriba */
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
  left: -100px;
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
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #34a853;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
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
  .form-reserve {
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
