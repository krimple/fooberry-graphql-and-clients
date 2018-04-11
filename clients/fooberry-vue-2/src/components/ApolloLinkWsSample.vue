<template>
  <div class="apollo-example">
    <div class="form">
      <button @click="refreshTiles()">Load tiles!</button>
    </div>
    <div class="form">
      <button @click="getTileInfo()">Get tile info!</button>
    </div>
    <div class="form">
      <button @click="subscribeToTileChanges()">You may fire when ready, Gridley!</button>
    </div>
    <div>
      <h2>Tile Data</h2>
      {{ tileData }}
    </div>
    <div>
      <h2>Grid</h2>
      {{ grid }}
    </div>
  </div>
</template>

<script>
import tileServices from '../services/tile-services';

  export default {
    data() {
      return {
        grid: {
          rows: []
        },
        tileData: { }
      }
    },

    computed: {
      formValid() {
        return false;
      },
    },

    methods: {
      refreshTiles() {
        const self = this;
        const stream = tileServices.refreshGrid();
        stream.subscribe(
          (response) => {
            self.grid = response.data
          },
          (e) => { console.log(e); },
          () => { console.log('grid fetch closed')}
        );
      },
      subscribeToTileChanges() {
        const self = this;
        tileServices.tileChanges$()
        .subscribe(
          (response) => {
            self.tileData = response.data
          },
          (e) => {
            console.log('error!', e);
          },
          () => {
            console.log('closed');
          }
        )
      },
      getTileInfo() {
        const self = this;
        tileServices.getTileInfo(3, 2)
       .subscribe(
          (grid) => {
            console.log('this is', this);
            self.grid = grid
          },
          (e) => { console.log(e); },
          () => { console.log('closed.')}
        );
      }
    }
  }
</script>

<style scoped>
  .form,
  .input,
  .apollo,
  .message {
    padding: 12px;
  }

  .input {
    font-family: inherit;
    font-size: inherit;
    border: solid 2px #ccc;
    border-radius: 3px;
  }

  .error {
    color: red;
  }
</style>
