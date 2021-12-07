import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Moment from "react-moment";
import useApiApex from "./useApiApex";

function MyVerticallyCenteredModal(props) {
  
  const [dadosModal,setDadosModal] = useState(null)
  if(props.show && props.atendimento !== undefined){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useApiApex('tipo=painel_emergencia_pa/exames/'+props.atendimento,false,setDadosModal,false)
  }else{
    if(dadosModal !== null) setDadosModal(null)
  }

  //const fechaModal = (props) => {
 //   setDadosModal(null)
  //  return ( )
 // }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
             Atendimento Médico {props.atendimento}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {
          (dadosModal !== null) 
          ? dadosModal.map(function(dados, index){
            return( <Row key={index} >
                <Col xs={12}>Tipo: {dados.tipo}</Col>
                <Col xs={12}>Data Solicitação: <Moment format="DD/MM/YYYY à\s hh:MM:ss">{dados.data_solicitacao}</Moment></Col>
                <Col xs={12}>Data Liberação: <Moment>{dados.data_liberacao}</Moment></Col>
              </Row> )
            })
          : <Row>
            <Col xs={12}>AGUARDANDO</Col>
          </Row>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ props.onHide }>Fechar</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
const ModalHED = (props) => {

    return (
      <>  
        <MyVerticallyCenteredModal
          show={props.modalShow}
          atendimento={props.atendimento}
          onHide={() => {
              props.setModalShow(false)
            }
          }
        />
      </>
    );
  }

export default ModalHED;
  