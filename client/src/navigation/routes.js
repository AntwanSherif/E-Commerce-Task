import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

//Pages
import HomePage from '../pages/HomePage';
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import UserCartPage from "../pages/UserCartPage";
import OrdersPage from "../pages/OrdersPage";


/** Define helper components that handle pages visibility 
 * AdminRoute is used with routes that's accessed by admin only
 * UserRoute is used with routes that's accessed by users only
 * AnonymousUserRoute is used with routes that SHOULD NOT be accessed by authenticated users (e.g. Signup & Login Page)
*/
@connect (state => state.user)
class AdminRoute extends Component {
  render() {
    let { component: Component, isAuthenticated, user, ...rest } = this.props;
    
    return(
      <Route {...rest} render={props => (
        isAuthenticated && user.isAdmin
            ? <Component {...props}/>
            : <Redirect to='/' />
        )}
      />
    )
  }
}

@connect (state => state.user)
class UserRoute extends Component {
  render() {
    let { component: Component, isAuthenticated, user, ...rest } = this.props;
    
    return(
      <Route {...rest} render={props => (
        isAuthenticated && !user.isAdmin
            ? <Component {...props}/>
            : <Redirect to='/' />
        )}
      />
    )
  }
}

@connect (state => state.user)
class AnonymousUserRoute extends Component {
  render() {
    let { component: Component, isAuthenticated, ...rest } = this.props;
    
    return(
      <Route {...rest} render={props => (
          isAuthenticated 
          ? <Redirect to='/' />
          : <Component {...props}/>
      )}/>
    )
  }
}



/* Application Routing */
export default () => (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <AnonymousUserRoute exact path="/login" component={LoginPage} />
      <AnonymousUserRoute exact path="/signup" component={SignupPage} />
      <UserRoute exact path="/cart" component={UserCartPage} />
      <AdminRoute exact path="/orders" component={OrdersPage} />
    </Switch>
);