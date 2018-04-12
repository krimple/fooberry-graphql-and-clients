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
  emitTileChanges: (parent, args, pubsub) => {
    return pubsub.asyncIterator(TILE_CHANGES_CHANNEL);
  }
};