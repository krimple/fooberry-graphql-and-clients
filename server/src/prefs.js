// TODO - refactor into shared module
module.exports = {
  prefs: {
    refreshInterval: 100,
    logPayload: false,
    grid: {
      cols: 25,
      rows: 30
    },
    npcs: {
      maxNpcs: 5,
      spawnRate: 10000
    },
    channels: {
      TILE_CHANGES_CHANNEL: 'fooberry-tile-changes'
    }
  }
};