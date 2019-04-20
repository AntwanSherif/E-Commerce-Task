import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Label, Icon } from 'semantic-ui-react';


const getNumberOfItemsInCart = (cart) => {
    if(Object.keys(cart).length) {
        return Object.values(cart).reduce((acc, item) => acc + item.quantity, 0)
    } else {
        return 0;
    }
}


@withRouter
@connect(state => ({ numberOfItems: getNumberOfItemsInCart(state.orders.cart) }))
export default class CartIconContainer extends Component {
    static propTypes = {
        numberOfItems: PropTypes.number.isRequired,
    }

    render() {
        const { numberOfItems } = this.props;

        return (
            <span onClick={() => this.props.history.push('/cart')}>
                <Icon size='large' name='shopping cart' style={{ marginTop: -5, cursor: 'pointer' }}/>
                {
                    numberOfItems 
                    ? (
                        <Label 
                            circular
                            size='mini' 
                            color='red' 
                            floating 
                            style={{top: '1.4em', left:'74%', cursor: 'pointer'}} 
                            content={numberOfItems}
                        />
                    ) 
                    : null
                }
            </span>
        );
    }
}