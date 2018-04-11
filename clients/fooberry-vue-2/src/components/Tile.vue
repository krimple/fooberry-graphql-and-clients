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
    console.log(`incoming tile prop ${JSON.stringify(this.tile)}`);
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
    tile: function () {
      console.log(`recalculating tile...`);
      this.icon = tileServices.mapTypeToIconInfo(this.tile.type)
    },
  }
};
</script>
<style>
  .dimmed {
    opacity: 0.5;
  }
</style>
