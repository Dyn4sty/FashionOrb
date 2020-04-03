import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header';
// import Footer from './components/footer/Footer'
import { selectCurrentUser } from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/users.actions';
import Spinner from './components/Spinner/Spinner'
import ErrorBoundary from './components/error-boundary/error-boundary'

const HomePage = lazy(() => import('./pages/homepage/homepage') )
const ShopPage = lazy(() => import('./pages/shop/shop'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout'))
const SignInAndRegister = lazy(() => import('./pages/LoginAndRegister/LoginAndRegister'))

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
    <ErrorBoundary>
        <Suspense fallback={<Spinner/>}>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path ='/signin' render={() => currentUser ? (
          <Redirect to='/' />
          ) : (<SignInAndRegister />)}
          />
        </Suspense>
      </ErrorBoundary>
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
