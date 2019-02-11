export class Tile {
    constructor(
        public id: number,
        public positionCurrent: number,
        public label: string,
        public positionTop: number,
        public positionLeft: number,
        public isEmpty: boolean
    ) {}

    moveTile( x: number, y: number ) {
        this.positionLeft = this.positionLeft + x;
        this.positionTop = this.positionTop + y;
    }

    isRightPosition() {
        return this.positionCurrent + 1 === +this.label;
    }
}