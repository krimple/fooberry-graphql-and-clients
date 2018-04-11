const TERRAIN_MOUNTAINS = {
  type: 'mountains',
  description: 'Mountains'
};

const TERRAIN_PLAINS = {
  type: 'forest',
  description: 'Forest'
};

const TERRAIN_WATER = {
  type: 'water',
  description: 'Water'
};

const TERRAIN_VALLEY = {
  type: 'valley',
  description: 'Valley'
};

const TERRAIN_ENUM = [
  TERRAIN_MOUNTAINS,
  TERRAIN_PLAINS,
  TERRAIN_WATER,
  TERRAIN_VALLEY
];

module.exports = {
  randomTileType: () => {
      return TERRAIN_ENUM[Math.floor(Math.random() * 4)].type
  },

  // TODO - eliminate, maybe not needed
  nearby(targetX, targetY, pointX, pointY) {
    if (Math.abs(targetX - pointX) < 2 &&
      Math.abs(targetY - pointY) < 2) {
      return true;
    } else {
      return false;
    }
  },

  display(location) {
    if (location.contents) {
      return location.contents.display();
    } else {
      return location.terrain.icon;
    }
  },

  describe(location) {
    return location.terrain.description;
  }
};
