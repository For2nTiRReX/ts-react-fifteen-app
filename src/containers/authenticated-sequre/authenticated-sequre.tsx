import React from 'react'
import {
    Route,
    Redirect,
    withRouter
} from 'react-router-dom'
import { connect } from 'react-redux';

const AuthenticatedSequre = ({ component: Component, reduxState, ...rest }: any) => {
    return <Route {...rest} render={(props) => {
        return reduxState.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        }
    } />
}

const mapStateToProps = ({ authentication }: any) => ({
    reduxState: authentication
})

// export default connect(mapStateToProps)(AuthenticatedSequre)
//@ts-ignore
export default withRouter(connect(mapStateToProps)(AuthenticatedSequre))
