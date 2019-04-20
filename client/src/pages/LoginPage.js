import React, { Component } from 'react'
import DocumentTitle from "react-document-title";
import { Grid, Header } from 'semantic-ui-react';
import LoginFormContainer from '../containers/LoginFormContainer';


export default class LoginPage extends Component {
  render() {
    return (
      <DocumentTitle title="ITClinic - Login">
        <div className='login-form' style={{height: '100%'}}>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center' content='Login to your account' />
              <LoginFormContainer />
            </Grid.Column>
          </Grid>
        </div>
      </DocumentTitle>
    )
  }
}
