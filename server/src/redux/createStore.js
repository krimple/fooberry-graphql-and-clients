console.log('loading new store');
const { createStore, combineReducers, applyMiddleware } = require('redux');
const { createLogger } = require('redux-logger');
const gridReducer = require('./gridReducer').reducer;
const gridActionCreators = require('./gridReducer').actionCreators;
const prettyjson = require('prettyjson');
const { prefs } = require('../prefs');

const loggerConfig = {
  colors: {
    title: false,
    prevState: false,
    action: false,
    nextState: false,
    error: false
  }
};

if (prefs.logPayload) {
  loggerConfig.stateTransformer = (state) => prettyjson.render(state, { noColor: true, inlineArrays: true});
}

const store = createStore(combineReducers({
    grid: gridReducer
  }),
  applyMiddleware(createLogger(loggerConfig)));

module.exports = store;

store.dispatch(gridActionCreators.resetGrid());
