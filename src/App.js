import React, { Component } from "react";
import "./App.css";
import 'fontsource-roboto';

import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";

import PainelCirurgia from "./components/PainelCirurgia/PainelCirurgia";
import Pagina404 from "./components/Pagina404";
import PainelEmergenciaPA from "./components/Laboratorio/PainelEmergenciaPA/PainelEmergenciaPA";
import { Col, Container} from "reactstrap";

import jsonIconesPaineis from './assets/icons/lf20_qVsv08.json'
import Lottie from "react-lottie";
import Logotipo from './assets/images/logo.png'

import Moment from 'react-moment';
import moment from "moment"
import decode from "jwt-decode"

import 'moment-timezone';
import Login from "./components/Login";

class App extends Component {

  constructor(){
    super()
    
    Moment.globalFormat = 'DD/MM/YYYY'
    Moment.globalLocale = 'pt-br';
    Moment.globalTimezone = 'America/Sao_Paulo';

    this.state = {
      defaultOptions : {
        Paineis: {
            loop: true,
            autoplay: true, 
            animationData: jsonIconesPaineis,
            rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
            }
        }
      }
    }
  }

  render() {

    const checkAuth = ()=> {
      const token = localStorage.getItem('token')
      const refreshToken = localStorage.getItem('refreshToken')
    
      // console.log(refreshToken)
      
      if(!token || !refreshToken) return false

      try {
        const { exp } = decode(refreshToken)

        console.log(exp)
        console.log(moment().valueOf())

        if(exp < moment().valueOf()) return false

      } catch (error) {
        return false
      }

      return true
    }

    function PrivateRoute({children, ...props}) {
      return (
      <Route {...props} render={({ location }) => {
        return checkAuth()
          ? children
          : <Redirect to={{
            pathname: "/login",
            state: { from: location }
            }}/>
        }}
      />)
    }

    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Container>
             <Col xs="12" className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                  <p><img src={Logotipo} alt="Logotipo" className="img-fluid pt-2 animate__animated animate__bounce" style={{ maxWidth: '220px', margin: '5px' }} /></p>
                  <h1>Escolha de Painel</h1>
                  <p>Escolha nos botões abaixo o painel que deseja visualizar!</p>
                  <div>
                    <Link to="/PainelChecklistCirurgias/8C" className="btn btn-outline-primary btn-lg">
                      <Lottie options={this.state.defaultOptions.Paineis} height={80}
                        width={80}
                        isStopped={false}
                        isPaused={false}/>
                      <span>Checklist Cirurgias</span>
                    </Link>
                    <Link to="/PainelEmergenciaPA" className="btn btn-outline-primary btn-lg">
                      <Lottie options={this.state.defaultOptions.Paineis} height={80}
                        width={80}
                        isStopped={false}
                        isPaused={false}/>
                      <span>PC Emergência PA</span>
                    </Link>
                    <Link to="/PainelTVEmergenciaPA" className="btn btn-outline-primary btn-lg">
                      <Lottie options={this.state.defaultOptions.Paineis} height={80}
                        width={80}
                        isStopped={false}
                        isPaused={false}/>
                      <span>TV Emergência PA</span>
                    </Link>
                  </div>
              </Col>
            </Container>
          </Route>
          <Route exact path="/PainelChecklistCirurgias/:painel" children={ <PainelCirurgia/> } />
          <PrivateRoute exact path="/PainelEmergenciaPA">
            <PainelEmergenciaPA card="PC" />
          </PrivateRoute>
          <Route exact path="/PainelTVEmergenciaPA">
            <PainelEmergenciaPA card="TV" />
          </Route>
          <Route exact path="/login" children={ <Login logotipo={Logotipo}/>}/>
          <Route>
            <Pagina404 />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
