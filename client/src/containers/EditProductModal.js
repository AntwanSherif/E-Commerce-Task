import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'semantic-ui-react';
import { HideEditProductModalAction } from '../redux/actions/productsActions';
import EditProductFormContainer from './EditProductFormContainer';


@connect(
    state => ({ isOpen: state.products.isEditProductModalVisible }),
    { HideEditProductModalAction }
)
export default class EditProductModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    HideEditProductModalAction: PropTypes.func.isRequired,
  }

  hideModal = () => this.props.HideEditProductModalAction();

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
        <EditProductFormContainer />
      </Modal>
    )
  }
}