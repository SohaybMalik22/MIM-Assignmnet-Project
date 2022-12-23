import React from 'react';
import { HashRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
  Login,
  Signup,
  Home,
  SendMoney,
  History
} from './routers/Routes';

function App() {

  return (
    <React.Fragment>
        <Router >
          <Routes> 
              <Route exact path='/' element={
                <Home />
              } />
               <Route exact path='/login' element={
                <Login />
              } /> 
         
            <Route exact path='/signup' element={
              <Signup />
            } />
            {/* <Route exact path='/home' element={
              <Home />
            } /> */}
            <Route exact path='/sendmoney' element={
              <SendMoney />
            } /> 
            <Route exact path='/history' element={
              <History />
            } />
          </Routes>
        </Router>
    </React.Fragment>

  );
}

export default App;

