import { Player } from "./player";

export interface DbDocPlayer extends Player {
    _rev: string;
}
