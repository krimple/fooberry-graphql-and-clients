<template>
  <img
    :class="{ icon: true, dimmed: noPlayer }"
    :src="icon || ''">
</template>
<script>
  import {mapState} from 'vuex';
  import tileServices from '../services/tile-services';

  export default {

    props: {
      row: {
        type: Number,
        required: true
      },
      col: {
        type: Number,
        required: true
      }
    },
    computed: {
      ...mapState({
        // AVOID arrow functions here!!!
        icon: function(state) {
          const type = state.grid.rows[this.row].tiles[this.col].type;
          return type ? tileServices.mapTypeToIconInfo(type) : '';
        }
      }),
      noPlayer: function () {
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
