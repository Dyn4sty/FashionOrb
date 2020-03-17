import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header';
import Footer from './components/footer/Footer'
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import CheckoutPage from './pages/checkout/checkout'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/users.actions'
import { selectCurrentUser } from './redux/user/user.selectors'
import SignInAndRegister from './pages/LoginAndRegister/LoginAndRegister';
class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      }
      else {
        setCurrentUser(userAuth)
      }

  
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path ='/signin' render={ () =>
         this.props.currentUser ? (
        <Redirect to='/' />
        ) : (<SignInAndRegister />)}
       />
       
      </Switch>
      <Footer/>
    </React.Fragment>

    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})



export default connect(mapStateToProps,mapDispatchToProps)(App);
