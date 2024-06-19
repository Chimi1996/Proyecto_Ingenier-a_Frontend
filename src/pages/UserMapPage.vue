<template>
  <div>
    <section style="position: relative;z-index: 1;">

      <div class="component">
        <div class="overlap-group">
          <div class="form-reserve"></div>
          <div class="element-input-field-with">
            <input class="field" placeholder="Placeholder" :type="inputType" />
            <div class="circle-button" @click="getLocation"></div>
          </div>
        </div>
      </div>

    </section>


    <section id="map"></section>
  </div>


</template>


<script>

//import axios from 'axios'

export default {
  name: "Component",
  props: {
    inputType: {
      type: String,
      default: "text",
    },
  },
  data(){
    return {
      address: "",
      error:""
    }
  },
  methods: {
    getLocation() {
      console.log("Obtiene la posicion");
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.getAddressFrom(position.coords.latitude, position.coords.longitude);
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            this.showUserLocationOnTheMap(position.coords.latitude, position.coords.longitude);
          },
          error=> {
            console.log(error.message);
          }
        );
      } else {
        console.log("Tu buscador no soporta la API de geolocalizacion");
      }
    },
    getAddressFrom(lat, long){
      /*axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="
      + lat + ","
      + long + "&key=AIzaSyDKD3Hnr_ZjJ0zxWwvqE_Dkz_pu3Q4hQJs").then(response => {
        if(response.data.error_message){
          console.log(response.data.error_message)
        } else {
          console.log(response.data.results[0].formatted_address);
        }

      }).catch(error => {
        console.log(error.message);
      })*/


    },
    showUserLocationOnTheMap(latitude, longitude) {
      //Create a map object
      let map = new google.maps.Map(document.getElementById("map"),{
        zoom: 15,
        center: new google.maps.LatLng(latitude,longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      })

      //Add marker
      new google.maps.marker({
        position: new google.maps.LatLng(latitude,longitude),
        map: map
      })

    }

  }
};
</script>

<style>

  #map {
    position: absolute;
    top: 0%;
    right: 0;
    bottom: 0;
    left: 0;
    background:  red
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

.circle-button {
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

</style>

