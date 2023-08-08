import React, {createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext()

const CryptoContext = ({children}) => {
    const [Currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹");
    useEffect(()=>{
        if(Currency==="INR") setSymbol("₹");
        else if(Currency==="USD") setSymbol("$");
    },[Currency])
  return (
   <Crypto.Provider value={{Currency,symbol,setCurrency}}>
    {children}
   </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState=()=>{
    return useContext(Crypto);
}