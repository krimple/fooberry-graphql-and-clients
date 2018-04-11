const gridDomain = require('./domains/grid');
const store = require('./redux/createStore');
const {PubSub} = require('graphql-yoga');
const TILE_CHANGES_CHANNEL = 'Tile Changes Channel';
const { generateTileData, randomTileType } = require('./domains/grid/Tile');
const { prefs } = require('./prefs');

module.exports = {
  sayHello: name => `Hello, ${ name || 'World' }`,
  getGrid: () => store.getState().grid,
  getTileInfo: (row, col) => gridDomain.getTileInfo(row, col),
  tileChanges: (parent, args, pubsub) => {
    setInterval(() => {
      const row = Math.floor(Math.random() * prefs.grid.rows);
      const col = Math.floor(Math.random() * prefs.grid.cols);
      const currentTile = gridDomain.getTileInfo(row, col);
      const updatedTile = Object.assign(
        {},
        currentTile,
        { type: randomTileType() }
      );
      gridDomain.mutateTile(row, col, updatedTile);
      return pubsub.publish(TILE_CHANGES_CHANNEL, {tileChanges: updatedTile})
    }, prefs.refreshInterval);
    return pubsub.asyncIterator(TILE_CHANGES_CHANNEL);
  }
};