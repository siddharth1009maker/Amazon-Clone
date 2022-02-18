/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-unused-vars */
import './App.css';
import React , {useEffect} from 'react';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Router ,Switch , Route} from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';
const promise = loadStripe('pk_test_51KNb37SDyanzXER2Mzk1QGVgqA2dOzSklARE2aBmkhEI5DVps8ZQG1DYGkI4C1RWAEmPNGgmuFkJZFjpM9wBeZ3j0034ZFE4Jb');
function App() {
  const[{} , dispatch] = useStateValue();
  useEffect(()=>{
    //will only run once when the app loads
    auth.onAuthStateChanged(authUser =>{
      console.log("THE USER IS " , authUser);
      if(authUser)
      {
        dispatch({
          type : 'SET_USER',
          user : authUser
        })
      }
      else
      {
        dispatch({
          type:'SET_USER',
          user : null
        })
      }
    })
  } , [])
  return (
    <Router>
      <div className="app">
      <Switch>
         <Route exact path="/">
           <Header />   {/*it is used in every route so we keep it out from switch */}
           <Home />
         </Route>
         <Route path = "/checkout">
           <Header />
           <Checkout />
         </Route>
         <Route path = "/login">
           <Login/>
         </Route>
         <Route path= '/payment'>
           <Header />
           <Elements stripe={promise}>
             <Payment />
           </Elements>
         </Route>
         <Route path = '/orders'>
           <Header />
           <Orders />
         </Route>
      </Switch>
      {/* Header */}
      {/* Home */}
      </div>
    </Router>
  );
}

export default App;
