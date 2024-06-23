<template>
  <div class="home">
    <div class="form-reserve4">
      <div class="content">
        <div class="copy">
          <div class="header">
            <div class="back-button" @click="goBack">
              <span class="arrow-left">&#8592;</span>
            </div>
            <div class="title-column">
              <div class="text-wrapper-5">Registrar Vehículo</div>
            </div>
          </div>
        </div>
        <div class="form-vehicle">
          <div class="input-and-button">
            <div class="field">
              <input class="input-field" type="text" placeholder="Placa del vehículo" v-model="vehicle.license_plate">
            </div>
            <div class="field">
              <select class="input-field" v-model="vehicle.year" required>
                <option value="" disabled selected>Seleccione el año</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
            <div class="field">
              <select class="input-field" v-model="vehicle.brand" required>
                <option value="" disabled selected>Seleccione la marca</option>
                <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
              </select>
            </div>
            <div class="field">
              <select class="input-field" v-model="vehicle.color" required>
                <option value="" disabled selected>Seleccione el color</option>
                <option v-for="color in colors" :key="color" :value="color">{{ color }}</option>
              </select>
            </div>
            <div class="field">
              <input class="input-field" type="text" placeholder="Modelo del vehículo" v-model="vehicle.model">
            </div>
            <div class="button" @click="handleSubmit">Registrar Vehículo</div>
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
      vehicle: {
        license_plate: '',
        year: null,
        brand: '',
        color: '',
        model: ''
      },
      years: [],
      brands: ['Toyota', 'Honda', 'Chevrolet', 'Ford', 'Nissan', 'Volkswagen', 'BMW'],
      colors: ['Rojo', 'Azul', 'Blanco', 'Negro', 'Plata', 'Verde', 'Gris', 'Amarillo', 'Naranja', 'Marrón']
    };
  },
  mounted() {
    // Generar la lista de años desde 2025 hasta 1700
    for (let year = 2025; year >= 1700; year--) {
      this.years.push(year);
    }
  },
  methods: {
    goBack() {
      // Aquí puedes añadir la lógica para volver a la página anterior
      console.log('Volver a la página anterior');
      // Por ejemplo, si estás utilizando Vue Router:
      this.$router.go(-1);
    },
    handleSubmit() {
      // Capturar los datos del vehículo
      const newVehicle = { ...this.vehicle };

      // Guardar los datos del vehículo para uso futuro (por ejemplo, en localStorage)
      localStorage.setItem('savedVehicle', JSON.stringify(newVehicle));

      // Navegar a la página UserMapPage (reemplaza con tu lógica de navegación real)
      this.$router.push('/DriverMapPage');
    }
  }
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.form-reserve4 {
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: #ffffff1a;
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px #00000040, inset 0px 4px 4px #00000040;
  width: 100%;
  max-width: 400px;
  padding: 40px;
  opacity: 0.9;
  margin-top: 0px; /* Ajusta este valor para mover el contenido hacia arriba */
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

.input-and-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
}

.field {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px 16px;
  width: 100%;
}

.input-field {
  border: none;
  outline: none;
  flex: 1;
  font-size: 16px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #34a853;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  cursor: pointer;
  color: #ffffff;
  font-family: "Inter-Regular", Helvetica;
  font-size: 16px;
}

@media (max-width: 768px) {
  .form-reserve {
    width: 90%;
    padding: 20px;
  }

  .content {
    max-width: 100%;
  }

  .field,
  .button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .text-wrapper-5 {
    font-size: 20px;
  }

  .input-field {
    font-size: 14px;
  }
}
</style>
