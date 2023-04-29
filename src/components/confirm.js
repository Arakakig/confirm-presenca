import React, { memo, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './confirm.css'

function Confirm(props) {
    const { show, onHide, item, groupParticipantes, setGroupParticipantes } = props;

    const [selectedColor, setSelectedColor] = useState(item.grupo);

    const groups = [
        { color: 'Azul', hexadecimal: '0000FF' },
        { color: 'Verde', hexadecimal: '00FF00' },
        { color: 'Amarelo', hexadecimal: 'FFFF00' },
        { color: 'Rosa', hexadecimal: 'FFC0CB' },
        { color: 'Vermelho', hexadecimal: 'FF0000' },
        { color: 'Branco', hexadecimal: 'FFFFFF' },
        { color: 'Laranja', hexadecimal: 'FFA500' },
        { color: 'Preto', hexadecimal: '000000' }
    ];

    function ChangeElement() {
        const indexAux = groupParticipantes.indexOf(item);
        const participante = { ...item, chegou: !item.chegou };
        const updatedGroupParticipantes = [...groupParticipantes];
        updatedGroupParticipantes[indexAux] = participante;
        setGroupParticipantes(updatedGroupParticipantes);
        onHide();
    }

    function handleColorChange(e) {
        setSelectedColor(e.target.value);
        const indexAux = groupParticipantes.indexOf(item);
        const participante = { ...item, grupo: e.target.value };
        const updatedGroupParticipantes = [...groupParticipantes];
        updatedGroupParticipantes[indexAux] = participante;
        setGroupParticipantes(updatedGroupParticipantes);
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
                        {item.numero != '' &&
                            <div className='d-flex gap-2 justify-content-center w-100'>
                                <h5>Telefone do Participante:</h5>
                                <h5>{item.numero}</h5>
                            </div>
                        }

                        {item.nome_responsavel != '' &&
                            <div className='d-flex gap-2 justify-content-center w-100'>
                                <h5>Nome do Responsável:</h5>
                                <h5>{item.nome_responsavel}</h5>
                            </div>
                        }

                        {item.numero_responsavel != '' &&
                            <div className='d-flex gap-2 justify-content-center w-100'>
                                <h5>Telefone do Responsável:</h5>
                                <h5>{item.numero_responsavel}</h5>
                            </div>
                        }

                        <div className='d-flex gap-2 justify-content-center w-100'>
                            <h5>Pago:</h5>
                            <h5>{item.pago ? "Sim" : "Não"}</h5>
                        </div>
                        <div className='d-flex gap-2 justify-content-center w-100'>
                            <h5>Grupo:</h5>
                            <select value={selectedColor} onChange={(e) => {
                              handleColorChange(e)
                            }}>
                                {groups.map((element, index) => (
                                    <option key={index} value={element.color}>{element.color}</option>
                                ))}
                            </select>
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
