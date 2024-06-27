<template>
  <div class="home">
    <div class="form-reserve2">
      <div class="content">
        <div class="copy">
          <div class="header">
            <div class="back-button" @click="goBack">
              <span class="arrow-left">&#8592;</span>
            </div>
            <div class="text-wrapper-5">Registrar Teléfono</div>
          </div>
        </div>
        <div class="input-and-button">
          <div class="field">
            <select class="input-field" v-model="countryCode">
              <option value="506">Costa Rica (+506)</option>
              <option value="1">Estados Unidos (+1)</option>
              <option value="44">Reino Unido (+44)</option>
              <option value="33">Francia (+33)</option>
              <option value="49">Alemania (+49)</option>
              <!-- Agrega más opciones según sea necesario -->
            </select>
          </div>
          <div class="field">
            <input
              type="text"
              class="input-field"
              v-model="phoneNumber"
              placeholder="Número de teléfono"
            />
          </div>
          <div class="button" @click="handleButtonClick">
            <span>{{ buttonText }}</span>
          </div>
        </div>
        <div class="field" v-if="isVerificationStep">
          <input
            type="text"
            class="input-field"
            v-model="verificationCode"
            placeholder="Comprobante"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      countryCode: '506', // Código de país por defecto para Costa Rica
      phoneNumber: '',
      verificationCode: '',
      buttonText: 'Enviar Comprobante',
      isVerificationStep: false,
    };
  },
  methods: {
    handleButtonClick() {
      if (this.isVerificationStep) {
        this.verifyCode();
      } else {
        this.sendVerificationCode();
      }
    },
    async sendVerificationCode() {
      try {
        const response = await axios.post('http://localhost:8000/api/sendSms', {
          country_code: this.countryCode,
          phone_number: this.phoneNumber
        });
        console.log('Código de verificación enviado con éxito:', response.data);
        this.isVerificationStep = true;
        this.buttonText = 'Verificar';
      } catch (error) {
        console.error('Error al enviar el código de verificación:', error.response.data);
        alert('Error al enviar el código de verificación: ' + error.response.data.error);
      }
    },
    async verifyCode() {
      try {
        const response = await axios.post('http://localhost:8000/api/verifycode', {
          verification_code: this.verificationCode,
          phone_number: this.phoneNumber
        });
        console.log('Código verificado correctamente:', response.data);
        alert('Código verificado correctamente');
        // Navegar a RegisterUserPage después de la verificación
        this.$router.push({ name: 'RegisterUserPage' });
      } catch (error) {
        console.error('Error al verificar el código:', error.response.data);
        alert('Error al verificar el código: ' + error.response.data.error);
      }
    },
    goBack() {
      console.log('Volver a la página anterior');
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

.form-reserve2 {
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: #ffffff1a;
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px #00000040, inset 0px 4px 4px #00000040;
  width: 100%;
  max-width: 400px;
  max-height: 350px;
  padding: 40px;
  opacity: 0.9;
  margin-top: -100px; /* Ajusta este valor para mover el contenido hacia arriba */
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
