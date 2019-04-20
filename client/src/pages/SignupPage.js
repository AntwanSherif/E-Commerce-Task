import React, { Component } from 'react'
import DocumentTitle from "react-document-title";
import SignupFormContainer from '../containers/SignupFormContainer';
import { Grid, Header } from 'semantic-ui-react';

export default class Signup extends Component {
  render() {
    return (
      <DocumentTitle title="ITClinic - Signup">
        <div className='login-form' style={{height: '100%'}}>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center' content='Sign Up Now' />
              <SignupFormContainer />
            </Grid.Column>
          </Grid>
        </div>
      </DocumentTitle>
    )
  }
}
