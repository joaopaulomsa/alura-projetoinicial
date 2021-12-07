import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Home } from '@mui/icons-material';

import './Pagina404.css'

document.body.classList.add('bodyError404')

const Pagina404 = () => {
    return (
        <Container>
            <Row>
                <Col xs="12" className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                    <div style={ styles.errorTemplate }>
                        <h1>Oops!</h1>
                        <h2>404 Página não encontrada</h2>
                        <p>Desculpa, ocorreu algum erro, a página não foi encontrada!</p>
                        <div style={ styles.errorActions }>
                            <a href="/" className="btn btn-primary btn-lg" style={ styles.errorActionsBtn }>
                                <Home className="iconBtn" /><span>Voltar para Home</span>
                            </a>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
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

export default Pagina404