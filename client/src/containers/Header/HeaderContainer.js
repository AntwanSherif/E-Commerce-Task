import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Grid, Menu, Icon, Header, Image, Container } from 'semantic-ui-react';
import { logoutUserAction } from '../../redux/actions/userActions';
import CartIconContainer from './CartIconContainer';
import AllUsersOrdersContainer from './AllUsersOrdersContainer';

@withRouter
@connect(
	state => ({
		isAuthenticated: state.user.isAuthenticated,
		username: state.user.user ? state.user.user.username : '',
		isAdmin: state.user.user ? state.user.user.isAdmin : false,
	}), 
	{ logoutUserAction }
)
export default class HeaderContainer extends Component {
	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		username: PropTypes.string.isRequired,
		isAdmin: PropTypes.bool.isRequired,
		logoutUserAction: PropTypes.func.isRequired
	}

	gotoLoginPage = () => this.props.history.push('/login');
	gotoSignupPage = () => this.props.history.push('/signup');

	render () {
		const { isAuthenticated, isAdmin, username } = this.props;

		let authenticatedUserButtons = (
			<Menu.Menu position='right'>
				<Menu.Item style={{ paddingRight: 0 }}>
					<Icon size="large" name="user circle outline" />
					<Header
						size="tiny"
						content={username}
						inverted
						style={{ marginRight: '1.2em', marginTop: 12 }}
					/>
					<Header 
						size="tiny" 
						content="Logout" 
						inverted
						style={{ marginTop: -2, cursor: 'pointer' }}
						onClick={() => this.props.logoutUserAction()}
					/>
				</Menu.Item>
			</Menu.Menu>
		);

		let nonAuthenticatedUserButtons = (
			<Menu.Menu position='right'>
				<Menu.Item style={{ paddingRight: 0 }}>
					<Header
						size="tiny"
						content="Log in"
						inverted
						style={{ marginRight: '1.2em', marginTop: 12, cursor: 'pointer' }}
						onClick={this.gotoLoginPage}
					/>
					<Header 
						size="tiny" 
						content="Signup" 
						inverted
						style={{ marginTop: -2, cursor: 'pointer' }}
						onClick={this.gotoSignupPage}
					/>
				</Menu.Item>
			</Menu.Menu>
		);


		return (
			<Grid.Column>
				<Grid.Row>
					<Menu
						size="large"
						borderless
						fixed='top' inverted
						style={{ border: 'none', boxShadow: 'none' }}
					>
						<Container>
							{/*Logo*/}
							<Link to='/' name='Home'>
								<Image size='tiny' src='/assets/images/logo.png' />
							</Link>

							{isAuthenticated && !isAdmin && (
								<Menu.Item position="right">
                            		<CartIconContainer />
								</Menu.Item>
							)}
							
							{isAdmin && (
								<Menu.Item position='right'>
									<AllUsersOrdersContainer />
								</Menu.Item>
							)}

							{/* render user/authentication buttons */}
							{
								isAuthenticated
								? authenticatedUserButtons
								: nonAuthenticatedUserButtons
							}
						</Container>
					</Menu>
				</Grid.Row>
			</Grid.Column>
		);
	}
}
