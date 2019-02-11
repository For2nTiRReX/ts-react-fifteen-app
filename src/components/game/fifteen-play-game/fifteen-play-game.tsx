import React from 'react';
import FifteenTimeCounter from '../fifteen-time-counter/fifteen-time-counter';
import FifteenGameBoard from '../fifteen-game-board/fifteen-game-board';

type State = {
    movesCounter: number,
    isGameActive: boolean
}
export default class FifteenPlayGame extends React.Component<{}, State> {
    
    timerComponent: any;
    gameBoardComponent: any;

    constructor(props: any) {
        super(props);
        this.timerComponent = React.createRef();
        this.gameBoardComponent = React.createRef();
        this.state = {
            movesCounter: 0,
            isGameActive: false
        }
    }

    componentDidMount() {
        this.newGame();
    }
    
    newGame = (): void => {
        this.setState({
            movesCounter: 0,
            isGameActive: true
        });
        this.timerComponent.current.reset();
        this.timerComponent.current.start();
        this.gameBoardComponent.current.initBoard();
    }

    toggleActiveGame = (): boolean => {
        this.setState( state => {
            return {
                isGameActive: !state.isGameActive
            }
        });
        this.timerComponent.toggleState(this.state.isGameActive);
        return this.state.isGameActive;
    }

    incrementMoveCounter = (event: any) => { 
        this.setState( state => {
            return {
                movesCounter: state.movesCounter + 1,
            }
        });
    }

    setPlayerResult = ($event: any) => {
        console.log(event);
        // this.pointsServiceService.setNewResult(this.movesCounter, this.timerComponent.getTimeSeconds());
        // this.modalService.init(FinishGamePopupComponent, {moves: this.movesCounter, time: this.timerComponent.getTimeSeconds()}, {});
    }
    
    render () {
        return(
            <div id="fifteen-play-game-component">
               <h1 className="page-title" onClick={($event: any) => this.setPlayerResult($event)} >Lets The Action Begin!</h1>
                <div className="play-component-meta row align-items-center">
                    <div className="col-md-6 moves-counter">
                        {this.state.movesCounter}
                    </div>
                    <div className="col-md-6 time-counter">
                        <FifteenTimeCounter ref={this.timerComponent}/>
                    </div>
                </div>
                <FifteenGameBoard ref={this.gameBoardComponent} incrementMoveCounter={this.incrementMoveCounter} putScore={($event: any) => this.setPlayerResult($event)}/>
                 {/* <fifteen-game-board (incrementMoveCounter)="incrementMoveCounter($event)" (putScore)="setPlayerResult($event)"></fifteen-game-board>   */}
                <button className="button" id="pause" onClick={this.toggleActiveGame}>{this.state.isGameActive ? 'Pause' : 'Continue'}</button>
                <button className="button" id="new_game" onClick={this.newGame}>New game</button>
            </div>
        );
    }
    
}
