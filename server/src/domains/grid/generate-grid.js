const { prefs } = require('../../prefs');
const Tile = require('./Tile');
const shortid = require('shortid');
const prettyjson = require('prettyjson');

module.exports = function generateGrid() {
  const grid = {
    rows: []
  };

  for (let rowIdx = 0; rowIdx < prefs.grid.rows; rowIdx++) {
    const row = {
      id: shortid.generate(),
      tiles: []
    };
    for (let colIdx = 0;  colIdx < prefs.grid.cols; colIdx++) {
      row.tiles.push(
        {
          id: shortid.generate(),
          location: { col: colIdx, row: rowIdx },
          type: Tile.randomTileType(),
          contents: null
        }
      );
    }
    grid.rows.push(row);
  }

  return grid;
};