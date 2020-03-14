import React from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import Header from './components/header/header';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/users.actions'
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
        <Route exact path ='/signin' render={ () =>
         this.props.currentUser ? (
        <Redirect to='/' />
        ) : (<SignInAndRegister />)}
       />
      </Switch>
    </React.Fragment>

    );
  }
}

const mapStateToProps = ({user: {currentUser}}) => ({
  currentUser
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})



export default connect(mapStateToProps,mapDispatchToProps)(App);
