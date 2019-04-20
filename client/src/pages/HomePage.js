import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import DocumentTitle from "react-document-title";
import { connect } from 'react-redux';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import ProductsContainer from '../containers/ProductsContainer';
import AddProductFloatingButton from '../components/AddProductFloatingButton';
import { GetAllProductsRequestAction } from '../redux/actions/productsActions';

@connect(
  state => ({
    isFetchingProducts: state.products.isFetchingProducts,
    products: state.products.products
  }),
  { GetAllProductsRequestAction }
)
export default class HomePage extends Component {
  static propTypes = {
    isFetchingProducts: PropTypes.bool.isRequired,
    products: PropTypes.array.isRequired,
    GetAllProductsRequestAction: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if(!this.props.products.length) {
      this.props.GetAllProductsRequestAction();
    }
  }
  

  render() {
    const { isFetchingProducts } = this.props;

    return (
      <DocumentTitle title="ITClinic">
        <Grid>
          <Grid.Column>
          {
            isFetchingProducts
            ? (
              <Segment style={{minHeight: 600}}>
                <Loader active content='Loading' />
              </Segment>
            ) 
            : (
              <Fragment>
                <ProductsContainer />
                <AddProductFloatingButton />
              </Fragment>
            ) 
          }
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    )
  }
}
