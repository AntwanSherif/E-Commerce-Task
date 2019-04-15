import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { loginUserRequestAction, resetAuthErrorsAction } from '../redux/actions/userActions';

@connect(
    state => ({ 
        isLoading: state.user.isAuthenticating,
        errors: state.user.errors
    }), 
    { loginUserRequestAction, resetAuthErrorsAction }
)
export default class LoginFormContainer extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        errors: PropTypes.any,
        loginUserRequestAction: PropTypes.func.isRequired,
        resetAuthErrorsAction: PropTypes.func.isRequired
    }

    state = { username: '', password: '' }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
        //reset validation errors if any
        const { errors, resetAuthErrorsAction } = this.props;
        if(errors) resetAuthErrorsAction();
    }

    handleLogin = (e) => {
        e.preventDefault();

        if(this.state.username && this.state.password) {
            this.props.loginUserRequestAction(this.state);
        }
    };

	render () {
        const { username, password } = this.state;
        const { isLoading, errors } = this.props;
        const usernameError = errors && errors.username;
        const passwordError = errors && errors.password;

		return (
			<Form size="large" onSubmit={this.handleLogin}>
				<Segment>
                    <Form.Input 
                        fluid 
                        icon="user" 
                        iconPosition="left" 
                        placeholder="Username"
                        name='username'
                        value={username}
                        onChange={this.handleChange}
                        error={!!usernameError}
                    />
                    {!!usernameError && <label className='error'>{usernameError}</label>}

                    <Form.Input 
                        fluid 
                        icon="lock" 
                        iconPosition="left" 
                        placeholder="Password" 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        error={!!passwordError}
                    />
                    {!!passwordError && <label className='error'>{passwordError}</label>}

					<Button 
                        color="teal" 
                        fluid 
                        size="large" 
                        content='Login' 
                        loading={isLoading}
                        disabled={isLoading}
                    />
                    <Message>
                      New to us? <Link to='/signup'>Sign Up</Link>
                    </Message>
				</Segment>
			</Form>
		);
	}
}
