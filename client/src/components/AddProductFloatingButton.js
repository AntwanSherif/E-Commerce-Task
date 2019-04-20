import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { ShowAddProductModalAction } from '../redux/actions/productsActions';

@connect(state => ({
  isAdmin: state.user.user ? state.user.user.isAdmin : false,
  isAddProductModalVisible: state.products.isAddProductModalVisible
}))
export default class AddProductFloatingButton extends Component {
  showAppProductModal = () => this.props.dispatch(ShowAddProductModalAction());
  
  render() {
    const { isAdmin, isAddProductModalVisible } = this.props;
    if(!isAdmin || isAddProductModalVisible) return null;

    return (
        <Button 
            circular
            icon='plus' 
            color='teal'
            floated='right'
            size='huge'
            style={{ position: 'fixed', bottom: '1.5em', right: '2.5em' }}
            onClick={this.showAppProductModal}
        />
    )
  }
}
