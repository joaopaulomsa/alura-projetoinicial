import React, { Component, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import { VpnKey } from '@mui/icons-material';

import './Pagina404.css'
import LoadingScreen from "../LoadingPages/LoadingScreen";
import { AuthContext } from "../../../hooks/useApiAuthHed";
import { Link, useHistory, useLocation } from "react-router-dom";

document.body.classList.add('bodyError404')

const Unauthorized = () => {
    
    const loaddingScreen = () => {
        const token = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refreshToken')
    
        if(token && refreshToken) return true
        
        return false
    }

    const location = useLocation();
    const history = useHistory();

    const goback = location.pathname;
    
    return ( 
        <AuthContext.Consumer>
            { user => (
                ( loaddingScreen() && user === null ? 
                    <LoadingScreen />        
                :   
            <Container>
                    <Row>
                        <Col xs="12" className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                            <div style={ styles.errorTemplate }>
                                <h1>Oops!</h1>
                                <h2>403 Acesso não autorizado!</h2>
                                <p>Desculpa, é necessário realizar o login para ter acesso a URL requisitada!</p>
                                <div style={ styles.errorActions }>
                                <Link to= {{pathname: "/login", query: { goback }}} className="btn btn-primary btn-lg" style={ styles.errorActionsBtn }>
                                    <VpnKey className="iconBtn" /><span>Fazer Login</span>
                                </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>  ) 
            )}
        </AuthContext.Consumer>
    )
}


const styles = {
    errorTemplate:  { 
        padding: '40px 15px',
        textAlign: 'center' 
    },
    errorActions: {
        marginTop: '15px',
        marginBottom: '15px'
    },
    errorActionsBtn: { 
        marginRight: '10px'
    }
}

export default Unauthorized