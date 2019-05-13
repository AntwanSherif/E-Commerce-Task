import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Grid, Header, Button } from 'semantic-ui-react';
import ImageUpload from '../components/ImageUpload';
import { AddProductRequestAction } from '../redux/actions/productsActions';

@connect(
  state => ({
    isAddingProduct: state.products.isAddingProduct,
    errors: state.products.errors,
  }),
  { AddProductRequestAction }
)
export default class AddProductFormContainer extends Component {
  static propTypes = {
    isAddingProduct: PropTypes.bool.isRequired,
    errors: PropTypes.object,
    AddProductRequestAction: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    quantity: '',
    productImage: '',
    price: ''
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
    }

  }

  getUploadedImageData = (productImage) => this.setState({ productImage });

  handleAddProduct = () => {
    const { name, quantity, productImage, price } = this.state;

    let formObj = new FormData();
    formObj.append('productImage', productImage);
    formObj.append('name', name);
    formObj.append('quantity', quantity);
    formObj.append('price', price);

    this.props.AddProductRequestAction(formObj);
  };

  render() {
    const { isAddingProduct, errors } = this.props;
    const { name, quantity, price, productImage } = this.state;
    const isFormInvalid = !(name && quantity && price && productImage);

    return (
      <Grid padded relaxed>
        <Grid.Row centered>
          <Header size="large" color="teal" content="Add Product" style={{ marginTop: '1em' }} />
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

              <ImageUpload passUploadedImageData={this.getUploadedImageData} />

              <Button
                color="teal"
                fluid
                size="large"
                style={{ marginTop: 30 }}
                content="Add Product"
                loading={isAddingProduct}
                disabled={isFormInvalid || isAddingProduct}
                onClick={this.handleAddProduct}
              />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
