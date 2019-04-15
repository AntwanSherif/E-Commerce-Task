import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { Button, Form, Message, Segment } from 'semantic-ui-react';
import { registerUserRequestAction, resetAuthErrorsAction } from '../redux/actions/userActions';

@connect(state => ({ 
        isLoading: state.user.isAuthenticating,
        errors: state.user.errors
    }), 
    { registerUserRequestAction, resetAuthErrorsAction }
)
export default class SignupFormContainer extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        errors: PropTypes.any,
        registerUserRequestAction: PropTypes.func.isRequired,
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

    handleSignup = (e) => {
        e.preventDefault();

        if(this.state.username && this.state.password) {
            this.props.registerUserRequestAction(this.state);
        }
    };

	render () {
        const { username, password } = this.state;
        const { isLoading, errors } = this.props;
        const usernameError = errors && errors.username;

		return (
			<Form size="large" onSubmit={this.handleSignup}>
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
                    />

                    <Button 
                        color="teal" 
                        fluid 
                        size="large" 
                        content='Sign Up' 
                        loading={isLoading}
                        disabled={isLoading}
                    />

					<Message>
						Already a user? <Link to="/login">Login</Link>
					</Message>
				</Segment>
			</Form>
		);
	}
}
