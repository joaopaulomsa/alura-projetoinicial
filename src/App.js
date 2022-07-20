import React, { Component } from "react";
import { ProvideAuth } from "./hooks/useApiAuthHed"
import "./App.css";
import 'fontsource-roboto';
import Moment from 'react-moment';

import 'moment-timezone';
import Router from "./rotas";
class App extends Component {

  constructor(){
    super()
    
    Moment.globalFormat = 'DD/MM/YYYY'
    Moment.globalLocale = 'pt-br';
    Moment.globalTimezone = 'America/Sao_Paulo';

  }

  render() {
    return (
      <ProvideAuth>
          <Router />
      </ProvideAuth>
      );
  }

/*  
  render() {

    return (
      <ProvideAuth>
        <Router>
          <Switch>
            <PrivateRoute exact path="/">
              
            </PrivateRoute>
            <PrivateRoute exact path="/PainelChecklistCirurgias/:painel" children={ <PainelCirurgia/> } />
            <PrivateRoute exact path="/PainelEmergenciaPA">
              <PainelEmergenciaPA card="PC" />
            </PrivateRoute>
            <PrivateRoute exact path="/PainelTVEmergenciaPA">
              <PainelEmergenciaPA card="TV" />
            </PrivateRoute>
            <Route exact path="/login" children={ <Login logotipo={Logotipo}/>}/>
            <Route>
              <Pagina404 />
            </Route>
          </Switch>
        </Router>
      </ProvideAuth>
    );
  } */
}

export default App;
