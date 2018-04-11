<template>
  <sui-container>
    <h1>Board</h1>
    <button @click="fetchGrid()">Fetch Grid...</button>
    <button @click="subscribeToBoardChanges()">Subscribe...</button>
    <div
      v-for="(row, rowKey) in tiles.rows"
      :key="rowKey"
      class="gameboard-row">
      <span
        v-for="(tile, tileKey) of row.tiles"
        :key="tileKey"
        class="gameboard-tile">
        <Tile :tile="tile"/>
      </span>
    </div>
  </sui-container>
</template>

<script>
  import {Container} from 'semantic-ui-vue';
  import Vue from 'vue';
  import Tile from './Tile.vue';
  import tileService from '../services/tile-services';

  export default {
    components: {
      Container,
      Tile
    },
    data: function () {
      return {
        tiles: [],
        currentTileUpdate: {x: 0, y: 0}
      }
    },
    created: function () {
      this.fetchGrid();
      this.subscribeToBoardChanges();
    },
    methods: {
      fetchGrid: function () {
        const self = this;
        tileService.refreshGrid()
          .subscribe(
            (response) => {
              self.tiles = response.data.getGrid;
            },
            (e) => {
              console.log(`error, ${e}`);
            },
            () => {
              console.log('refresh finished')
            }
          );
      },
      subscribeToBoardChanges: function () {
        const self = this;
        tileService.tileChanges$()
          .subscribe(function (response) {
            const updatedTileInfo = response.data;
            if (self.tiles && self.tiles.rows && self.tiles.rows.length > 0) {
              const {x, y} = updatedTileInfo.tileChanges.location;
              self.$set(self.tiles.rows[y].tiles[x], 'type', updatedTileInfo.tileChanges.type);
            }
          },
          (e) => { console.log(e);});
      }
    }
  };
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
