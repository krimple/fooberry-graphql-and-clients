const gridDomain = require('./index');
const randomTileType = require('./Tile').randomTileType;
const prefs = require('../../prefs').prefs;
const TILE_CHANGES_CHANNEL = prefs.channels.TILE_CHANGES_CHANNEL;
const refreshInterval = prefs.refreshInterval;

module.exports = class TileChangerDaemon {
  constructor (pubsub) {
    this.pubsub = pubsub;
  }

  start() {
  // stop it if it's already running
    this.stop();
    this.timer = setInterval(() => {
      console.log("tick...", Date.now());
      const row = Math.floor(Math.random() * prefs.grid.rows);
      const col = Math.floor(Math.random() * prefs.grid.cols);
      const currentTile = gridDomain.getTileInfo(row, col);
      const updatedTile = {
        ...currentTile,
        type: randomTileType()
      };
      gridDomain.mutateTile(row, col, updatedTile);
      return this.pubsub.publish(TILE_CHANGES_CHANNEL, {tileChanges: updatedTile})
    }, prefs.refreshInterval);
  }

// stop process - find property timer, clear and delete if there
  stop () {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
};

