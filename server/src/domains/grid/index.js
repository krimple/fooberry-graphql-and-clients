const {prefs} = require('../../prefs');
const grid = require('./generate-grid')(prefs.grid.rows, prefs.grid.cols);

module.exports = {
  getGrid: () => {
    console.log(arguments);
    return grid;
  },
  getTileInfo: (row, col) => {
    const locatedRow = grid.rows[row];
    console.log(`received col data: ${JSON.stringify(locatedRow.tiles[col])}`);
    return locatedRow.tiles[col];
  },
  mutateTile: (row, col, tileInfo) => {
    grid.rows[row].tiles[col] = tileInfo;
  }
};