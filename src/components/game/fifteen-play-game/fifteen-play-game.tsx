import React from 'react';
import FifteenTimeCounter from '../fifteen-time-counter/fifteen-time-counter';
import FifteenGameBoard from '../fifteen-game-board/fifteen-game-board';
import { PointsServiceService } from '../../../services/points-service.service';
import { connect } from 'react-redux';
import { RootState, Player } from '../../../models';

type State = {
    movesCounter: number,
    isGameActive: boolean,
}
type Props = {
    reduxState: RootState
}
class FifteenPlayGame extends React.Component<Props, State> {
    
    timerComponent: React.RefObject<FifteenTimeCounter>;
    gameBoardComponent: React.RefObject<FifteenGameBoard>;

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
        if (!this.timerComponent || !this.timerComponent.current || !this.gameBoardComponent || !this.gameBoardComponent.current) return;
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
        if (!this.timerComponent || !this.timerComponent.current) return false;
        this.timerComponent.current.toggleState(this.state.isGameActive);
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
        const pointsServiceService: PointsServiceService = new PointsServiceService();
        const moves = this.state.movesCounter;
        if (!this.timerComponent || !this.timerComponent.current || !this.props.reduxState.player) return;
        const player = this.props.reduxState.player;
        const time = this.timerComponent.current.getTimeSeconds();
        pointsServiceService.getPlayerPoints(player._id).subscribe( (points)=> {
            if (!points) {
                pointsServiceService.setDbResults([pointsServiceService.newPointsFactory(moves,time,player._id)]);
            } else if(pointsServiceService.isPointsHaveToBeUpdated(points, moves, time)) {
                pointsServiceService.setDbResults([{...points, moves: moves, time: time}]);
            }
        });
        // this.modalService.init(FinishGamePopupComponent, {moves: this.movesCounter, time: this.timerComponent.getTimeSeconds()}, {});
    }
    
    render () {
        return(
            <div id="fifteen-play-game-component">
               <h1 className="page-title">Lets The Action Begin!</h1>
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


const mapStateToProps = ( {authentication}: any ) => ({
    reduxState: authentication
})
export default connect(mapStateToProps)(FifteenPlayGame)