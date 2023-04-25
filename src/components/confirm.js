import React, { memo } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './confirm.css'

function Confirm(props) {
  const { show, onHide, item, groupParticipantes, setGroupParticipantes } = props;

  function ChangeElement() {
    const indexAux = groupParticipantes.indexOf(item);
    const participante = { ...item, chegou: !item.chegou };
    const updatedGroupParticipantes = [...groupParticipantes];
    updatedGroupParticipantes[indexAux] = participante;
    setGroupParticipantes(updatedGroupParticipantes);
    onHide();
  }

  return (
    <>
      <Modal show={show} onHide={onHide} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className='d-flex gap-2 justify-content-center w-100'>
            {item.chegou && <h3>Desconfirmar Presença</h3>}
            {!item.chegou && <h3>Confirmar Presença</h3>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-column gap-2 justify-content-center w-100'>
            <div className='d-flex gap-2 justify-content-center w-100'>
              <h5>Nome do Participante:</h5>
              <h5>{item.name}</h5>
            </div>
            <div className='d-flex gap-2 justify-content-center w-100'>
              <h5>Telefone do Participante:</h5>
              <h5>{item.numero}</h5>
            </div>
            <div className='d-flex gap-2 justify-content-center w-100'>
              <h5>Nome do Responsável:</h5>
              <h5>{item.nome_responsavel}</h5>
            </div>
            <div className='d-flex gap-2 justify-content-center w-100'>
              <h5>Telefone do Responsável:</h5>
              <h5>{item.numero_responsavel}</h5>
            </div>
            <div className='d-flex gap-2 justify-content-center w-100'>
              <h5>Pago:</h5>
              <h5>{item.pago ? "Sim" : "Não"}</h5>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex gap-2 justify-content-center w-100'>
            <Button variant="secondary" className='btn-confirm' onClick={onHide}>
              Cancelar
            </Button>
            {item.chegou ? (
              <Button
                variant="danger"
                onClick={ChangeElement}
                className='btn-enter btn-confirm'
              >
                Desmarcar Presença
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={ChangeElement}
                className='btn-enter btn-confirm'
              >
                Confirmar Presença
              </Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default memo(Confirm);
