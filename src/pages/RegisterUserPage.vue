<template>
  <div class="home">
    <div class="form-reserve">
      <div class="content">
        <div class="copy">
          <div class="header">
            <div class="back-button" @click="goBack">
              <span class="arrow-left">&#8592;</span>
            </div>
            <div class="text-wrapper-5">Registrar Usuario</div>
          </div>
        </div>
        <div class="input-and-button">
          <div class="field">
            <input
              type="text"
              class="input-field"
              v-model="firstName"
              placeholder="Nombre"
            />
          </div>
          <div class="field">
            <input
              type="text"
              class="input-field"
              v-model="middleName"
              placeholder="Segundo Nombre"
            />
          </div>
          <div class="field">
            <input
              type="text"
              class="input-field"
              v-model="lastName"
              placeholder="Apellido"
            />
          </div>
          <div class="field">
            <input
              type="text"
              class="input-field"
              v-model="secondLastName"
              placeholder="Segundo Apellido"
            />
          </div>
          <div class="field">
            <input
              type="text"
              class="input-field"
              v-model="phoneNumber"
              placeholder="Número de teléfono"
              disabled
            />
          </div>
          <div class="field">
            <select class="input-field" v-model="userType">
              <option value="passenger">Pasajero</option>
              <option value="driver">Conductor</option>
            </select>
          </div>
          <div class="button" @click="handleSubmit">
            <span>{{ userType === 'passenger' ? 'Registrarse' : 'Registrar Vehículo' }}</span>
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
      firstName: '',
      middleName: '',
      lastName: '',
      secondLastName: '',
      phoneNumber: '+50612345678', // Este debería ser el número ingresado en la vista anterior
      userType: 'passenger', // Valor por defecto
    };
  },
  methods: {
    handleSubmit() {
      if (this.userType === 'passenger') {
        this.registerUser();
        this.$router.push({ name: 'UserMapPage' });
      } else {
        this.$router.push({ name: 'RegisterVehicle' });
      }
    },
    registerUser() {
      // Lógica para registrar al usuario
      console.log('Registrando usuario:', {
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        secondLastName: this.secondLastName,
        phoneNumber: this.phoneNumber,
        userType: this.userType,
      });
    },
    goBack() {
      // Aquí puedes añadir la lógica para volver a la página anterior
      console.log('Volver a la página anterior');
      // Por ejemplo, si estás utilizando Vue Router:
      this.$router.go(-1);
    },
  },
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

.form-reserve {
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: #ffffff1a;
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px #00000040, inset 0px 4px 4px #00000040;
  width: 100%;
  max-width: 400px;
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
