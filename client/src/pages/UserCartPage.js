import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DocumentTitle from "react-document-title";
import { connect } from 'react-redux';
import CartContainer from '../containers/CartContainer';
import { Grid, Segment, Header, Button, Icon } from 'semantic-ui-react';
import { ResetPlaceOrderFlagsAction } from '../redux/actions/ordersActions';

@connect(
  state => ({ 
    numberOfItems: Object.keys(state.orders.cart).length,
    isOrderPlacedSuccessfully: state.orders.isOrderPlacedSuccessfully
  }),
  { ResetPlaceOrderFlagsAction }
)
export default class UserCartPage extends Component {
  static propTypes = {
    numberOfItems: PropTypes.number.isRequired,
    isOrderPlacedSuccessfully: PropTypes.bool.isRequired,
    ResetPlaceOrderFlagsAction: PropTypes.func.isRequired
  }

  componentWillUnmount() {
    this.props.ResetPlaceOrderFlagsAction();
  }
  

  render() {
    const { numberOfItems, isOrderPlacedSuccessfully } = this.props;
    
    const startShoppingButton = (
      <>
        <Header icon style={{ marginBottom: 40 }}>
          <Icon name='cart' />
          No products added to cart yet!
        </Header>
        <Button 
          color='teal'
          content='Start Shopping'
          onClick={() => this.props.history.push('/')}
        />
      </>
    );

    const orderPlacedSuccessfully = (
      <>
        <Header icon style={{ marginBottom: 40 }}>
          <Icon name='shipping fast' />
          Hooray! Your order is placed successfully :)
        </Header>
        <Button 
          color='teal'
          content='Back to Products'
          onClick={() => this.props.history.push('/')}
        />
      </>
    );

    return (
      <DocumentTitle title="Cart">
        <Grid>
          <Grid.Column>
              <Segment placeholder={!numberOfItems} textAlign='center' style={getSegmentStyle(numberOfItems)}>
                {
                  numberOfItems
                  ? <CartContainer />
                  : isOrderPlacedSuccessfully 
                  ? orderPlacedSuccessfully 
                  : startShoppingButton
                }
              </Segment>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    )
  }
}

const getSegmentStyle = numberOfItems => ({
  minHeight: 600, 
  display: 'flex',
  flexDirection: 'column',
  justifyContent: numberOfItems ? 'space-evenly' : 'center',
  alignItems: numberOfItems ? null : 'center'
})
