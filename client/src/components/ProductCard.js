import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Icon, Button, Image } from 'semantic-ui-react';
import { AddProductToCartAction } from '../redux/actions/ordersActions';

@connect(null, { AddProductToCartAction })
export default class ProductCard extends Component {
	static propTypes = {
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		image: PropTypes.object.isRequired,
		isAuthenticated: PropTypes.bool.isRequired,
		isAdmin: PropTypes.bool.isRequired,
		passProductIdToDelete: PropTypes.func.isRequired,
		AddProductToCartAction: PropTypes.func.isRequired, 
	};

	static defaultProps = {
		image: { data: '/assets/images/default-image.png' }
	};

	addToCart = () => {
		const { product, AddProductToCartAction } = this.props;
		AddProductToCartAction(product);
	};

	render () {
		const { _id, name, image, isAuthenticated, isAdmin, passProductIdToDelete } = this.props;

		let actionButtons = null;
		
		if(isAuthenticated && isAdmin) {
			actionButtons = (
				<div className='ui two buttons'>
					<Button
						basic 
						color='red'
						content='Delete'
						onClick={() => passProductIdToDelete(_id)}
					/>
					<Button
						basic 
						color='green'
						content='Edit'
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
			<Card raised style={{ width: 300 }}>
				<Image src={image.data} style={{ height: 300, objectFit: 'cover' }} />
				<Card.Content>
					<Card.Header>{name}</Card.Header>
				</Card.Content>

				{/* Action Buttons */}
				<Card.Content extra>
					{actionButtons}
      			</Card.Content>
			</Card>
		);
	}
}
