import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import { connect } from 'react-redux';

//Pages
import HomePage from '../pages/HomePage';
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import OrdersPage from "../pages/OrdersPage";

/** Define helper components that handle pages visibility 
 * PrivateRoute is used with routes that SHOULD NOT be accessed by unauthorized users (i.e., requires login first)
 * UserRoute is used with routes that SHOULD NOT be accessed by logged-in users (e.g. Signup & Login Page)
*/
// @connect (state => state.session)
// class PrivateRoute extends Component {
//   render() {
//     let { component: Component, isLoggedIn, ...rest } = this.props;
//     return(
//       <Route {...rest} render={props => {
//         return (
//           isLoggedIn 
//             ? <Component {...props}/>
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
//         )}}
//       />
//     )
//   }
// }

// @connect (state => state.session)
// class UserRoute extends Component {
//   render() {
//     let { component: Component, isLoggedIn, ...rest } = this.props;
//     return(
//       <Route {...rest} render={props => (
//           !isLoggedIn ?
//           <Component {...props}/>
//           :
//           <Redirect to={{
//               pathname: '/home',
//               state: { from: props.location }
//           }}/>
//       )}/>
//     )
//   }
// }



/* Application Routing */
export default () => (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/orders" component={OrdersPage} />
    </Switch>
  );