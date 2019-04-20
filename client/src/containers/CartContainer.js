import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartItem from '../components/CartItem';
import { Button, Item, Header, Divider } from 'semantic-ui-react';
import { PlaceOrderRequestAction } from '../redux/actions/ordersActions';

@connect(
	state => ({ 
		cart: state.orders.cart,
		totalPrice: state.orders.totalPrice,
		isPlacingOrder: state.orders.isPlacingOrder
	}),
	{ PlaceOrderRequestAction }
)
export default class CartContainer extends Component {
	static propTypes = {
		cart: PropTypes.object.isRequired,
		totalPrice: PropTypes.number.isRequired,
		isPlacingOrder: PropTypes.bool.isRequired,
		PlaceOrderRequestAction: PropTypes.func.isRequired,
	}
    
	render () {
		const { cart, totalPrice, isPlacingOrder, PlaceOrderRequestAction } = this.props;

		return (
            <Fragment>
				<Item.Group divided>
					{
						Object.values(cart).map(({ _id, name, quantity, totalPrice, image }) => (
							<CartItem
								key={_id}
								id={_id}
								name={name}
								quantity={quantity}
								imgSrc={image.data}
								totalPrice={totalPrice}
							/>
						))
					}
				</Item.Group>
				
				<Divider />

				<Header size='huge' content={`Total Price: $ ${totalPrice}`} />
                <Button 
                    fluid
                    color='teal'
					content='Checkout'
					loading={isPlacingOrder}
					disabled={isPlacingOrder}
                    onClick={() => PlaceOrderRequestAction()}
                />
            </Fragment>
		);
	}
}
