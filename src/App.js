import React from 'react';
import {Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import HomePage from './pages/homepage/homepage';
import ShopPage from './pages/shop/shop';
import LoginAndRegister from './pages/LoginAndRegister/LoginAndRegister'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    }
  }
  unsubscribeFromAuth = null

  componentDidMount() {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          }, () => console.log(this.state.currentUser));
        })
      }
      else {
        this.setState({ currentUser: userAuth})
      }

  
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
  return (
    <div>
    <Header currentUser={this.state.currentUser}/>
    <Switch>
      <Route exact path='/' component={HomePage} />
      <Route path='/shop' component={ShopPage} />
      <Route exact path ='/signin' component={LoginAndRegister} />
    </Switch>
    </div>

    );
  }
}

export default App;
