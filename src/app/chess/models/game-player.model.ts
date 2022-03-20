import { PlayerModel } from "src/app/core/models/player.model";

export class GamePlayerModel extends PlayerModel{

    color?: 'white' | 'black'
    leftGame?: boolean
}