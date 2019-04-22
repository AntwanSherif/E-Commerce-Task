import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Icon, Button, Image, Header } from 'semantic-ui-react';
import { toast } from 'react-semantic-toasts';
import { AddToCartAction, ShowInsufficientStockQuantityWarningAction } from '../redux/actions/ordersActions';
import { ShowEditProductModalAction } from '../redux/actions/productsActions';

@connect(
	state => ({ cart: state.orders.cart })
	, { ShowEditProductModalAction, AddToCartAction, ShowInsufficientStockQuantityWarningAction }
)
export default class ProductCard extends Component {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.object.isRequired,
		cart: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
		isAdmin: PropTypes.bool.isRequired,
		passProductIdToDelete: PropTypes.func.isRequired,
		AddToCartAction: PropTypes.func.isRequired, 
		ShowInsufficientStockQuantityWarningAction: PropTypes.func.isRequired,
		ShowEditProductModalAction: PropTypes.func.isRequired,
	};

	static defaultProps = {
		image: { data: '/assets/images/default-image.png' }
	};

	addToCart = () => {
		const { product, cart, AddToCartAction, ShowInsufficientStockQuantityWarningAction } = this.props;
		const { _id, inStockQuantity } = product;

		//Check if we didn't exceed in-stock quantity
		if(!cart[_id] || cart[_id].quantity < inStockQuantity) {
			AddToCartAction(product);

			toast({
				type: 'success',
				description: 'Product added to cart!',
				animation: 'bounce',
				time: 3000,
			});

		} else {
			//Show warning message
			// ShowInsufficientStockQuantityWarningAction();

			toast({
				type: 'warning',
				icon: 'exclamation triangle',
				title: 'Warning',
				description: 'Quantity exceeded in-stock quantity.',
				animation: 'bounce',
				time: 3000,
			});
		}
	};

	render () {
		const { product, _id, name, price, image, isAuthenticated, isAdmin, 
			passProductIdToDelete, ShowEditProductModalAction } = this.props;

		let actionButtons = null;
		
		if(isAuthenticated && isAdmin) {
			actionButtons = (
				<div className='ui two buttons'>
					<Button
						basic 
						color='green'
						content='Edit'
						onClick={() => ShowEditProductModalAction(product)}
					/>
					<Button
						basic 
						color='red'
						content='Delete'
						onClick={() => passProductIdToDelete(_id)}
					/>
				</div>
			);
		} else if (isAuthenticated) {
			actionButtons = (
				<Button
					animated='vertical'
					fluid
					color='teal' 
					onClick={this.addToCart}
				>
					<Button.Content visible>Add to Cart</Button.Content>
					<Button.Content hidden>
				  		<Icon name='shop' />
					</Button.Content>
				</Button>
			)
		}

		return (
			<Card raised style={{ width: 300, cursor: 'pointer' }}>
				<Image src={image.data} style={{ height: 300, objectFit: 'cover' }} />
				<Card.Content>
					<Header floated='left' content={name} />
					<Header floated='right' content={`$ ${price}`} />
				</Card.Content>

				{/* Action Buttons */}
				{
					isAuthenticated
					? (
						<Card.Content extra>
							{actionButtons}
      					</Card.Content>
					) : null
				}
				
			</Card>
		);
	}
}
