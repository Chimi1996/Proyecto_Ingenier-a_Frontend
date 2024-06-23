<template>
  <div>
    <section style="position: relative; z-index: 1;">
      <div class="component">
        <div class="overlap-group">
          <div class="circle-button-left" @click="goToLoginPage">
            <span class="arrow-left">&#8592;</span>
          </div>
          <div class="form-reserve"></div>
          <div class="element-input-field-with">
            <input class="field" placeholder="Ingrese su direccion" v-model="address" id="autocomplete"/>
            <div class="circle-button1" @click="getLocation"></div>
          </div>
          <div class="circle-button-right" @click="goToDriverMapPage">
            <span class="arrow-right">&#8594;</span>
          </div>
        </div>
      </div>
    </section>
    <section id="map"></section>
  </div>
</template>

<script>
/* google */
/* eslint-disable */
import axios from 'axios';

export default {
  name: "UserMapPage",
  data() {
    return {
      address: "",
      map: null,
      autocomplete: null,
    }
  },

  mounted() {
    /*new google.map.places.Autocomplete(
      document.getElementById("autocomplete")
    )*/
  },

  methods: {
    

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.getAddressFrom(position.coords.latitude, position.coords.longitude);
            //this.showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude);
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

    showUserLocationOnTheMap(latitude, longitude) {
      /*let map = new google.maps.Map(document.getElementById("map"),{
        zoom:15,
        center: new goolge.maps.LatLng(latitude, longitude),
        mapTypeId:google.maps.mapTypeId.ROADMAP
      })

      new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map:map
      })*/
    },

    goToLoginPage() {
      this.$router.push('/');
    },

    goToDriverMapPage() {
      this.$router.push('/DriverMapPage');
    }
  }
};
</script>

<style>
#map {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #ffffff;
}

:root {
  --button-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  --body-text-font-family: Arial, sans-serif;
  --body-text-font-size: 14px;
  --body-text-font-style: normal;
  --body-text-font-weight: 400;
  --body-text-letter-spacing: normal;
  --body-text-line-height: 1.5;
}

.component {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 20px;
}

.overlap-group {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 33.34px;
  width: 100%;
  max-width: 487px;
  position: relative;
}

.element-input-field-with {
  -webkit-backdrop-filter: blur(4px) brightness(100%);
  backdrop-filter: blur(4px) brightness(100%);
  background-color: #ffffff1a;
  border-radius: 33.34px;
  box-shadow: 0px 4px 4px #00000040, inset 0px 4px 4px #00000040;
  height: 99px;
  width: 100%;
  opacity: 0.9;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.element-input-field-with {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 487px;
  padding: 0 16px;
}

.field {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: var(--button-shadow);
  color: #828282;
  font-family: var(--body-text-font-family);
  font-size: var(--body-text-font-size);
  padding: 16px;
  flex-grow: 1;
  min-width: 0;
}

.circle-button1 {
  width: 40px;
  height: 40px;
  background-color: #34a853;
  border-radius: 50%;
  box-shadow: var(--button-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.circle-button-left {
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(74%);
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
  right: -82px;
  top: 50%;
  transform: translateY(74%);
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
</style>
