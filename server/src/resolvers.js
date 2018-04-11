const commands = require('./commands');
const store = require('./redux/createStore');

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
       // transforming the payload to something smaller, more manageable!
      /*resolve: (payload) => {
         return grid.rows.map((row) => {
            return rows.map((cols) => {

            })
         });

             x: payload.data.location.x,
               y: payload.data.location.y
           }
         }
       },*/
       subscribe: async (parent, args, ctx) => {
         return commands.tileChanges(parent, args, ctx.pubsub);
       }
     }
    }
  }
};
