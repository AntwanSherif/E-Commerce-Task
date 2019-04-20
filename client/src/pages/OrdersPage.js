import React, { Component } from 'react'
import PropTypes from 'prop-types';
import DocumentTitle from "react-document-title";
import { connect } from 'react-redux';
import OrdersContainer from '../containers/OrdersContainer';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import { FetchUsersOrdersRequestAction } from '../redux/actions/ordersActions';

@connect(
  state => ({ isFetching: state.orders.isFetchingUsersOrders }),
  { FetchUsersOrdersRequestAction }
)
export default class OrdersPage extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    FetchUsersOrdersRequestAction: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.FetchUsersOrdersRequestAction();
  }
  

  render() {
    const { isFetching } = this.props;

    return (
      <DocumentTitle title="Orders">
        <Grid>
          <Grid.Column>
              <Segment style={{minHeight: 600}}>
                {
                  isFetching
                  ? <Loader active content='Loading' />
                  : <OrdersContainer />
                }
              </Segment>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    )
  }
}
