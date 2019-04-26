import React from 'react';
import { connect } from 'react-redux';
import FifteenNavigation from '../navigation/fifteen-navigation';

const FifteenHome = ({reduxState}: any) => {
    return (
        <div>
            { reduxState.isAuthenticated ? 
            (<h1 className="page-title player-title">
                Greetings { reduxState.player.name }
            </h1>)
            : ''
            }
            <FifteenNavigation/>
        </div>
    );
}

const mapStateToProps = ({ authentication }: any) => ({
    reduxState: authentication
})

export default connect(mapStateToProps)(FifteenHome);