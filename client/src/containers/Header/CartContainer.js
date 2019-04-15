import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Label, Icon } from 'semantic-ui-react';

@withRouter
@connect(state => ({ numberOfItems: state.orders.cart.length }))
export default class CartContainer extends Component {
    static propTypes = {
        numberOfItems: PropTypes.number.isRequired,
    }

    render() {
        const { numberOfItems } = this.props;

        return (
            <span onClick={() => this.props.history.push('/orders')}>
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