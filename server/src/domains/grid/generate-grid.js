const { prefs } = require('../../prefs');
const Tile = require('./Tile');
const shortid = require('shortid');
const prettyjson = require('prettyjson');

module.exports = function generateGrid() {
  const grid = {
    rows: []
  };

  for (let y = 0; y < prefs.grid.rows; y++) {
    const row = {
      id: shortid.generate(),
      tiles: []
    };
    for (let x = 0; x < prefs.grid.cols; x++) {
      row.tiles.push(
        {
          id: shortid.generate(),
          location: { x: x, y: y },
          type: Tile.randomTileType(),
          contents: null
        }
      );
    }
    grid.rows.push(row);
  }

  return grid;
};