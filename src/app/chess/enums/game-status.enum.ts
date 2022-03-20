export enum GameStatus {
  pending = 0, // waiting players to join
  toss = 1, // deciding which one is black
  started = 2, // game started
  checkMate = 3, // game has completed
  draw = 4, // game has completed
  rematchRequest = 5, // one or more players left the game
  swapColors = 6,
  rematchStart = 7,
  abounded = 8 // one or more players left the game
}
