import link from './link-service';
const ICON_LOCATIONS = {
  mountains: {
    icon: './icons/lorc/originals/svg/mountains.svg',
    description: 'Mountains'
  },
  forest: {
    icon: './icons/delapouite/originals/svg/forest.svg',
    description: 'Forest'
  },
  water: {
    icon: './icons/sbed/originals/svg/water-drop.svg',
    description: 'Water'
  },
  valley: {
    icon: './icons/lorc/originals/svg/valley.svg',
    description: 'Valley'
  }
};

export default {
  mapTypeToIconInfo: (type) => {
    return ICON_LOCATIONS[type].icon;
  },
  refreshGrid: () => {
    return link.request({
      query: `
        query {
          getGrid {
            rows {
              tiles {
                location {
                  x 
                  y
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
    });
  },
  tileChanges$: () => {
    return link.request({
      query: `
            subscription {
              tileChanges {
                location {
                  x 
                  y
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
          `
    });
  },
  getTileInfo: (row, col) => {
    return link.request({
      query: `
            query tileInfo($row: Int, $col: Int) {
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
          }`,
      variables: {
        row: 1,
        col: 5
      }
    })
  }
};
