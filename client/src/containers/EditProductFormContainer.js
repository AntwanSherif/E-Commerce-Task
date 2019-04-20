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
    isAddingProduct: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    EditProductRequestAction: PropTypes.func.isRequired,
  };

	state = {
		name: this.props.product.name,
		quantity: this.props.product.inStockQuantity,
		productImage: this.props.product.image.data
  };
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

	handleEditProduct = () => {
    const { product } = this.props;
		const { name, quantity } = this.state;

	  const editedProduct = {
      _id: product._id,
      name,
      quantity
    }

    this.props.EditProductRequestAction({ product: editedProduct});
	};

	render () {
    const { isEditingProduct, errors } = this.props;
    const { name, quantity, productImage } = this.state;

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
                disabled={isEditingProduct}
                onClick={this.handleEditProduct}
              />
						</Form>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}
