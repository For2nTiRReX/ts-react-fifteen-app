import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './../../styles/app.scss';

import FifteenPlayGame from './../game/fifteen-play-game/fifteen-play-game';
import FifteenLogin from './../login/fifteen-login';
import FifteenHome  from './../home/fifteen-home';
import FifteenStatistic from './../statistic/fifteen-statistic';


const App = () => {
    return (
        <div id="app-root-component">
            <Router>
                <React.Fragment>
                    <Route path="/" exact component={FifteenHome} />
                    <Route path="/game" exact component={FifteenPlayGame} />
                    <Route path="/login" exact component={FifteenLogin} />
                    <Route path="/top-players" exact component={FifteenStatistic} />
                </React.Fragment>
            </Router>
        </div>
    );
};
export default App;