const {prefs} = require('../prefs');

const {tester} = require('graphql-tester');
describe('GraphQL API', function () {
  const self = this;
  beforeAll(() => {
    self.test = tester({
      url: `http://127.0.0.1:4000/`,
      contentType: 'application/json'
    });
  });

  it('should access entire grid with query to getGrid', done => {
    self.test(JSON.stringify({
      query: `
       query {
         getGrid {
           rows {
             tiles {
               location {
                 row col 
               }
               type  
               contents {
                 ...on NPC {
                   id
                   name
                 }
                 ...on Player {
                   id
                   email
                   name   
                 }           
               }   
             }
           }
         }
       }
     `
    }))
      .then(res => {
        debugger;
        const grid = res.data.getGrid;
        expect(res.status).toBe(200);
        expect(grid.rows.length).toEqual(prefs.grid.rows);
        expect(grid.rows[0].tiles.length).toEqual(prefs.grid.cols);
        done();
      })
      .catch(e => {
        done.fail(JSON.stringify(e));
      });
  });

  it('should access individual grid cell data with query to tileInfo', done => {
    self.test(JSON.stringify({
      query: `query tileInfo($row: Int, $col: Int) {
        tileInfo(row: $row, col: $col) {
            location {
              row
              col
            }
           type 
        }
      }
      `,
      variables: {
        row: 1,
        col: 5
      }
    }))
      .then(res => {
        debugger;
        if (res.status !== 200) {
          console.log(JSON.stringify(res));
        }
        expect(res.data).toBeDefined();
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      })
      .catch(err => {
        console.log(err);
        done.fail(err);
      })
  });
});