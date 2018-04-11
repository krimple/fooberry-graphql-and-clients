<template>
  <img
    :class="{ icon: true, dimmed: noPlayer }"
    :src="icon">
</template>
<script>
  import tileServices from '../services/tile-services';

export default {

  props: {
    tile: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      icon: tileServices.mapTypeToIconInfo(this.tile.type)
    }
  },
  computed: {
    noPlayer: function() {
      return false;
    }
  },
  watch: {
    tile: {
      handler: function () {
        this.icon = tileServices.mapTypeToIconInfo(this.tile.type)
      },
      deep: true
    },
  }
};
</script>
<style>
  .dimmed {
    opacity: 0.5;
  }
</style>
