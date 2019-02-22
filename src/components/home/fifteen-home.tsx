import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const FifteenHome = ({reduxState}: any) => {
    return (
        <div>
            { reduxState.isAuthenticated ? 
            (<h1 className="page-title player-title">
                Greetings { reduxState.player.name }
            </h1>)
            : ''
            }
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

const mapStateToProps = ({ authentication }: any) => ({
    reduxState: authentication
})

export default connect(mapStateToProps)(FifteenHome);