const commands = require('./commands');
const store = require('./redux/createStore');
// TODO - redundant - refactor out into shared with server prefs
const TILE_CHANGES_CHANNEL = 'fooberry-tile-changes';

module.exports = {
  resolvers: {
    Query: {
      hello: (_, {name}) => commands.sayHello(name),
      getGrid: (_) => {
        return store.getState().grid
      },
      tileInfo: (i_, params) => {
        return commands.getTileInfo(params.row, params.col);
      }
    },
    Subscription: {
     tileChanges: {
       subscribe: (parent, args, ctx) => {
         return ctx.pubsub.asyncIterator(TILE_CHANGES_CHANNEL);
       }
     }
    }
  }
};
