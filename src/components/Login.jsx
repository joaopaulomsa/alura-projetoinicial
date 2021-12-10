import React, { useState } from "react";
import { Col, Row, Button, Input, Form} from "reactstrap";
import { Redirect, useLocation } from "react-router";
import { Container } from "react-bootstrap";
import useApiLoginHed from "../hooks/useApiLoginHed";
import ModalHED from "../hooks/useModal";

const Login = (props) => {

    const [ redirectToReferrer, setRedirectToReferrer] = useState(false)
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [atendimentoModal, setAtendimentoModal] = useState(false)
    const [error, setError] = useState([{
        auth: false,
        error: false,
        msg: ''
    }]);

    const {state} = useLocation()

    const retornoLogin = (dados) => {
        if(dados.error === true){
            setError({...dados})
            setAtendimentoModal(true)
            console.log(error)
        }
    }

    const login = () => {
        
            let acaoLog = {
                acaoLoginUsuario : ''
            }
            let dados = {user,password,...acaoLog}
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useApiLoginHed(dados,setRedirectToReferrer,retornoLogin)
         
    }    


    if( redirectToReferrer === true) return <Redirect to={state?state.from:'/'} /> 

    return (
        <Container>
            <Row>
                <Col xs="12" className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                    <Form action="index.php" method="post" className="formLogin">
                        <p><img src={props.logotipo} alt="Logotipo" className="img-fluid pt-2 animate__animated animate__bounce" style={{ maxWidth: '220px', margin: '5px' }} /></p>
                        <h1>Login de Acesso</h1>
                        <Row className="form-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <Input onChange={(event) => { setUser(event.target.value) }}  type="text" name="user" placeholder="Usuário" required="required" title="Informe usuário"/>
                        </Row>
                        <Row className="form-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <Input onChange={(event) => { setPassword(event.target.value) }} type="password" name="password" placeholder="Senha" required="required" title="Informe Senha"/>
                        </Row>
                        <Button onClick={ ()=>{login()} } className="btn btn-primary login-btn btn-block">Entrar</Button>
                    </Form>
                </Col>
            </Row>
            <ModalHED modalShow={atendimentoModal} setModalShow={setAtendimentoModal} title="Erro ao Logar">
                <Row hidden={!error.error}>
                    <Col xs={12}>{ error.msg }</Col>
                </Row>
            </ModalHED>
        </Container>
    )
}

export default Login