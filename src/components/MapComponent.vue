<template>
  <GMapMap
    :center="center"
    :zoom="15"
    style="width: 100%; height: 700px"
    @click="handleMapClick"
  >
    <GMapMarker
      v-if="markerPosition"
      :position="markerPosition"
    />
    <GMapMarker
      v-if="destinationMarkerPosition"
      :position="destinationMarkerPosition"
    />
    <GMapDirectionsRenderer
      v-if="directions"
      :directions="directions"
    />
  </GMapMap>
</template>

<script>
export default {
  name: 'MapComponent',
  props: {
    markerPosition: {
      type: Object,
      default: null,
    },
    center: {
      type: Object,
      default: () => ({ lat: 10.6346, lng: -85.4400 }),
    },
    destinationMarkerPosition: {
      type: Object,
      default: null,
    },
    directions: {
      type: Object,
      default: null,
    },
  },
  methods: {
    handleMapClick(event) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.$emit('map-click', { lat, lng });
    },
  },
};
</script>

<style scoped>
/* Agrega estilos personalizados aquí si lo deseas */
</style>
