import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { HideAddProductModalAction } from '../redux/actions/productsActions';
import AddProductFormContainer from './AddProductFormContainer';


@connect(state => ({
  isOpen: state.products.isAddProductModalVisible,
}))
export default class AddProductModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
  }
  hideModal = () => this.props.dispatch(HideAddProductModalAction());

  render() {
    const { isOpen } = this.props;

    return (
      <Modal
        size='small'
        open={isOpen} 
        onClose={this.hideModal}
        closeIcon={true}
        closeOnDimmerClick={false}
      >
        <AddProductFormContainer />
      </Modal>
    )
  }
}
