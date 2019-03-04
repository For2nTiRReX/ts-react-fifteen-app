import React from 'react';
import { Route, Redirect } from 'react-router';
import { FormErrors } from '../form-errors/form-errors.component';
import { PlayerServiceService } from '../../services/player-service.service';
import { Player } from '../../models';
import { userLoggedIn } from '../../actions';
import { connect } from 'react-redux';
import './fifteen-login.scss';

type State = {
    userLogin: string
    formErrors: any,
    userLoginValid: boolean,
    formValid: boolean
}
type formFieldsEnum = 'userLogin';

class FifteenLogin extends React.Component<any, State> {

    playerServiceService: PlayerServiceService;

    constructor(props: any) {
        super(props);
        this.playerServiceService = new PlayerServiceService();
        this.state = {
            userLogin: '',
            userLoginValid: false,
            formValid: false,
            formErrors: { userLogin: '' },
        }
    }


    errorClass(error: string) {
        return (error.length === 0 ? '' : 'has-error');
    }

    handleUserInput(e: any) {
        const name: formFieldsEnum = e.target.name;
        const value: string = e.target.value;
        this.setState(
            { [name]: value },
            () => { this.validateField(name, value) }
        );
    }

    validateField(fieldName: any, value: any) {
        let fieldValidationErrors = this.state.formErrors;
        let userLoginValidLocal = this.state.userLoginValid;
        switch (fieldName) {
            case 'userLogin':
                userLoginValidLocal = (/^[a-zA-Z-\s]+$/i).test(value);
                fieldValidationErrors.userLogin = userLoginValidLocal ? '' : ' is invalid';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            userLoginValid: userLoginValidLocal
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.userLoginValid });
    }

    login = (e: any) => {
        e.preventDefault();
        if (!this.state.formValid) return;
        this.playerServiceService
            .loginUser(this.state.userLogin)
            .subscribe((player : Player) => {
                localStorage.setItem('player', JSON.stringify(player));
                this.props.userLoggedIn(player);
            });
    }

    render() {
        return (
            this.props.reduxState.isAuthenticated ? 
            <Redirect to="/"/> :
            <div>
                <h2 className="page-title">Enter the name</h2>
                <div className="login-form-wrapper">
                    <form onSubmit={this.login}>
                        <div
                            className={`form-group ${() => this.errorClass(this.state.formErrors.email)}`}>
                            <input
                                id="userLogin"
                                type="text"
                                className="form-control"
                                onChange={(event) => this.handleUserInput(event)}
                                name="userLogin"
                                value={this.state.userLogin} />
                        </div>

                        <div className="panel panel-default">
                            <FormErrors formErrors={this.state.formErrors} />
                        </div>

                        <button className="button btn-default" onClick={this.login}>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ( {authentication}: any ) => ({
    reduxState: authentication
})
const mapDispatchToProps = (dispatch: any) => {
    return {
        userLoggedIn: (player: Player) => {
            dispatch(userLoggedIn(player));
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FifteenLogin)