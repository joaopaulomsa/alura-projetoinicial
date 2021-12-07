/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState }  from 'react';
import { useParams } from "react-router-dom";
import { Alert, Col, Container, Row, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import useApiApex from '../../hooks/useApiApex';
import { AirlineSeatFlat, CheckCircleOutline, CleanHands, ExitToApp, Brightness1, BusinessCenterSharp, TrendingUpRounded } from '@mui/icons-material';
import Logotipo from '../../assets/images/logo.png';
import MedicalServicesRoundedIcon from '@mui/icons-material/MedicalServicesRounded';
import { Link } from 'react-router-dom';
import jsonNotLoadingAmarelo from './amarelo_lf30_editor_0ooio8uc.json'
import jsonNotLoadingVerde from './verde_lf30_editor_ju5vjf3v.json'
import jsonNotLoadingVermelho from './vermelho_lf30_editor_ms8vqv9w.json'
import Lottie from 'react-lottie';

const defaultOptions = {
    NotLoadingAmarelo: {
        loop: true,
        autoplay: true, 
        animationData: jsonNotLoadingAmarelo,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    },
    NotLoadingVerde: {
        loop: true,
        autoplay: true, 
        animationData: jsonNotLoadingVerde,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    },
    NotLoadingVermelho: {
        loop: true,
        autoplay: true, 
        animationData: jsonNotLoadingVermelho,
        rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
        }
    }
}

function retornaIconeCheckNaoCheck(parametro, colorSpin = '#ccc') {
    switch (parametro) {
        case 1:
            return <CheckCircleOutline className="pb-1" style={{fontSize: '20px', color: '#006321'}}/>
        case 0:
            return <Brightness1 className="pb-1 brightShadow" style={{fontSize: '16px', color: '#ffffff'}}/>
        default:
            return <Spinner size="sm" children="" tag="span" type="grow" style={{ color: colorSpin }}/>
    }
}

function PainelCirurgia() {

    let { painel } = useParams();

    let [dados] = useState({
        cirurgia: <Spinner size="sm" children="" tag="span" style={stylePage.spinTitle} />,
        anestesista: <Spinner size="sm" children="" tag="span" />,
        circulante: <Spinner size="sm" children="" tag="span" />,
        cirurgiao: <Spinner size="sm" children="" tag="span" />,
        data_cirurgia: <Spinner size="sm" children="" tag="span" />,
        enfermeiro: <Spinner size="sm" children="" tag="span" />,
        hora_cirurgia: <Spinner size="sm" children="" tag="span" />,
        instrumentador: <Spinner size="sm" children="" tag="span" />,
        paciente: <Spinner size="sm" children="" tag="span" />,
        procedimento: <Spinner size="sm" children="" tag="span" />,
    });

    let [statusLoadingTela] = useState({
        isNotLoadingAmarelo: false,
        isNotLoadingVerde: false,
        isNotLoadingVermelho: false,
    })

    const [itemsApex, setItemsApex] = useState(null)
    const [nrResultadoCirurgia, setNrResultadoCirurgia] = useState(null)
    const [isNotLoadingAmarelo, setIsNotLoadingAmarelo] = useState(null)
    const [isNotLoadingVerde, setIsNotLoadingVerde] = useState(null)
    const [isNotLoadingVermelho, setIsNotLoadingVermelho] = useState(null)

    //VERMELHO - Antes da Saída da Sala ( 1964 )
    const [resultadosVermelho, setResultadosVermelho] = useState({
        res15840: -1, res15841: -1, res15842: -1, res15843: -1, res15844: -1
    })

    const [resultadosVermelho15840, setResultadosVermelho15840] = useState(null)
    const [resultadosVermelho15841, setResultadosVermelho15841] = useState(null)
    const [resultadosVermelho15842, setResultadosVermelho15842] = useState(null)
    const [resultadosVermelho15843, setResultadosVermelho15843] = useState(null)
    const [resultadosVermelho15844, setResultadosVermelho15844] = useState(null)

    //AMARELO - Antes do Início da Anestesia ( 1903 )
    const [resultadosAmarelos, setResultadosAmarelos] = useState({
        res15653: -1, res15657: -1, res15730: -1, res15733: -1, res15737: -1, res15738: -1, 
        res15742: -1, res15743: -1, res15751: -1, res15752: -1, res15754: -1, res15755: -1,
    })

    const [resultadosAmarelos15653, setResultadosAmarelos15653] = useState(-1) 
    const [resultadosAmarelos15657, setResultadosAmarelos15657] = useState(-1)
    const [resultadosAmarelos15730, setResultadosAmarelos15730] = useState(-1) 
    const [resultadosAmarelos15733, setResultadosAmarelos15733] = useState(-1)
    const [resultadosAmarelos15737, setResultadosAmarelos15737] = useState(-1) 
    const [resultadosAmarelos15738, setResultadosAmarelos15738] = useState(-1) 
    const [resultadosAmarelos15742, setResultadosAmarelos15742] = useState(-1) 
    const [resultadosAmarelos15743, setResultadosAmarelos15743] = useState(-1) 
    const [resultadosAmarelos15751, setResultadosAmarelos15751] = useState(-1) 
    const [resultadosAmarelos15752, setResultadosAmarelos15752] = useState(-1) 
    const [resultadosAmarelos15754, setResultadosAmarelos15754] = useState(-1) 
    const [resultadosAmarelos15755, setResultadosAmarelos15755] = useState(-1)

    if(itemsApex !== null) dados = {...itemsApex}
    //VERDE - Antes da Incisão Cirúrgica ( 1945 )
    const [resultadosVerdes, setResultadosVerdes] = useState({
        res15787: -1, res15761: -1, res15762: -1, res15794: -1, res15810: -1, res15822: -1, res15823: -1,
    })

    //VERDE - Antes da Incisão Cirúrgica ( 1945 )
    const [resultadosVerdes15787, setResultadosVerdes15787] = useState(null)
    const [resultadosVerdes15761, setResultadosVerdes15761] = useState(null)
    const [resultadosVerdes15762, setResultadosVerdes15762] = useState(null)
    const [resultadosVerdes15794, setResultadosVerdes15794] = useState(null)
    const [resultadosVerdes15810, setResultadosVerdes15810] = useState(null)
    const [resultadosVerdes15822, setResultadosVerdes15822] = useState(null)
    const [resultadosVerdes15823, setResultadosVerdes15823] = useState(null)

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/rules-of-hooks
        if(itemsApex === null) {
            useApiApex("tipo=painel_cirurgia/dados/"+painel,false, setItemsApex, true)
        }else if(itemsApex !== undefined && itemsApex.cirurgia !== undefined && nrResultadoCirurgia === null){
            setNrResultadoCirurgia(itemsApex.cirurgia)

            useApiApex("tipo=painel_cirurgia/avaliacao/1903/"+itemsApex.cirurgia, false, setIsNotLoadingAmarelo, true)
            useApiApex("tipo=painel_cirurgia/avaliacao/1945/"+itemsApex.cirurgia, false, setIsNotLoadingVerde, true)
            useApiApex("tipo=painel_cirurgia/avaliacao/1964/"+itemsApex.cirurgia, false, setIsNotLoadingVermelho, true)

            //AMARELO - Antes do Início da Anestesia ( 1903 )
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15653", false, setResultadosAmarelos15653, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15657", false, setResultadosAmarelos15657, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15730", false, setResultadosAmarelos15730, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15733", false, setResultadosAmarelos15733, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15737", false, setResultadosAmarelos15737, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15738", false, setResultadosAmarelos15738, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15742", false, setResultadosAmarelos15742, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15743", false, setResultadosAmarelos15743, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15751", false, setResultadosAmarelos15751, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15752", false, setResultadosAmarelos15752, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15754", false, setResultadosAmarelos15754, true)
            useApiApex("tipo=painel_cirurgia/resultados/1903/"+itemsApex.cirurgia+"/15755", false, setResultadosAmarelos15755, true)
          
            //VERDE - Antes da Incisão Cirúrgica ( 1945 )
            useApiApex("tipo=painel_cirurgia/resultados/1945/"+itemsApex.cirurgia+"/15787", false, setResultadosVerdes15787, true)
            useApiApex("tipo=painel_cirurgia/resultados/1945/"+itemsApex.cirurgia+"/15761", false, setResultadosVerdes15761, true)
            useApiApex("tipo=painel_cirurgia/resultados/1945/"+itemsApex.cirurgia+"/15762", false, setResultadosVerdes15762, true)
            useApiApex("tipo=painel_cirurgia/resultados/1945/"+itemsApex.cirurgia+"/15794", false, setResultadosVerdes15794, true)
            useApiApex("tipo=painel_cirurgia/resultados/1945/"+itemsApex.cirurgia+"/15810", false, setResultadosVerdes15810, true)
            useApiApex("tipo=painel_cirurgia/resultados/1945/"+itemsApex.cirurgia+"/15822", false, setResultadosVerdes15822, true)
            useApiApex("tipo=painel_cirurgia/resultados/1945/"+itemsApex.cirurgia+"/15823", false, setResultadosVerdes15823, true)
           
            //VERMELHO - Antes da Saída da Sala ( 1964 )
            useApiApex("tipo=painel_cirurgia/resultados/1964/"+itemsApex.cirurgia+"/15840", false, setResultadosVermelho15840, true)
            useApiApex("tipo=painel_cirurgia/resultados/1964/"+itemsApex.cirurgia+"/15841", false, setResultadosVermelho15841, true)
            useApiApex("tipo=painel_cirurgia/resultados/1964/"+itemsApex.cirurgia+"/15842", false, setResultadosVermelho15842, true)
            useApiApex("tipo=painel_cirurgia/resultados/1964/"+itemsApex.cirurgia+"/15843", false, setResultadosVermelho15843, true)
            useApiApex("tipo=painel_cirurgia/resultados/1964/"+itemsApex.cirurgia+"/15844", false, setResultadosVermelho15844, true)
        
        }

    }, [nrResultadoCirurgia, painel, itemsApex, setItemsApex, setNrResultadoCirurgia,
        setResultadosVermelho15840,setResultadosVermelho15841,setResultadosVermelho15842,setResultadosVermelho15843,setResultadosVermelho15844,
        setResultadosVerdes15787,setResultadosVerdes15761,setResultadosVerdes15762,setResultadosVerdes15794,setResultadosVerdes15810,setResultadosVerdes15822,setResultadosVerdes15823,
        setResultadosAmarelos15653, setResultadosAmarelos15657,setResultadosAmarelos15730, setResultadosAmarelos15733,setResultadosAmarelos15737, setResultadosAmarelos15738, setResultadosAmarelos15742, setResultadosAmarelos15743, setResultadosAmarelos15751, setResultadosAmarelos15752, setResultadosAmarelos15754, setResultadosAmarelos15755,
        setIsNotLoadingAmarelo, setIsNotLoadingVerde, setIsNotLoadingVermelho, isNotLoadingAmarelo, isNotLoadingVerde, isNotLoadingVermelho])

    if(itemsApex !== null) dados = {...itemsApex}
    if(resultadosVermelho15840 !== null) resultadosVermelho.res15840 = resultadosVermelho15840.qtd
    if(resultadosVermelho15841 !== null) resultadosVermelho.res15841 = resultadosVermelho15841.qtd
    if(resultadosVermelho15842 !== null) resultadosVermelho.res15842 = resultadosVermelho15842.qtd
    if(resultadosVermelho15843 !== null) resultadosVermelho.res15843 = resultadosVermelho15843.qtd
    if(resultadosVermelho15844 !== null) resultadosVermelho.res15844 = resultadosVermelho15844.qtd

    if(resultadosVerdes15787 !== null) resultadosVerdes.res15787 = resultadosVerdes15787.qtd
    if(resultadosVerdes15761 !== null) resultadosVerdes.res15761 = resultadosVerdes15761.qtd
    if(resultadosVerdes15762 !== null) resultadosVerdes.res15762 = resultadosVerdes15762.qtd
    if(resultadosVerdes15794 !== null) resultadosVerdes.res15794 = resultadosVerdes15794.qtd
    if(resultadosVerdes15810 !== null) resultadosVerdes.res15810 = resultadosVerdes15810.qtd
    if(resultadosVerdes15822 !== null) resultadosVerdes.res15822 = resultadosVerdes15822.qtd
    if(resultadosVerdes15823 !== null) resultadosVerdes.res15823 = resultadosVerdes15823.qtd

    if(resultadosAmarelos15653 !== null) resultadosAmarelos.res15653 = resultadosAmarelos15653.qtd 
    if(resultadosAmarelos15657 !== null) resultadosAmarelos.res15657 = resultadosAmarelos15657.qtd
    if(resultadosAmarelos15730 !== null) resultadosAmarelos.res15730 = resultadosAmarelos15730.qtd 
    if(resultadosAmarelos15733 !== null) resultadosAmarelos.res15733 = resultadosAmarelos15733.qtd
    if(resultadosAmarelos15737 !== null) resultadosAmarelos.res15737 = resultadosAmarelos15737.qtd 
    if(resultadosAmarelos15738 !== null) resultadosAmarelos.res15738 = resultadosAmarelos15738.qtd 
    if(resultadosAmarelos15742 !== null) resultadosAmarelos.res15742 = resultadosAmarelos15742.qtd 
    if(resultadosAmarelos15743 !== null) resultadosAmarelos.res15743 = resultadosAmarelos15743.qtd 
    if(resultadosAmarelos15751 !== null) resultadosAmarelos.res15751 = resultadosAmarelos15751.qtd 
    if(resultadosAmarelos15752 !== null) resultadosAmarelos.res15752 = resultadosAmarelos15752.qtd 
    if(resultadosAmarelos15754 !== null) resultadosAmarelos.res15754 = resultadosAmarelos15754.qtd 
    if(resultadosAmarelos15755 !== null) resultadosAmarelos.res15755 = resultadosAmarelos15755.qtd

    if(isNotLoadingVerde !== null) statusLoadingTela.isNotLoadingVerde = isNotLoadingVerde.qtd 
    if(isNotLoadingAmarelo !== null) statusLoadingTela.isNotLoadingAmarelo = isNotLoadingAmarelo.qtd 
    if(isNotLoadingVermelho !== null) statusLoadingTela.isNotLoadingVermelho = isNotLoadingVermelho.qtd 

    setTimeout(function(){
        window.location.reload(false)
    },60000)

    return (
        <Container fluid style={{ height: window.innerHeight-275+'px' }} className="painelChecklist">
            <Row>
                <Col xs={12} className="p-1">
                    <div className="p-1 bg-primary m-1 mt-0 mb-0 rounded">
                        <Toast style={stylePage.toast}>
                            <ToastHeader style={stylePage.toast} className="py-0">
                            <Row>
                                <Col xs={1}>
                                    <Link to="/"><img src={Logotipo} alt="Logotipo" className="img-fluid pt-2" style={{ maxWidth: '80px' }} /></Link>
                                </Col>
                                <Col xs={10} style={{textAlign: 'center'}}>
                                   <h3 className="pt-2">Nº da Cirurgia: {dados.cirurgia}</h3>
                                </Col>
                                <Col xs={1} style={{textAlign: 'right'}}>
                                    <h3 className="m-0"><AirlineSeatFlat className="pb-0" style={{fontSize: '60px', color: '#0D6DFB'}}/></h3>
                                </Col>
                            </Row>
                            </ToastHeader>
                            <ToastBody>
                                <Row className="dadosCirurgia">
                                    <Col xs={4}>
                                        <div><strong>Paciente:</strong> {dados.paciente}</div>
                                        <div><strong>Cirurgião:</strong> {dados.cirurgiao}</div>
                                        <div><strong>Anestesiologiasta:</strong> {dados.anestesista}</div>
                                    </Col>
                                    <Col xs={4}>
                                        <div><strong>Enfermeiro(a):</strong> {dados.enfermeiro}</div>
                                        <div><strong>Circulante:</strong> {dados.circulante}</div>
                                        <div><strong>Instrumentador:</strong> {dados.instrumentador}</div>
                                    </Col>
                                    <Col xs={4}>
                                        <div><strong>Data:</strong> {dados.data_cirurgia}</div>
                                        <div><strong>Hora:</strong> {dados.hora_cirurgia}</div>
                                        <div><strong>Leito:</strong> {painel}</div>
                                    </Col>
                                    <Col xs={12}>
                                        <div><strong>Procedimento:</strong> {dados.procedimento}</div>
                                    </Col>
                                </Row>
                            </ToastBody>
                        </Toast>
                    </div>
                </Col>
            </Row>
            <Row className="h-100">
                <Col xs={4} className="p-1">
                    <div className="p-1 bg-warning m-1 mt-0 rounded h-100">
                        <Toast style={stylePage.toast} className="h-100">
                            <ToastHeader style={stylePage.toast}>
                                <Row>
                                    <Col xs={2}>
                                        <CleanHands className="pb-1" style={{fontSize: '30px', marginTop: '3px', color: '#EEB407'}}/>
                                    </Col>
                                    <Col xs={8} className="p-0" style={{textAlign: 'center'}}>
                                        <h5 className="pt-1 h5Checklist">Antes do Início da Anestesia</h5>
                                    </Col>
                                    <Col xs={2} style={{textAlign: 'right'}}>
                                        <CleanHands className="pb-1" style={{fontSize: '30px', marginTop: '3px', color: '#EEB407'}}/>
                                    </Col>
                                </Row>
                            </ToastHeader>
                            <ToastBody className="p-1">
                                <Row>
                                    <Col xs={12} hidden={statusLoadingTela.isNotLoadingAmarelo} style={{ marginTop: '40%'}}>
                                    <Lottie options={defaultOptions.NotLoadingAmarelo} height={200}
                                        width={300}
                                        isStopped={false}
                                        isPaused={false}/>
                                    </Col>
                                    <Col xs={12} hidden={!statusLoadingTela.isNotLoadingAmarelo}>
                                        <Alert color="secundary"  className="m-1 p-2" style={{ background: '#feffea' }}>
                                            <h6 className="p-0 m-0">{retornaIconeCheckNaoCheck(resultadosAmarelos.res15653)} Enfermagem Confirma</h6>
                                            <p>- Identidade, Procedimento e Sítio Cirúrgico</p>
                                            <p>- Consentimento Informado Assinado e na Pasta</p>
                                            <p className="mt-2">{retornaIconeCheckNaoCheck(resultadosAmarelos.res15657)} Sítio Cirúrgico Demarcado/Não Procede</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15730)} Revisão dos Equipamentos de Anestesia</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15733)} Oximetro de Pulso Instalado e Funcionando</p>
                                        </Alert>
                                        <Alert color="secundary" className="m-1 p-2" style={{ background: '#feffea' }}>
                                            <h6 className="pt-0">Alergias Conhecidas</h6>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15737)} Não</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15738)} Sim</p>
                                        </Alert>
                                        <Alert color="secundary" className="m-1 p-2" style={{ background: '#feffea' }}>
                                            <h6 className="pt-0">Via Aéria Difícil/Risco Aspiração</h6>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15742)} Não</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15743)} Sim, e Há Material Necessário/Ajuda Disponível</p>
                                        </Alert>
                                        <Alert color="secundary" className="m-1 p-2" style={{ background: '#feffea' }}>
                                            <h6 className="pt-0">Risco de Sangramento Acima de 500ml ( 7ml/kg em crianças )</h6>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15751)} Não</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15752)} Sim, e Apresenta Acesso Venoso Adequado/Líquidos e Sangue à Disposição</p>
                                        </Alert>
                                        <Alert color="secundary" className="m-1 p-2" style={{ background: '#feffea' }}>
                                            <h6 className="pt-0">Exames Diagnósticos Necessários Estão Disponíveis</h6>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15754)} Sim</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosAmarelos.res15755)} Não Procede</p>
                                        </Alert>
                                    </Col>
                                </Row>
                            </ToastBody>
                        </Toast>
                    </div>
                </Col>
                <Col xs={4} className="p-1">
                    <div className="p-1 bg-success m-1 mt-0 rounded h-100">
                        <Toast style={stylePage.toast} className="h-100">
                            <ToastHeader style={stylePage.toast}>
                                <Row>
                                    <Col xs={2}>
                                        <MedicalServicesRoundedIcon className="pb-1" style={{fontSize: '30px', marginTop: '3px', color: '#198553'}}/>
                                    </Col>
                                    <Col xs={8} className="p-0" style={{textAlign: 'center'}}>
                                        <h5 className="pt-1 h5Checklist">Antes da Incisão Cirúrgica</h5>
                                    </Col>
                                    <Col xs={2} style={{textAlign: 'right'}}>
                                        <MedicalServicesRoundedIcon className="pb-1" style={{fontSize: '30px', marginTop: '3px', color: '#198553'}}/>
                                    </Col>
                                </Row>
                            </ToastHeader>
                            <ToastBody className="p-1">
                                <Row>
                                    <Col xs={12} hidden={statusLoadingTela.isNotLoadingVerde} style={{ marginTop: '40%'}}>
                                        <Lottie options={defaultOptions.NotLoadingVerde} height={200}
                                            width={300}
                                            isStopped={false}
                                            isPaused={false}/>
                                    </Col>                                
                                    <Col xs={12} hidden={!statusLoadingTela.isNotLoadingVerde} >
                                        <Alert color="secundary" className="m-1 p-2" style={{ background: '#eaffee' }}>
                                            <h6 className="pt-0">{retornaIconeCheckNaoCheck(resultadosVerdes.res15787)} Confirmar se Todos Os Membros da Equipe se Apresentaram por Nome e Função</h6>
                                        </Alert>
                                        <Alert color="secundary"  className="m-1 p-2" style={{ background: '#eaffee' }}>
                                            <h6 className="pt-0">Patologia de Risco para Equipe</h6>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVerdes.res15761)} Não</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVerdes.res15762)} Sim ( Hepatite B ou C/HIV )</p>
                                            <h6 className="pt-2">{retornaIconeCheckNaoCheck(resultadosVerdes.res15794)} Equipe Confirma Verbalmente</h6>
                                            <p>- Identidade do Paciente, Procedimento e Sítio Cirúrgico</p>
                                            <h6 className="pt-2">{retornaIconeCheckNaoCheck(resultadosVerdes.res15810)} Previsão de Eventos Críticos</h6>
                                            <p><strong>Cirurgião</strong></p>
                                            <p>- Pontos Críticos</p>
                                            <p>- Duração da Cirurgia</p>
                                            <p><strong>Anestesiologista</strong></p>
                                            <p>- Se há Algum Problema Específico com o Paciente</p>
                                            <p><strong>Enfermagem</strong></p>
                                            <p>- Confirma Esterilização</p>
                                            <p>- Instrumental Disponível</p>
                                            <p>- Material Específico</p>
                                        </Alert>
                                        <Alert color="secundary" className="m-1 p-2" style={{ background: '#eaffee' }}>
                                            <h6 className="pt-0">Antibioticoterapia Profilática nos Últimos 60 Min</h6>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVerdes.res15822)} Sim</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVerdes.res15823)} Não Procede</p>
                                        </Alert>
                                    </Col>
                                </Row>
                            </ToastBody>
                        </Toast>
                    </div>
                </Col>
                <Col xs={4} className="p-1">
                    <div className="p-1 bg-danger m-1 mt-0 rounded h-100 bg-dangerRosa">
                        <Toast style={stylePage.toast} className="h-100">
                            <ToastHeader style={stylePage.toast}>
                                <Row>
                                    <Col xs={2}>
                                        <ExitToApp className="pb-1" style={{fontSize: '30px', marginTop: '3px', color: '#FFDAEC'}}/>
                                    </Col>
                                    <Col xs={8} className="p-0" style={{textAlign: 'center'}}>
                                        <h5 className="pt-1 h5Checklist">Antes da Saída da Sala</h5>
                                    </Col>
                                    <Col xs={2} style={{textAlign: 'right'}}>
                                        <ExitToApp className="pb-1" style={{fontSize: '30px', marginTop: '3px', color: '#FFDAEC'}}/>
                                    </Col>
                                </Row>
                            </ToastHeader>
                            <ToastBody className="p-1 v-100">
                                <Row className="v-100">
                                    <Col xs={12} hidden={statusLoadingTela.isNotLoadingVermelho} style={{ marginTop: '40%'}}>
                                    <Lottie options={defaultOptions.NotLoadingVermelho} height={200}
                                        width={300}
                                        isStopped={false}
                                        isPaused={false}/>
                                    </Col>
                                    <Col xs={12} hidden={!statusLoadingTela.isNotLoadingVermelho}>
                                        <Alert color="secundary"  className="m-1 p-2" style={{ background: '#ffffff73' }}>
                                            <h6 className="pt-0">Enfermagem Confirma Verbalmente com a Equipe</h6>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVermelho.res15840)} Nome do Procedimento Realizado</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVermelho.res15841)} Contagem de Gaze, Compressas, Agulhas ou Materiais está Correta</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVermelho.res15842)} Material Biológico Etiquetado Corretamente</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVermelho.res15843)} Há Problemas a Resolver com Materiais e Equipamentos</p>
                                            <p>{retornaIconeCheckNaoCheck(resultadosVermelho.res15844)} Cirurgião, anestesiologista e Enfermeiro Revisam Principais Aspectos da Recuperação do Paciente</p>
                                        </Alert>
                                    </Col>
                                </Row>
                            </ToastBody>
                        </Toast>
                    </div>
                </Col>
            </Row>
        </Container>        
    );
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

export default PainelCirurgia;
