import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './modules/Home';
import CoinsList from './modules/CoinsList';
import { makeStyles } from 'tss-react/mui';
function App() {

 const useStyles=makeStyles()(()=>({
  App:{
    backgroundColor: '#14161a',
    color:"white",
    minHeight:"100vh",
  },
 }));
 const { classes } = useStyles();

  return (
  
  <BrowserRouter>
   <div className={classes.App}>
    <Header/>
    <Routes>
   <Route path="/" element={<Home/>} />
   <Route path="/coins/:id" element={<CoinsList/>}/>
   </Routes>
   </div>
   </BrowserRouter>
 
  );
}

export default App;
