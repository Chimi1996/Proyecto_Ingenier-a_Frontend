<template>
  <div class="login-page">
    <div class="form-reserve1"></div>
    <div class="content">
      <div class="copy">
        <div class="text-wrapper-5">Uver</div>
        <div class="text-wrapper">Inicio de Sesión</div>
      </div>
      <div class="input-and-button">
        <div class="field">
          <input
            v-model="phoneNumber"
            type="text"
            placeholder="Ingrese su número de teléfono"
            class="input-field"
          />
        </div>
        <button @click="login" class="button">
          <div class="text-wrapper-2">Ingresar</div>
        </button>
      </div>
      <div class="divider">
        <div class="rectangle"></div>
        <p class="p">Si no está asociado, Regístrese</p>
        <div class="rectangle"></div>
      </div>
      <button @click="register" class="button-2">
        <div class="text-wrapper-3">Registrarse</div>
      </button>
      <p class="by-clicking-continue">
        <span class="span">Al hacer clic en Registrarse, acepta nuestros Términos de servicio y Política de privacidad </span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "LoginPage",
  data() {
    return {
      phoneNumber: ""
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8000/api/login', {
          phone_number: this.phoneNumber
        });

        console.log('Inicio de sesión exitoso:', response.data);

        localStorage.setItem('phoneNumber', this.phoneNumber);

        // Redirigir a UserMapPage
        this.$router.push({ name: 'UserMapPage' });
      } catch (error) {
        console.error('Error al iniciar sesión:', error.response.data);
        alert('Error al iniciar sesión: ' + error.response.data.error);
      }
    },
    register() {
      console.log("Registro de usuario");
      this.$router.push({ name: 'RegisterPhonePage' });
    }
  }
};
</script>


<style>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.form-reserve1 {
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: #ffffff1a;
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px #00000040, inset 0px 4px 4px #00000040;
  width: 100%;
  max-width: 550px;
  height: 500px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.9;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  z-index: 1;
}

.copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.text-wrapper {
  color: #000000;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.div {
  color: #000000;
  font-family: "Inter-Regular", Helvetica;
  font-size: 16px;
  text-align: center;
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

.text-wrapper-2 {
  white-space: nowrap;
}

.divider {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.rectangle {
  background-color: #e6e6e6;
  flex-grow: 1;
  height: 1px;
}

.p {
  color: #828282;
  font-family: "Inter-Regular", Helvetica;
  font-size: 16px;
  text-align: center;
}

.button-2 {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  border-radius: 8px;
  height: 40px;
  width: 100%;
  cursor: pointer;
  color: #ffffff;
  font-family: "Inter-Regular", Helvetica;
  font-size: 16px;
  position: relative;
}

.text-wrapper-3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.by-clicking-continue {
  color: #828282;
  font-family: "Inter-Regular", Helvetica;
  font-size: 16px;
  text-align: center;
}

.span {
  color: #828282;
}

.text-wrapper-4 {
  color: #000000;
}

.text-wrapper-5 {
  color: #000000;
  font-family: "Inter-SemiBold", Helvetica;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .form-reserve {
    width: 90%;
    height: auto;
    padding: 20px;
    top: auto;
    transform: none;
    margin-top: 20px;
  }

  .content {
    max-width: 100%;
  }

  .field, .button, .button-2 {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .text-wrapper {
    font-size: 20px;
  }

  .div {
    font-size: 14px;
  }

  .input-field, .text-wrapper-2, .text-wrapper-3, .p {
    font-size: 14px;
  }

  .text-wrapper-5 {
    font-size: 30px;
  }
}
</style>
