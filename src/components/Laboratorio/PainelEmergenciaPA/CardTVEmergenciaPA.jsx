import React, { useState, useEffect } from "react";
import { AssignmentInd, CheckCircleOutline, AccessTime, AccessTimeOutlined, CakeRounded, Bookmark, Healing, Shield, Circle, HourglassBottom, ContentPasteSearch } from "@mui/icons-material";
import { Alert, Col, Row, Toast, ToastBody, ToastHeader } from "reactstrap";
import Lottie from 'react-lottie';
import jsonLaboratorioAnimationExamesLoadding from './lf30_m1od7oor.json'
import jsonLaboratorioAnimationExamesReady from './lf20_pwppxjbo.json'
import './stylePage.css'

import { iniciaisDeNomes, retornaPrioridadeUx, retornaStatusUx} from '../../../helpers/useStringUtils';
import { retornaDataYY } from "../../../helpers/useDateUtils";

const defaultOptions = {
    ExamesReady: {
        loop: false,
        autoplay: true, 
        animationData: jsonLaboratorioAnimationExamesReady,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    },
    ExamesLoadding: {
        loop: false,
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
    if(liberado) return ( <Lottie options={defaultOptions.ExamesReady} height={25}
                    width={35}
                    style={{cursor:'auto'}}
                    isStopped={false}
                    isClickToPauseDisabled={true}
                    isPaused={false}/> )
    switch (dt_liberacao) {
        case 'Pendente':
            return ( <Lottie options={defaultOptions.ExamesLoadding} height={25}
            width={45}
            style={{cursor:'auto'}}
            isStopped={false}
            isClickToPauseDisabled={true}
            isPaused={false}/> )
        case 'Liberado':
            return (  <Lottie options={defaultOptions.ExamesReady} height={25}
                width={35}
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
    //console.log(dadosAtendimentoExames)
    if(dadosAtendimentoExames === undefined || (dadosAtendimentoExames.imagem === null && dadosAtendimentoExames.rx === null && dadosAtendimentoExames.laboratorio === null)) return( <div className={"p-1 cardExame col-2"}> 
        <div className={"m-0 rounded p-1 bg-"+((dadosAtendimento.ie_restricao === 'S')?'darkDuplo':'cardCinza')}>
                    <Toast style={stylePage.toast}>
                        <ToastHeader className="p-1" style={stylePage.toast}>
                            <Row>
                                <Col xs={1}>
                                    <AssignmentInd fontSize="15px" className={"card-title-icon card-color-secundary"}/>
                                </Col>
                                <Col xs={8} className="p-0">
                                    <h5>{iniciaisDeNomes(dadosAtendimento.paciente)} - {retornaDataYY(dadosAtendimento.data_nascimento)}</h5>
                                </Col>
                                <Col xs={1}>
                                    <Circle hidden={retornaPrioridadeUx(dadosAtendimento.ie_prioridade).cor === ''} fontSize="12px" className={"card-title-icon bolaClass"} style={{ color: retornaPrioridadeUx(dadosAtendimento.ie_prioridade).cor }}/>
                                </Col>
                            </Row>
                        </ToastHeader>
                        <ToastBody className="p-1" style={{ background: retornaStatusUx(dadosAtendimento.ie_status).colorBg }}>
                            <Row style={{ textAlign: 'center' }}>
                                <Col className="p-2" xs={12}>
                                    { (retornaStatusUx(dadosAtendimento.ie_status).icon == 'ContentPasteSearch')?
                                        <ContentPasteSearch  style={{ fontSize: '33px' }} className={"card-title-icon text-secondary"}/>
                                    :
                                        <HourglassBottom  style={{ fontSize: '33px' }} className={"card-title-icon text-secondary"}/>
                                    }
                                </Col>
                                <Col className="mb-1 pb-0 pt-0" xs={12}>
                                    <h6>{retornaStatusUx(dadosAtendimento.ie_status).texto}</h6>
                                </Col>
                            </Row>
                        </ToastBody>
                    </Toast>
                </div>
                </div> )

    return (
        <div hidden={dadosAtendimentoExames.laboratorio === null && dadosAtendimentoExames.rx === null && dadosAtendimentoExames.imagem === null} className={"p-1 cardExame col-2"}>            
                <div className={"m-0 rounded p-1 bg-"+((dadosAtendimento.ie_restricao === 'S')?'dark':dadosAtendimentoExames.uxInfo.cssStatus)}>
                    <Toast style={stylePage.toast}>
                        <ToastHeader className="p-1" style={stylePage.toast}>
                            <Row>
                                <Col xs={1}>
                                    <AssignmentInd fontSize="15px" className={"card-title-icon card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>
                                </Col>
                                <Col xs={8} className="p-0">
                                    <h5>{iniciaisDeNomes(dadosAtendimento.paciente)} - {retornaDataYY(dadosAtendimento.data_nascimento)}</h5>
                                </Col>
                                <Col xs={1}>
                                    <Circle fontSize="12px" className={"card-title-icon bolaClass"} style={{ color: retornaPrioridadeUx(dadosAtendimento.ie_prioridade).cor }}/>
                                </Col>
                            </Row>
                        </ToastHeader>
                        <ToastBody className="p-1">
                            <Row>
                                <Col xs={12}>
                                    <Alert color={dadosAtendimentoExames.uxInfo.cssStatus} className="m-0 p-1" style={{ background: '#ffffff75' }}>
                                        <Row>
                                        <Col hidden={ocultaIfNull(dadosAtendimentoExames.laboratorio)} xs={retornaQtdeItens(dadosAtendimentoExames)} className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimentoExames.laboratorio, dadosAtendimentoExames.liberado)}
                                                <h6 className="mb-1 pb-0 pt-0">Laboratório</h6>
                                                <p className="examesHoraEntradaSaida"><AccessTime hidden={!ocultaIfNull(dadosAtendimentoExames.laboratorio,true)} fontSize="18px" className={"card-title-iconHour card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>{dadosAtendimentoExames.tempoUxLab}</p>
                                            </Col>
                                            <Col hidden={ocultaIfNull(dadosAtendimentoExames.rx)} xs={retornaQtdeItens(dadosAtendimentoExames)} className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimentoExames.rx, dadosAtendimentoExames.liberado)}
                                                <h6 className="mb-1 pb-0 pt-0">RX</h6>
                                                <p className="examesHoraEntradaSaida"><AccessTime hidden={!ocultaIfNull(dadosAtendimentoExames.rx,true)} fontSize="18px" className={"card-title-iconHour card-color-"+dadosAtendimentoExames.uxInfo.cssStatus}/>{dadosAtendimentoExames.tempoUxRx}</p>
                                            </Col>
                                            <Col hidden={ocultaIfNull(dadosAtendimentoExames.imagem)} xs={retornaQtdeItens(dadosAtendimentoExames)} className="p-0" style={{ textAlign: 'center' }}>
                                                {retornaIconeCheckNaoCheck(dadosAtendimentoExames.imagem, dadosAtendimentoExames.liberado)}
                                                <h6 className="mb-1 pb-0 pt-0">Imagem</h6>
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