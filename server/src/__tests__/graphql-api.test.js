const { prefs } = require('../prefs');

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
       query getGrid {
        getGrid {
            rows {
              cols {
                location {
                  x y
                }
                tile {
                  terrain {
                    icon
                    description
                  }
                  revealed
                }
              }
            }
          }
        }
     `
   }))
   .then(res => {
     const grid = res.data.getGrid;
     expect(res.status).toBe(200);
     expect(grid.rows.length).toEqual(prefs.grid.rows);
     expect(grid.rows[0].cols.length).toEqual(prefs.grid.cols);
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
            x
            y
          }
          tile {
            terrain {
              icon
              description
            }
          }
        }
      }
      `,
      variables: {
        row: 1,
        col: 5
      }
    }))
    .then(res => {
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