import React, { useState } from "react";
import { AssignmentInd, HealthAndSafety, Assignment, AssignmentTurnedIn, CheckCircleOutline } from "@mui/icons-material";
import { Alert, Col, Row, Toast, ToastBody, ToastHeader } from "reactstrap";
import Lottie from 'react-lottie';
import jsonLaboratorioAnimationExamesLoadding from './lf30_m1od7oor.json'
import jsonLaboratorioAnimationExamesReady from './lf20_pwppxjbo.json'
import './stylePage.css'
import { Animated } from "react-animated-css";

import compareDateSqlString from "../../../hooks/useDateUtils";
import Moment from "react-moment";
import moment from "moment";

const defaultOptions = {
    ExamesReady: {
        loop: true,
        autoplay: true, 
        animationData: jsonLaboratorioAnimationExamesReady,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    },
    ExamesLoadding: {
        loop: true,
        autoplay: true, 
        animationData: jsonLaboratorioAnimationExamesLoadding,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    }
}

function retornaInfoCss(parametro) {
    switch (parametro) {
        case 0: 
        case 1: return 'info'
        case 2: return 'warning'
        default: return 'danger'
    }
}

function retornaInfoLiberacao(horaliberacaolaboratorio,horaliberacaoimagem,horasolicitacaolaboratorio,horasolicitacaoimagem,liberado){

    let dataLiberado = (liberado) ? compareDateSqlString(horaliberacaolaboratorio,horaliberacaoimagem).maisAtual : compareDateSqlString(horasolicitacaolaboratorio,horasolicitacaoimagem).maisAntigo

    let momentoSobtraido = moment().diff(dataLiberado)
    let d = moment.duration(momentoSobtraido);
    let cssStatus = retornaInfoCss(Math.floor(d.asHours()))
    let tempo = ((Math.floor(d.asHours()) !== 0 ) ? Math.floor(d.asHours()) +'h ':'') + ((moment.utc(momentoSobtraido).format("mm") !== '00' ) ? moment.utc(momentoSobtraido).format("mm")+'min': '')

    if (!liberado) return { texto: "Aguardando Exames "+tempo, cssStatus: cssStatus }
    else return { texto: "Liberado "+tempo, cssStatus: "success" }
}

function retornaIconeCheckNaoCheck(parametro,liberado=false) {
    if(liberado) return ( <Lottie options={defaultOptions.ExamesReady} height={40}
                    width={40}
                    isStopped={false}
                    isPaused={false}/> )
    switch (parametro) {
        case false:
            return ( <Lottie options={defaultOptions.ExamesLoadding} height={40}
            width={60}
            isStopped={false}
            isPaused={false}/> )
        default:
            return ( <CheckCircleOutline className={"card-title-icon card-color-success examesCheckLiberado"}/> )
    }
}

const CardPCEmergenciaPA = (dados) => {
    let dadosAtendimento = dados.itensEmergenciaPA
    let examesLiberado = dadosAtendimento.horaliberacaolaboratorio !== '' && dadosAtendimento.horaliberacaoimagem !== ''
    let infoLiberacao = retornaInfoLiberacao(dadosAtendimento.horaliberacaolaboratorio, dadosAtendimento.horaliberacaoimagem, dadosAtendimento.horasolicitacaolaboratorio, dadosAtendimento.horasolicitacaoimagem, examesLiberado)
    let textoLiberacao = infoLiberacao.texto
    let statusCss = infoLiberacao.cssStatus
    const [isOpenCard, setIsOpenCard] = useState(true)
    const toggle = () => setIsOpenCard(!isOpenCard)
    return (
        <Animated animationIn="bounceIn" animationOut="bounceOut" animationInDuration={1000} animationOutDuration={1000} isVisible={isOpenCard} className={"p-0 cardExame col-2 animate__animated animate__jello "}>            
                <div className={"m-1 rounded p-1 bg-"+statusCss}>
                    <Toast style={stylePage.toast}>
                        <ToastHeader style={stylePage.toast}>
                            <Row>
                                <Col xs={1}>
                                    <AssignmentInd fontSize="16px" className={"card-title-icon card-color-"+statusCss}/>
                                </Col>
                                <Col xs={10} className="p-0">
                                    <h5>{dadosAtendimento.paciente}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={1}>
                                    <HealthAndSafety fontSize="16px" className={"card-title-icon card-color-"+statusCss}/>
                                </Col>
                                <Col xs={10} className="p-0">
                                    <h5>{dadosAtendimento.medico}</h5>
                                </Col>
                            </Row>
                        </ToastHeader>
                        <ToastBody className="p-1">
                            <Row>
                                <Col xs={12}>
                                    <Alert color={statusCss}  className="m-1 p-2" style={{ background: '#ffffff75' }}>
                                        <Row>
                                            <Col xs="6" className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimento.horaliberacaolaboratorio !== '', examesLiberado)}
                                                <h6 className="pt-0">Laboratório</h6>
                                                <p className="examesHoraEntradaSaida"><Assignment fontSize="18px" className={"card-title-iconHour card-color-"+statusCss}/><Moment>{dadosAtendimento.horasolicitacaolaboratorio}</Moment></p>
                                                <p className="examesHoraEntradaSaida"><AssignmentTurnedIn fontSize="18px" className={"card-title-iconHour card-color-"+statusCss}/><Moment>{dadosAtendimento.horaliberacaolaboratorio}</Moment></p>
                                            </Col>
                                            <Col xs="6" className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimento.horaliberacaoimagem !== '', examesLiberado)}
                                                <h6 className="pt-0">Imagem</h6>
                                                <p className="examesHoraEntradaSaida"><Assignment fontSize="18px" className={"card-title-iconHour card-color-"+statusCss}/><Moment>{dadosAtendimento.horasolicitacaoimagem}</Moment></p>
                                                <p className="examesHoraEntradaSaida"><AssignmentTurnedIn fontSize="18px" className={"card-title-iconHour card-color-"+statusCss}/><Moment>{dadosAtendimento.horaliberacaoimagem}</Moment></p>
                                            </Col>
                                        </Row>
                                    </Alert>
                                </Col>
                                <Col xs={12}>
                                    <h6 className="h6InfoLiberacao" onClick={toggle}>{textoLiberacao}</h6>
                                </Col>
                            </Row>
                        </ToastBody>
                    </Toast>
                </div>
           
        </Animated>
    )
}
//<Col xs={2} className={"p-0 cardExame"+((!isOpenCard)?" fechaCardExame":"")}>
//</Col>
const stylePage = {
    toast: {
        width: '100%'
    },
    spinTitle: {
        fontSize: '16px',
        width: '20px',
        height: '20px'
    }
}

export default CardPCEmergenciaPA