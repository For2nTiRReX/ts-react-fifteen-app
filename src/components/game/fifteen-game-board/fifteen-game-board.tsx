import * as React from 'react';
import { Tile } from './../../../models';

type State = {
    tiles: Tile[] | [],
}
type Props = {
    incrementMoveCounter: any,
    putScore: any,
}

export default class FifteenGameBoard extends React.Component<Props, State> {

    tiles: Array<Tile>;
    emptyTileIndex: number;
    tileWidth: number;
    tileHeight: number;
    tileGap: number;
    containerWidth: number;

    // @Output() incrementMoveCounter = new EventEmitter<String>();
    // @Output() putScore = new EventEmitter<String>();

    constructor(props: any) {
        super(props);
        this.tiles = [];
        this.containerWidth = 300;
        this.tileGap = 6;
        this.tileWidth = this.containerWidth / 4;
        this.tileHeight = this.containerWidth / 4;
        // console.log('FifteenGameBoard constructor --->');
    }

    componentDidMount() {
        //this.initBoard();
    }

    render() {
        return (
            <div id="grid" style={{ width: this.containerWidth + 'px', height: this.containerWidth + 'px' }}>
                {this.buildTiles()}
            </div>
        );
    }

    private buildTiles() {
        return this.tiles.map((tile) => {
            let tileClasses: string = `tile cell`;
            let tileStyles = {
                width: this.tileWidth - this.tileGap + 'px',
                height: this.tileHeight - this.tileGap + 'px',
                left: tile.positionLeft + 'px',
                top: tile.positionTop + 'px',
                marginLeft: this.tileGap / 2 + 'px'
            };
            if (tile.isEmpty === true) {
                tileClasses += ' blank';
            }
            tileClasses += tile.isEmpty === true ? ' blank' : '';
            tileClasses += tile.isRightPosition() ? ' right-position' : '';
            return (
                <div
                    key={tile.id}
                    className={tileClasses}
                    style={tileStyles}
                    onClick={($event) => this.swapElements($event, tile)}
                >
                    {tile.label}
                </div>
            );
        });
    }

    private swapElements(event: any, label: any) {
        let currTileIndex = this.tiles.indexOf(label);
        const curr = Object.assign({}, this.tiles[currTileIndex]);
        const empty = Object.assign({}, this.tiles[this.emptyTileIndex]);
        const positionCurrent = this.tiles[currTileIndex].positionCurrent;
        const positionEmpty = this.tiles[this.emptyTileIndex].positionCurrent;

        if (positionCurrent - 1 === positionEmpty && (positionCurrent % 4) !== 0) {
            // console.log('slideleft');
            this.tiles[currTileIndex].moveTile(-this.tileWidth, 0);
            this.tiles[this.emptyTileIndex].moveTile(this.tileWidth, 0);
        } else if (positionCurrent + 1 === positionEmpty && (positionCurrent % 4) !== 3) {
            // console.log('slideright');
            this.tiles[currTileIndex].moveTile(this.tileWidth, 0);
            this.tiles[this.emptyTileIndex].moveTile(-this.tileWidth, 0);
        } else if (positionCurrent - 4 === positionEmpty) {
            // console.log('slideup');
            this.tiles[currTileIndex].moveTile(0, -this.tileHeight);
            this.tiles[this.emptyTileIndex].moveTile(0, this.tileHeight);
        } else if (positionCurrent + 4 === positionEmpty) {
            // console.log('slidedown');
            this.tiles[currTileIndex].moveTile(0, this.tileHeight);
            this.tiles[this.emptyTileIndex].moveTile(0, -this.tileHeight);
        } else {
            // console.log('You ca\'nt do this move');
            return;
        }


        this.tiles[currTileIndex].positionCurrent = empty.positionCurrent;
        this.tiles[this.emptyTileIndex].positionCurrent = curr.positionCurrent;

        this.tiles.filter((element, index) => {
            if (element.isEmpty) {
                this.emptyTileIndex = index;
                return;
            }
        });
        this.setState({
            tiles: this.tiles
        });
        this.props.incrementMoveCounter();
        this.props.putScore('You win!');
        this.checkWin();
        return;
    }


    private checkWin() {
        for (let i = 0; i <= 14; i++) {
            if (+this.tiles[i].label != this.tiles[i].positionCurrent + 1) {
                return false;
            }
        }
        //this.props.putScore('You win!');
        //  this.pointsServiceService.setNewResult( this.movesCounter, this.timerComponent.getTimeSeconds() );
        return true;
    }


    initBoard = () => {
        let labelsInit: Array<string> = [];
        for (let i = 0; i <= 14; i++) {
            labelsInit[i] = i + 1 + '';
        }
        labelsInit[15] = '';
        let parity = this.shuffle(labelsInit);
        this.emptyTileIndex = labelsInit.indexOf('');
        parity += this.emptyTileIndex + Math.floor(this.emptyTileIndex / 4);

        // Switch labels if necessary to guarantee that a solution exists.
        // See https://en.wikipedia.org/wiki/15_puzzle#Solvability
        if (parity % 2) { this.exchange(labelsInit, 0, 2); }

        let k = 0;
        for (let i = 0; i < labelsInit.length / 4; i++) {
            for (let j = 0; j < labelsInit.length / 4; j++) {
                this.tiles[k] = new Tile(k, k, labelsInit[k], i * this.tileHeight, j * this.tileWidth, labelsInit[k] === '' ? true : false);
                k++;
            }
        }
        this.setState({
            tiles: this.tiles
        });
    }

    // Fisher-Yates shuffle
    private shuffle(a: string[]): number {
        let j, i, swaps: number = 0;
        for (i = a.length; i > 1; i--) {
            j = Math.floor(Math.random() * i);
            if (i - 1 != j) {
                this.exchange(a, i - 1, j);
                swaps++;
            }
        }
        return swaps;
    }

    // Swap entries a[i] and a[j] in the array a.
    private exchange(a: string[], i: number, j: number): void {
        const tmp: string = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
}
