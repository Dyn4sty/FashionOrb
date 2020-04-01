import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header';
// import Footer from './components/footer/Footer'
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout'
import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/users.actions';

import SignInAndRegister from './pages/LoginAndRegister/LoginAndRegister';

const App = ({ currentUser, checkUserSession }) => {
  
  const unsubscribeFromAuth = null;
  useEffect(() => {
    checkUserSession();
    return () => {
      unsubscribeFromAuth();
    }
  },[checkUserSession])

return (
  <React.Fragment>
    <Header/>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route exact path='/checkout' component={CheckoutPage} />
      <Route exact path ='/signin' render={ () =>
        currentUser ? (
      <Redirect to='/' />
      ) : (<SignInAndRegister />)}
      />
      
    </Switch>
  </React.Fragment>

  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})
const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})



export default connect(mapStateToProps, mapDispatchToProps)(App);
