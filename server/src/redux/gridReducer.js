const generateGrid  = require('../domains/grid/generate-grid');

const initialGridData = generateGrid();

const actions = {
  RESET_GRID: 'fooberry/grid/RESET_GRID',
  CHANGE_RANDOM_TILE: 'fooberry/grid/CHANGE_RANDOM_TILE'
};

module.exports = {
  actions: actions,
  actionCreators: {
    resetGrid: () => {
      return {
        type: actions.RESET_GRID
      };
    },
    changeRandomTile: {
      type: actions.CHANGE_RANDOM_TILE
    }
  },
  reducer: function (state = initialGridData, action) {
    switch (action.type) {
    case actions.RESET_GRID:
      return { ...generateGrid() };
    case actions.CHANGE_RANDOM_TILE:
      return changeTile(state);
    default:
      return state;
    }
  },
  resetGrid: () => { return { type: actions.RESET_GRID } },
  changeRandomTile: () => { return { type: actions.CHANGE_RANDOM_TILE } }
};

function changeTile(state) {
  const randomX = Math.floor(Math.random() * numCols);
  const randomY = Math.floor(Math.random() * numRows);
  const randomTileType = Math.floor(Math.random() * 4);

  // create new array from old, mutate new state internally once done
  const newState = [...state];
  newState[randomY][randomX] = new Tile(randomY, randomX, randomTileType);
  return newState;
}


