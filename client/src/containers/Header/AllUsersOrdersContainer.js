import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

@withRouter
@connect(state => state)
export default class AllUsersOrdersContainer extends Component {
    render() {
        return (
            <span onClick={() => this.props.history.push('/orders')}>
                <Icon size='large' name='dolly' style={{ marginTop: -5, cursor: 'pointer' }} />
            </span>
        );
    }
}