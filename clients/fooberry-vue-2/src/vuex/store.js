import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import tileServices from '../services/tile-services';


export default function() {
  return new Vuex.Store({
    state: {
      grid: []
    },
    mutations: {
      setGridData(state, gridData) {
        console.log(`mutation: ${JSON.stringify(gridData)}`);
        state.grid = gridData;
      },
      updateGridCell(state, {col, row, cellData}) {
        state.grid.rows[row].tiles[col] = cellData;
        // hackity hack to trigger mapState change in tile - replace container object
        state.grid = { ...state.grid };
      }
    },
    actions: {
      loadGrid() {
        tileServices.refreshGrid()
          .subscribe(
            (response) => {
              const gridData = response.data.getGrid;
              console.log(`fetched data. ${JSON.stringify(response.data)}`);
              this.commit('setGridData', gridData);
            },
            (e) => {
              console.log(`error, ${e}`);
            },
            () => {
              console.log('refresh finished')
            }
          );
      },
      watchForTileChanges() {
        tileServices.tileChanges$()
          .subscribe(response => {
              const updatedTileInfo = response.data;
              console.log(`Incoming tile change, ${JSON.stringify(response)}`);
              if (this.state.grid &&
                  this.state.grid.rows &&
                  this.state.grid.rows.length > 0) {
                const {col, row} = updatedTileInfo.tileChanges.location;
                this.commit('updateGridCell', {col: col, row: row, cellData: updatedTileInfo.tileChanges});
              }
            },
            (e) => {
              console.log(e);
            });
      }
    },
    plugins: [createLogger()]
  });
}
