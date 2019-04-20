import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Card, Modal, Button } from 'semantic-ui-react';
import ProductCard from '../components/ProductCard';
import { ShowDeleteProductConfirmationAction, HideDeleteProductConfirmationAction, DeleteProductRequestAction } from '../redux/actions/productsActions';

@connect(
    state => ({
        products: state.products.products,
        isAuthenticated: state.user.isAuthenticated,
        isAdmin: state.user.user ? state.user.user.isAdmin : false,
        isDeleteProductConfirmationVisible: state.products.isDeleteProductConfirmationVisible
    }),
    { ShowDeleteProductConfirmationAction, HideDeleteProductConfirmationAction, DeleteProductRequestAction }
)
export default class ProductsContainer extends Component {
    static propTypes = {
        products: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
        isAdmin: PropTypes.bool.isRequired,
        isDeleteProductConfirmationVisible: PropTypes.bool.isRequired,
        ShowDeleteProductConfirmationAction: PropTypes.func.isRequired,
        HideDeleteProductConfirmationAction: PropTypes.func.isRequired,
        DeleteProductRequestAction: PropTypes.func.isRequired,
    }

    state = { productIdToDelete: '' }

    getProductIdToDelete = productIdToDelete => {
        this.setState({ productIdToDelete });
        this.props.ShowDeleteProductConfirmationAction();
    };

    handleCancelDeleteProduct = () => this.props.HideDeleteProductConfirmationAction();
    handleConfirmDeleteProduct = () => this.props.DeleteProductRequestAction(this.state.productIdToDelete);
    

    render() {
        const { products, isAuthenticated, isAdmin, isDeleteProductConfirmationVisible } = this.props;

        return (
            <Fragment>
                <Card.Group centered itemsPerRow={3}>
                    {
                        products.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                {...product} 
                                product={product}
                                isAuthenticated={isAuthenticated}
                                isAdmin={isAdmin}
                                passProductIdToDelete={this.getProductIdToDelete}
                            />
                        ))
                    }
                </Card.Group>

                {/* Delete Product Confirmation */}
                <Modal
                    size='tiny'
                    open={isDeleteProductConfirmationVisible} 
                    onClose={this.handleCancelDeleteProduct}
                    closeIcon={false}
                    closeOnDimmerClick={true}
                >
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>Are you sure you want to delete this product?</Modal.Content>
                    <Modal.Actions>
                        <Button content='Cancel' onClick={this.handleCancelDeleteProduct} />
                        <Button
                            negative
                            content="Delete"
                            onClick={this.handleConfirmDeleteProduct}
                        />
                    </Modal.Actions>
                </Modal>
            </Fragment>
        )
    }
}
