import React, { useState, useEffect, useContext, createContext } from "react";
import { BrowserRouter } from "react-router-dom";

export const AuthContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  if(auth.user === null) auth.verifyLogin()
  return ( <AuthContext.Provider value={auth.user}>
              <BrowserRouter>
                {children}
              </BrowserRouter>
    </AuthContext.Provider> )
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useAuthoritiesUser = (user) => {  
  //console.log(user)
  return (user)?user.AuthGroup:['guest']
}

export const doLogin = async(dados) => {
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 
      'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  };
  //await fetch("http://192.168.92.225:3001/login", requestOptions)
  //return await fetch("http://172.16.14.24:3001/login", requestOptions)
  return await fetch("http://localhost:3001/login", requestOptions)
  .then(res => res.json())
  .then(function(result) {
    if(result.auth === true){
      localStorage.setItem('token',result.token)
      localStorage.setItem('refreshToken',result.token)
      return {auth: true, error: false}
    }else{
      return {auth: false, error: true, msg: JSON.stringify(result.erro)}
    }
  })
  .catch(function(error) {
    return {auth: false, error: true, msg: 'Erro consulta API LOGIN HED: '+error}
  })
}
// Provider hook that creates auth object and handles state
export function useProvideAuth() {

  const [user,setUser] = useState(null)
  
  const verifyLogin = async() => {

    const token = localStorage.getItem('token')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!token || !refreshToken) {
      return
    }
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+refreshToken },
      body: JSON.stringify({ token : refreshToken })
    };
    //await fetch("http://192.168.92.225:3001/login", requestOptions)
    //await fetch("http://172.16.14.24:3001/verificaToken", requestOptions)
    await fetch("http://localhost:3001/verificaToken", requestOptions)
    .then(res => res.json())
    .then(function(result) {
      //console.log('HEADER TOKEN>>>>', result)
      if(result.auth !== false){
        setUser(result.auth)
      }else{
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        setUser(false)
      }
    })
    .catch(function(error) {
      //console.log('ERROR TOKEN>>>>', error)
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      setUser(false)
    })      
  }
  

  useEffect(() => {
    
    console.log("efect")

    const unsubscribe = ((user) => {
      if (user) {
        //setUser(user);
      } else {
        //setUser(null);
      }
    });
    // Cleanup subscription on unmount
    //return () => unsubscribe();
  }, [])

  // Return the user object and auth methods
  return {
    user,
    verifyLogin
  }
}