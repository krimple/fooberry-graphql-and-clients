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
      console.log(`Changing ${row}, ${col}`);
      const currentTile = gridDomain.getTileInfo(row, col);
      console.log(`Current Tile ${row}, ${col} is ${JSON.stringify(currentTile)}`);
      const updatedTile = Object.assign(
        {},
        currentTile,
        { type: randomTileType() }
      );
      gridDomain.mutateTile(row, col, updatedTile);
      console.log(`Tile changing: ${JSON.stringify(updatedTile)}`);
      return pubsub.publish(TILE_CHANGES_CHANNEL, {tileChanges: updatedTile})
    }, 1000);
    return pubsub.asyncIterator(TILE_CHANGES_CHANNEL);
  }
};