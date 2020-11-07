import './App.css';
import Header from './Header'
import React,{useEffect} from 'react';
import Home from './Home'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './Firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51HkVvzIg2wuQXm8tOr1zdSYs1G2485cvKdsb5cCd2LlYVch9ne8a4y7u8SvburDKYqoTP0cMedvVxz97IMPlQmSt00zDSJutbP');

function App() {
  const [{},dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser=>{
      console.log("the user is >>>>",authUser);

      if(authUser){
        //the user is/was logged in
        //the dispatch will just shoot this action into the dataLayer
        dispatch({
          type:"SET_USER",
          user:authUser,
        })

      }else{
        //the user logged out
        dispatch({
          type:"SET_USER",
          user:null,
        })

      }
    })

  },[])

  return (
    <Router>
      <div className="app">
      
        <Switch>
        <Route path="/orders">
            <Header/>
            <Orders/>   
          </Route>
        <Route path="/login">
            <Login/>   
          </Route>
          <Route path="/checkout">
            <Header/>
            <Checkout/>   
          </Route>
          <Route path="/payment">
            <Header/>
            <Elements stripe={promise}>
            <Payment/>
            </Elements>   
          </Route>

          {/* default Route path should be in the buttom */}
          <Route path="/">
            <Header/>
            <Home/>
          </Route>
        </Switch>     
      </div>
    </Router>
  );
}

export default App;
