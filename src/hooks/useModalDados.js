import React, { useState, useEffect } from "react";
import { AirlineSeatFlat, AppRegistration, MedicalServices } from "@mui/icons-material";
import { Button, Table, Modal, Col, Row, } from "react-bootstrap";
import moment from "moment";
import useApiApex from "./useApiApex";

function MyVerticallyCenteredModal(props) {
  
  const [dadosModal,setDadosModal] = useState([])
  if(props.show && props.dados !== undefined && props.dados.atendimento !== undefined){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useApiApex('tipo=painel_emergencia_pa/rel_exames/'+props.dados.atendimento,false,setDadosModal,false)
  }else{
    if(dadosModal.length !== 0) setDadosModal([])
  }

  //const fechaModal = (props) => {
 //   setDadosModal(null)
  //  return ( )
 // }

    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Row>
                <Col xs={1}>
                    <AirlineSeatFlat fontSize="40px" className={"card-title-icon card-color-"+props.cssStatus}/>
                </Col>
                <Col xs={10} className="p-0">
                    <h5>{((props.dados !== undefined && props.dados.atendimento !== undefined)?props.dados.atendimento:'')} - {((props.dados !== undefined && props.dados.paciente !== undefined)?props.dados.paciente:'')}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={1}>
                    <MedicalServices fontSize="40px" className={"card-title-icon card-color-"+props.cssStatus}/>
                </Col>
                <Col xs={10} className="p-0">
                    <h5>{((props.dados !== undefined && props.dados.medico !== undefined)?props.dados.medico:'')}</h5>
                </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row hidden={dadosModal.length === 0}>
            <Table striped className="tableExamesApex">
                          <thead>
                            <tr>
                              <th>Tipo</th>
                              <th>Procedimento</th>
                              <th>Data Solicitação</th>
                              <th>Data Coleta</th>
                              <th>Data Liberação</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                {
                    dadosModal.map(function(dados, index){
                      return (
                          
                            <tr key={index}>
                              <td>{dados.tipo}</td>
                              <td>{dados.ds_procedimento}</td>
                              <td>{moment(dados.data_solicitacao).format('DD/MM/YYYY HH:mm:ss')}</td>
                              <td>{((dados.dt_coleta!==null)?moment(dados.dt_coleta).format('DD/MM/YYYY HH:mm:ss'):((dados.tipo === 'Lab')?'Não coletado':'Não se aplica'))}</td>
                              <td>{((dados.data_liberacao!==null)?moment(dados.data_liberacao).format('DD/MM/YYYY HH:mm:ss'):'')}</td>
                              <td>{(dados.data_liberacao !== null)?'Liberado':'Aguardando'}</td>
                            </tr>
                          
                      )
                    })
                }
                </tbody>
              </Table>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ props.onHide }>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
const ModalDadosHED = (props) => {

    return (
      <>  
        <MyVerticallyCenteredModal
          show={props.modalShow}
          dados={props.dados}
          onHide={() => {
              props.setModalShow(false)
              setTimeout(function(){
                window.location.reload(false)
                
            },30000)
            }
          }
        >
          {props.children}
        </MyVerticallyCenteredModal>
      </>
    );
  }

export default ModalDadosHED;
  