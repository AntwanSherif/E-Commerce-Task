import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CartContainer from '../containers/CartContainer';
import { Grid, Segment, Header, Button, Icon } from 'semantic-ui-react';

@connect(state => ({ numberOfItems: Object.keys(state.orders.cart).length }))
export default class UserCartPage extends Component {
  static propTypes = {
    numberOfItems: PropTypes.number.isRequired,
  }

  render() {
    const { numberOfItems } = this.props;
    const startShoppingButton = (
      <Fragment>

        <Header icon>
          <Icon name='cart' />
          No products added to cart yet!
        </Header>
        <Button 
          color='teal'
          content='Start Shopping'
          onClick={() => this.props.history.push('/')}
        />
      </Fragment>
    )

    return (
      <Grid>
        <Grid.Column>
            <Segment placeholder={!numberOfItems} textAlign='center' style={getSegmentStyle(numberOfItems)}>
              {
                numberOfItems
                ? <CartContainer />
                : startShoppingButton
              }
            </Segment>
        </Grid.Column>
      </Grid>
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
