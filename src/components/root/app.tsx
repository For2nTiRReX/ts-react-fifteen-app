import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './../../styles/app.scss';

import FifteenPlayGame from './../game/fifteen-play-game/fifteen-play-game';
import FifteenLogin from './../login/fifteen-login';
import FifteenHome  from './../home/fifteen-home';
import FifteenStatistic from './../../containers/statistic/fifteen-statistic';
import AuthenticatedSequre from '../authenticated-sequre/authenticated-sequre';
import { Player, Points } from '../../models';
import { PlayerServiceService } from '../../services/player-service.service';
import { userLoggedIn } from '../../actions';
import { connect } from 'react-redux';
import { Observable, of } from 'rxjs';


class App extends React.Component<any, any> {
    
    constructor(props: any) {
        super(props);
    }

    checkStoragePlayer(): Observable<any> {
        const playerServiceService = new PlayerServiceService();
        const storagePlayerJson = localStorage.getItem('player'); 
        if (!storagePlayerJson) return of('');
        const player: Player = JSON.parse(storagePlayerJson);
        return playerServiceService.loginUser(player.name);
    }
    
    componentDidMount() { 
        this.checkStoragePlayer().subscribe(
            (player) => {
                if (player) this.props.userLoggedIn(player);
            }
        );
    }

    render () {
        return (
            <div id="app-root-component">
                <Router>
                    <div id="primary-container">
                        <Route path="/" exact component={FifteenHome} />
                        {/* <Route path="/game" exact component={FifteenPlayGame} /> */}
                        <Route path="/login" component={FifteenLogin} />
                        <AuthenticatedSequre path="/game" component={FifteenPlayGame}/>
                        <AuthenticatedSequre path="/top-players" component={FifteenStatistic}/>
                    </div>
                </Router>
            </div>
        )
    }
}




const mapDispatchToProps = (dispatch: any) => {
    return {
        userLoggedIn: (player: Player) => {
            dispatch(userLoggedIn(player));
        }
    }
};
export default connect(null,mapDispatchToProps)(App)