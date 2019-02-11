import React from 'react';
import { Link } from 'react-router-dom';

const FifteenHome = () => {
    return(
        <div>
            {/* <h1
                class="page-title player-title"
                *ngIf="player && player._id != '0'">
                Greetings {{ player.name }}
            </h1> */}
            <nav className="nav main-navigation">
                <ul>
                    <li>
                        <Link to="game" className="nav-link">Play</Link>
                    </li>
                    <li>
                        <Link to="top-players" className="nav-link">Records</Link>
                    </li>
                    <li>
                        <Link to="login" className="nav-link">Log in</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default FifteenHome;