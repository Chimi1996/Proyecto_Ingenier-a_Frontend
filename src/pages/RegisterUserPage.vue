<template>
  <div class="home">
    <div class="form-reserve3">
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
/* eslint-disable */
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      secondLastName: '',
      phoneNumber: '84562894', // Este debería ser el número ingresado en la vista anterior
      password: '123',
      userType: 'passenger', // Valor por defecto
    };
  },
  mounted() {
    // Recuperar el número de teléfono del almacenamiento local
    this.phoneNumber = localStorage.getItem('phoneNumber') || '+50612345678';
  },
  methods: {
    async handleSubmit() {
      if (!this.firstName || !this.lastName || !this.phoneNumber || !this.password || !this.userType) {
        alert('Por favor, complete todos los campos requeridos.');
        return;
      }

      try {
        const response = await axios.post('http://localhost:8000/api/CrearUsuario', {
          phone_number: this.phoneNumber,
          first_name: this.firstName,
          middle_name: this.middleName,
          last_name: this.lastName,
          second_last_name: this.secondLastName,
          password: this.password,
          user_type: this.userType,
        });

        alert('Usuario creado con éxito');

        if (this.userType === 'passenger') {
          this.$router.push({ name: 'UserMapPage' });
        } else {
          this.$router.push({ name: 'RegisterVehicle' });
        }
      } catch (error) {
        console.error('Error al registrar el usuario:', error.response.data);
        alert('Hubo un error al crear el usuario: ' + error.response.data.error);
      }
    },

    goBack() {
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

.form-reserve3 {
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
