module.exports = {
  typeDefs: `
  type Query {
    hello(name: String): String!
    getGrid: Grid!
    tileInfo(row: Int, col: Int): Tile!
  }
  
  type Subscription {
    tileChanges: Tile!
  }
  
  enum GameState {
    NOT_STARTED,
    RUNNING,
    GAME_OVER
  }

  type Game {
    state: GameState!
  }

  type Grid {
    rows: [Row]
  }

  type Row {
    tiles: [Tile]
  }

  type Tile {
    location: Point!
    type: String!
    contents: Character
  }

  type NPC {
    id: ID! @unique
    name: String!
  }
  
  type Player {
    id: ID! @unique
    email: String @unique
    password: String!
    name: String!
  }
  
  union Character = NPC | Player 

  type Point {
    col: Int! 
    row: Int!
  }
`
};