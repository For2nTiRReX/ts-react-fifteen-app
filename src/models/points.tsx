import { Player } from './index';

export class Points {
    constructor(
        public _id: string,
        public moves: number,
        public time: number,
        public player_id: string,
        public player?: Player
    ) {}
}
