<template>
  <sui-container>
    <h1>Board</h1>
    <button @click="fetchGrid()">Fetch Grid...</button>
    <button @click="subscribeToBoardChanges()">Subscribe...</button>
    <div
      v-for="(row, rowKey) in grid.rows"
      :key="rowKey"
      class="gameboard-row">
      <span
        v-for="(col, colKey) of row.tiles"
        :key="colKey"
        class="gameboard-tile">
        <Tile
          :row ="rowKey"
          :col="colKey" />
      </span>
    </div>
  </sui-container>
</template>

<script>
  import {Container} from 'semantic-ui-vue';
  import Tile from './Tile.vue';
  import { mapState } from 'vuex';

  export default {
    components: {
      Container,
      Tile
    },
    data: function () {
      return {
        currentTileUpdate: {col: 0, row: 0}
      }
    },
    computed: mapState({
      grid: state => state.grid
    }),
    created: function () {
      this.fetchGrid();
      this.subscribeToBoardChanges();
    },
    methods: {
      fetchGrid: function () {
        this.$store.dispatch('loadGrid') ;
      },
      subscribeToBoardChanges: function () {
        this.$store.dispatch('watchForTileChanges');
      }
    }
  };


  // Hold in case I ever need to do this without Vuex again...
  // self.$set(self.tiles.rows[y].tiles[x], 'type', updatedTileInfo.tileChanges.type);
</script>

<style scoped>
  .gameboard-row, .gameboard-tile {
    padding: 0;
    margin: 0;
  }

  img.icon {
    width: 45px;
    height: 40px;
    min-height: 40px;
    padding: 1px;
    margin: 0;
  }
</style>

