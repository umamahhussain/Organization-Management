import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect, useReducer, useContext, createContext } from 'react'; 
import { Home, Login, Invoice, Roles, Signup } from './pages';
import { Navbar, Footer } from './components';
import { initialState, reducer } from './reducer/UserReducer';

export const UserContext= createContext()

const Routing = () => {
  const navigate= useNavigate()
  const {state, dispatch}= useContext( UserContext )

  useEffect( () => {
    const user= JSON.parse( localStorage.getItem( "user" ) )
    if( user ) {
      dispatch( { type: "USER", payload: user } )
      } 
    else {
      navigate( "/login" )
      }
  }, [] )

  return(
    <Routes>
      <Route path='/invoice' element={ <Invoice/> } />
      <Route path='/roles' element={< Roles /> } />
      <Route path='/login' element={ <Login/> } />
      <Route path='/signup' element={ <Signup/> } />
      <Route path='/home' element={ <Home/> } />
    </Routes>
  )
} 


function App() {

  const [state, dispatch]= useReducer( reducer, initialState )
  
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar/>
        <Routing/>
        <Footer/>
      </Router>
    </UserContext.Provider>
  );
}
 
export default App;
 