import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OrderItem from '../components/OrderItem';
import { Header, Icon, Segment } from 'semantic-ui-react';

@connect(state => ({ orders: state.orders.allUsersOrders }))
export default class OrdersContainer extends Component {
	static propTypes = {
		orders: PropTypes.arrayOf(PropTypes.object).isRequired
	}
    
	render () {
		const { orders } = this.props;

		return (
			orders.length
			? (
				orders.map(({ _id, user, date, orderDetails, totalPrice }) => (
					<OrderItem
						key={_id}
						username={user.username}
						orderDetails={orderDetails}
						totalPrice={totalPrice}
						date={date}
					/>
				))
			)
			: (
				<Segment placeholder>
					<Header icon>
						<Icon name='cart' />
						No orders were placed yet.
					</Header>
				</Segment>
			)
		);
	}
}
