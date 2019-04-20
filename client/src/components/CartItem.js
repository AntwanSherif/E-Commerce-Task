import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RemoveFromCartAction } from '../redux/actions/ordersActions';
import { Item, Header, Icon, Button, Label } from 'semantic-ui-react';

@connect(null, { RemoveFromCartAction })
export default class CartItem extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    RemoveFromCartAction: PropTypes.func.isRequired,
  }

  render() {
      const { id, name, quantity, totalPrice, imgSrc, RemoveFromCartAction } = this.props;

      return (
        <Item style={{ height: 350 }}>
            <Item.Image size='medium' bordered src={imgSrc} style={{ height: 300, objectFit: 'cover' }} />

            <Item.Content>
                <Header as="a" size='large' content={name} />
                <Item.Meta>
                    <span>Quantity: {quantity}</span>
                </Item.Meta>
            </Item.Content>

        
            <Header 
                floated='right' 
                color='red'
                content='remove item'
                style={{'cursor': 'pointer'}}
                onClick={() => RemoveFromCartAction(id)}
            />
        
        </Item>
      
    )
  }
}
