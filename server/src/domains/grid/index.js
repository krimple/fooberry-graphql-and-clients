const {prefs} = require('../../prefs');
const grid = require('./generate-grid')(prefs.grid.rows, prefs.grid.cols);

module.exports = {
  getGrid: () => {
    return grid;
  },
  getTileInfo: (row, col) => {
    const locatedRow = grid.rows[row];
    return locatedRow.tiles[col];
  },
  mutateTile: (row, col, tileInfo) => {
    grid.rows[row].tiles[col] = tileInfo;
  }
};