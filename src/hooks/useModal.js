import React, { useState, useEffect } from "react";
import { AirlineSeatFlat, AppRegistration, MedicalServices } from "@mui/icons-material";
import { Button, Table, Modal, Col, Row, } from "react-bootstrap";
import moment from "moment";
import useApiApex from "./useApiApex";

function MyVerticallyCenteredModal(props) {
  
  const [dadosModal,setDadosModal] = useState([])
  //if(props.show && props.dados !== undefined && props.dados.atendimento !== undefined){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    //useApiApex('tipo=painel_emergencia_pa/rel_exames/'+props.dados.atendimento,false,setDadosModal,false)
  //}else{
  //  if(dadosModal.length !== 0) setDadosModal([])
  //}

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
                <Col xs={12}>
                    <h5>{((props.dados !== undefined && props.dados.title !== undefined)?props.dados.title:'Aviso')}</h5>
                </Col>
            </Row>
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
          dados={props.dados}
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
  