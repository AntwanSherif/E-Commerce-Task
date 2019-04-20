import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Table, Header, Segment, Image, Divider } from 'semantic-ui-react';

export default class OrderItem extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    orderDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalPrice: PropTypes.number.isRequired,
  }

  render() {
      const { username, date, orderDetails, totalPrice } = this.props;

      return (
        <Segment color='teal' padded>

          {/* Order summary */}
          <Grid>
            <Grid.Row>
              <Grid.Column width={4} textAlign='left'>
                  <Header content={username} subheader={`${orderDetails.length} items`} />              
              </Grid.Column>
              <Grid.Column width={8} textAlign='center' verticalAlign='middle'>
                <Header size='tiny' color='grey' content={(new Date(date)).toDateString()} />
              </Grid.Column>
              <Grid.Column width={4} textAlign='right' verticalAlign='middle'>
                <Header content={`Total Price: ${totalPrice}`} />
              </Grid.Column>
              
            </Grid.Row>
        <Divider />
          {/* Order Details */}
          <Grid.Row>
          <Grid.Column width={1}></Grid.Column>
          <Grid.Column width={14}>
          <Segment basic>

            <Table basic='very'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={2}></Table.HeaderCell>
                  <Table.HeaderCell width={11}></Table.HeaderCell>
                  <Table.HeaderCell width={3} textAlign='center'>Qunatity</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              {
                orderDetails.map(({ product, quantity }) => (
                  <Table.Row>
                    <Table.Cell>
                      <Image size='tiny' src={product.image.data} />
                    </Table.Cell>
                    <Table.Cell>
                      <Header as="a" size='small' content={product.name} />
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                      <Header size='small' content={quantity} />
                    </Table.Cell>
                  </Table.Row>
                ))
              }
              </Table.Body>
            </Table>
            </Segment>
            </Grid.Column>
            <Grid.Column width={1}></Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
    )
  }
}
