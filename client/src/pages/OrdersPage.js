import React, { Component } from 'react'
import { Grid, Segment, Loader } from 'semantic-ui-react';
import OrdersContainer from '../containers/OrdersContainer';

export default class OrdersPage extends Component {
  render() {
    const isFetchingProducts = false;

    return (
      <Grid>
        <Grid.Column>
        {
          isFetchingProducts
          ? (
            <Segment style={{minHeight: 500}}>
              <Loader active content='Loading' />
            </Segment>
          ) 
          : <OrdersContainer />
        }
        </Grid.Column>
      </Grid>
    )
  }
}
