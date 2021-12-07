import React, { useState, useEffect } from "react";
import { AssignmentInd, CheckCircleOutline, AccessTime, AccessTimeOutlined } from "@mui/icons-material";
import { Alert, Col, Row, Toast, ToastBody, ToastHeader } from "reactstrap";
import Lottie from 'react-lottie';
import jsonLaboratorioAnimationExamesLoadding from './lf30_m1od7oor.json'
import jsonLaboratorioAnimationExamesReady from './lf20_pwppxjbo.json'
import './stylePage.css'

import iniciaisDeNomes from '../../../hooks/useStringUtils';

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

function retornaIconeCheckNaoCheck(parametro,liberado=false) {
    if(parametro === null) return ''
    let dt_liberacao = (parametro.data_liberacao === null)?'Pendente':'Liberado'
    if(liberado) return ( <Lottie options={defaultOptions.ExamesReady} height={40}
                    width={40}
                    style={{cursor:'auto'}}
                    isStopped={false}
                    isClickToPauseDisabled={true}
                    isPaused={false}/> )
    switch (dt_liberacao) {
        case 'Pendente':
            return ( <Lottie options={defaultOptions.ExamesLoadding} height={40}
            width={60}
            style={{cursor:'auto'}}
            isStopped={false}
            isClickToPauseDisabled={true}
            isPaused={false}/> )
        case 'Liberado':
            return (  <Lottie options={defaultOptions.ExamesReady} height={40}
                width={40}
                style={{cursor:'auto'}}
                isStopped={false}
                isClickToPauseDisabled={true}
                isPaused={false}/> )
        default:
            return ( <AccessTimeOutlined className={"card-title-icon card-color-success examesCheckLiberado"}/> )
    }
}

function retornaQtdeItens(dados){
    if(dados === undefined || dados === null) return '12'
    let qtde = 0
    if(dados.laboratorio !== null) qtde++
    if(dados.rx !== null) qtde++
    if(dados.imagem !== null) qtde++
    return (12/((qtde === 0)?1:qtde))
}

function ocultaIfNull(item,filho = false){
    if(item === null) return true
    if(filho && item.data_liberacao === null) return true
    return false
}

const CardTVEmergenciaPA = (dados) => {
    let dadosAtendimento = dados.itensEmergenciaPA
    let dadosAtendimentoExames = dadosAtendimento.dadosUx

    if(dadosAtendimentoExames === undefined) return(<></>)

    return (
        <div hidden={dadosAtendimentoExames.laboratorio === null && dadosAtendimentoExames.rx === null && dadosAtendimentoExames.imagem === null} className={"p-0 cardExame col-2"}>            
                <div className={"m-1 rounded p-1 bg-"+dadosAtendimentoExames.uxInfo.cssStatus}>
                    <Toast style={stylePage.toast}>
                        <ToastHeader style={stylePage.toast}>
                            <Row>
                                <Col xs={1}>
                                    <AssignmentInd fontSize="16px" className={"card-title-icon card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>
                                </Col>
                                <Col xs={5} className="p-0">
                                    <h5>{iniciaisDeNomes(dadosAtendimento.paciente)}</h5>
                                </Col>
                                <Col xs={1}>
                                    <AssignmentInd fontSize="16px" className={"card-title-icon card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>
                                </Col>
                                <Col xs={4} className="p-0">
                                    <h5>{dadosAtendimento.data_nascimento}</h5>
                                </Col>
                            </Row>
                        </ToastHeader>
                        <ToastBody className="p-1">
                            <Row>
                                <Col xs={12}>
                                    <Alert color={dadosAtendimentoExames.uxInfo.cssStatus}  className="m-1 p-2" style={{ background: '#ffffff75' }}>
                                        <Row>
                                        <Col hidden={ocultaIfNull(dadosAtendimentoExames.laboratorio)} xs={retornaQtdeItens(dadosAtendimentoExames)} className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimentoExames.laboratorio, dadosAtendimentoExames.liberado)}
                                                <h6 className="pt-0">Laboratório</h6>
                                                <p className="examesHoraEntradaSaida"><AccessTime hidden={!ocultaIfNull(dadosAtendimentoExames.laboratorio,true)} fontSize="18px" className={"card-title-iconHour card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>{dadosAtendimentoExames.tempoUxLab}</p>
                                            </Col>
                                            <Col hidden={ocultaIfNull(dadosAtendimentoExames.rx)} xs={retornaQtdeItens(dadosAtendimentoExames)} className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimentoExames.rx, dadosAtendimentoExames.liberado)}
                                                <h6 className="pt-0">RX</h6>
                                                <p className="examesHoraEntradaSaida"><AccessTime hidden={!ocultaIfNull(dadosAtendimentoExames.rx,true)} fontSize="18px" className={"card-title-iconHour card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>{dadosAtendimentoExames.tempoUxRx}</p>
                                            </Col>
                                            <Col hidden={ocultaIfNull(dadosAtendimentoExames.imagem)} xs={retornaQtdeItens(dadosAtendimentoExames)} className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimentoExames.imagem, dadosAtendimentoExames.liberado)}
                                                <h6 className="pt-0">Imagem</h6>
                                                <p className="examesHoraEntradaSaida"><AccessTime hidden={!ocultaIfNull(dadosAtendimentoExames.imagem,true)} fontSize="18px" className={"card-title-iconHour card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>{dadosAtendimentoExames.tempoUxImg}</p>
                                            </Col>
                                        </Row>
                                    </Alert>
                                </Col>
                            </Row>
                        </ToastBody>
                    </Toast>
                </div>
           
        </div>
    )
}
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

export default CardTVEmergenciaPA