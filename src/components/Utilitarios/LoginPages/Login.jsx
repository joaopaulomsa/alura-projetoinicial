import React, { useState } from "react";
import { Col, Row, Button, Input, Form} from "reactstrap";
import { Container } from "react-bootstrap";
import { doLogin } from "../../../hooks/useApiAuthHed";
import { Alert } from 'reactstrap';
import Logotipo from '../../../assets/images/logo.png';
import { Redirect, useHistory, useLocation } from "react-router-dom";

const Login = () => {
    
    const { query, search } = useLocation();
    let history = useHistory()
    let goBackV = "/"
    const [user, setUser] = useState(null)
    const [password, setPassword] = useState("")
    const [atendimentoModal, setAtendimentoModal] = useState(false)
    const [error, setError] = useState([{
        auth: false,
        error: false,
        msg: ''
    }])

    if(query && query.goback) goBackV = query.goback 

    const retornoLogin = (dados) => {
        if(dados.error === true){
            setError({...dados})
            setAtendimentoModal(true)
        }
    }

    const login = async() => {
            
            let acaoLog = {
                acaoLoginUsuario : ''
            }

            console.log(goBackV)
            
            let dados = {user,password,...acaoLog}

            await doLogin(dados).then(async(result)=>{
                if ( result.auth === true ){  
                    
                    history.push(goBackV)

                }
                else retornoLogin(result)
            })


         
    }    


    return (
        <Container>
            <Row>
                <Col xs="12" className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                    <Form action="index.php" method="post" className="formLogin">
                        <p><img src={Logotipo} alt="Logotipo" className="img-fluid pt-2 animate__animated animate__bounce" style={{ maxWidth: '220px', margin: '5px' }} /></p>
                        <h1>Login de Acesso</h1>
                        <Row className="form-group">
                            <Alert hidden={!error.error} color="danger">
                                Erro ao Logar: { error.msg }
                            </Alert>
                        </Row>
                        <Row className="form-group">
                                <span className="input-group-addon"><i className="fa fa-user"></i></span>
                                <Input onChange={(event) => { setUser(event.target.value) }}  type="text" name="user" placeholder="Usuário" required="required" title="Informe usuário"/>
                        </Row>
                        <Row className="form-group">
                                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                                <Input onChange={(event) => { setPassword(event.target.value) }} type="password" name="password" placeholder="Senha" required="required" title="Informe Senha"/>
                        </Row>
                        <Button onClick={ (query)=>{login(query.goback)} } className="btn btn-primary login-btn btn-block">Entrar</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Login