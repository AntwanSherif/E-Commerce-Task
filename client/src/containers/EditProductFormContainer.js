import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Grid, Header, Button, Image } from 'semantic-ui-react';
import { EditProductRequestAction } from '../redux/actions/productsActions';

@connect(
  state => ({
    product: state.products.productToEdit,
    isEditingProduct: state.products.isEditingProduct,
    errors: state.products.errors,
  }),
  { EditProductRequestAction }
)
export default class EditProductFormContainer extends Component {
	static propTypes = {
    product: PropTypes.object.isRequired,
    isEditingProduct: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    EditProductRequestAction: PropTypes.func.isRequired,
  };

	state = {
		name: this.props.product.name,
    quantity: this.props.product.inStockQuantity,
    price: this.props.product.price,
		productImage: this.props.product.image.data
  };
  
  handleChange = (e) => {
    const { name, value } = e.target;
    const priceRegex = /^(?!^0\.00$)(([1-9][\d]{0,6})|([0]))(\.[\d]{1,2})?$/;
    const quantityRegex = /^((?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*)))$/;

    //input validation rules
    if ( value === '' //in case of clearing the input
      || name === 'name'
      || (name === 'price' && priceRegex.test(value))
      || (name === 'quantity' && quantityRegex.test(value))
    ) {
      this.setState({ [name]: value });
    }  }

	handleEditProduct = () => {
    const { product } = this.props;
		const { name, quantity, price } = this.state;

	  const editedProduct = {
      _id: product._id,
      name,
      inStockQuantity: quantity,
      price
    }

    this.props.EditProductRequestAction({ product: editedProduct });
	};

	render () {
    const { isEditingProduct, errors } = this.props;
    const { name, quantity, price, productImage } = this.state;
    const isFormInvalid = !(name && quantity && price && productImage);


		return (
			<Grid padded relaxed>
				<Grid.Row centered>
					<Header size="large" color="teal" content="Edit Product" style={{ marginTop: '1em' }} />
				</Grid.Row>
				<Grid.Row>
					<Grid.Column stretched>
						<Form size="large">
              <Form.Input 
                fluid 
                icon="tag" 
                iconPosition="left" 
                placeholder="Product Name" 
                name='name'
                value={name}
                onChange={this.handleChange}
              />
              <Form.Input 
                fluid 
                icon="cubes" 
                iconPosition="left" 
                placeholder="Quantity" 
                name='quantity'
                value={quantity}
                onChange={this.handleChange}
              />
              <Form.Input 
                fluid 
                icon="dollar" 
                iconPosition="left" 
                placeholder="Price" 
                name='price'
                value={price}
                onChange={this.handleChange}
              />

              <Image
                src={productImage || 'assets/images/default-image.png'}
                bordered
                centered
                size='small'
              />

              <Button 
                color="teal" 
                fluid 
                size="large" 
                style={{ marginTop: 30 }} 
                content="Edit Product" 
                loading={isEditingProduct}
                disabled={isFormInvalid || isEditingProduct}
                onClick={this.handleEditProduct}
              />
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
