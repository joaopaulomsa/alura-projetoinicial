/* eslint-disable react-hooks/rules-of-hooks */
import React,{ useEffect, useState } from 'react';
import { Col, Container, Row} from 'reactstrap';
import Logotipo from '../../../assets/images/logo.png';

import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import CardTVEmergenciaPA from './CardTVEmergenciaPA';
import CardPCEmergenciaPA from './CardPCEmergenciaPA';
import jsonLoadingHealth from './lf30_editor_csk5d6ws.json'
import Lottie from 'react-lottie';
import ModalDadosHED from '../../../hooks/useModalDados';
import useApiApexEmergenvciaPA from '../../../hooks/useApiApexEmergenciaPA';

const defaultOptions = {
    LoadingHealth: {
        loop: true,
        autoplay: true, 
        animationData: jsonLoadingHealth,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    }
}

function PainelEmergenciaPA({card}) {
    
    const [itensEmergencia, setItensEmergencia] = useState([])
    const [atendimentoModal, setAtendimentoModal] = useState(false)
    const [nroAtendimentoModal, setNroAtendimentoModal] = useState(undefined)

    let myTimeout = null;


    function abreModalInfoExames(dados){
        setAtendimentoModal(true)
        setNroAtendimentoModal(dados)

        var id = window.setTimeout(function() {}, 0);

        while (id--) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
        }

        //console.log('Abre Popup: '+atendimento)

    }
    
    useEffect(()=>{
        if(itensEmergencia.length === 0) {
            useApiApexEmergenvciaPA(setItensEmergencia)
            if(myTimeout === null) setTimeout(function(){
               window.location.reload(false)
                
            },30000)
        }
    
   }, [itensEmergencia, setItensEmergencia, myTimeout])

    Moment.globalFilter = (d) => {
        return  "Invalid date" !== d?d:"Aguardando..."
    }

    return (
        <Container fluid style={{ height: window.innerHeight+'px'}}>
            <Row>
                <Col xs={12} sm={2}>
                    <Link to="/"><img src={Logotipo} alt="Logotipo" className="img-fluid pt-2" style={{ maxWidth: '100px', margin: '5px' }} /></Link>
                </Col>
                <Col xs={12} sm={8}>
                    <h3 className="pt-1 animate__animated animate__bounce" style={{ textAlign: 'center', fontSize: '42px' }}>Painel ({card}) Emergência PA</h3>
                </Col>
                <Col sm={2} style={{ textAlign: 'right' }} className="d-none d-sm-block">
                    <Link to="/"><img src={Logotipo} alt="Logotipo" className="img-fluid pt-2" style={{ maxWidth: '100px', margin: '5px' }} /></Link>
                </Col>
            </Row>
            <Row hidden={itensEmergencia.length > 0}>
                <Col xs={12} style={{ marginTop: '10%'}}>
                <Lottie options={defaultOptions.LoadingHealth} height={400}
                    width={400}
                    isStopped={false}
                    isClickToPauseDisabled={true}
                    isPaused={false}/>
                    </Col>
            </Row>
            <Row hidden={itensEmergencia.length === 0}>
                {
                    itensEmergencia.map(function(dados, index){
                        if(card === 'TV') 
                            return (
                                <CardTVEmergenciaPA key={index} itensEmergenciaPA={dados}/>
                            )
                        else
                            return (
                                <CardPCEmergenciaPA key={index} itensEmergenciaPA={dados} abreModal={abreModalInfoExames}/>
                            )
                    })
                }
            </Row>
            <ModalDadosHED modalShow={atendimentoModal} setModalShow={setAtendimentoModal} dados={nroAtendimentoModal}/>  
        </Container>        
    );
    
}

export default PainelEmergenciaPA;
