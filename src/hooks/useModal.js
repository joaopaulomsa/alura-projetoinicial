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
             {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.children}
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
          title={props.title}
          onHide={() => {
              props.setModalShow(false)
            }
          }
        >
          {props.children}
        </MyVerticallyCenteredModal>
      </>
    );
  }

export default ModalHED;
  