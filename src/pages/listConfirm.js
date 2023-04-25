import React, { useState, useEffect } from 'react';
import Confirm from '../components/confirm';
import './listconfirm.css';
import EmitCsv from '../components/emitcsv';
import Inputpartic from '../components/inputpartic'
import logo from '../assets/logoRetiro.png'
function ListConfirm() {
    const [groupParticipantes, setGroupParticipantes] = useState([
    ]);
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [participante, setParticipante] = useState({});
    const [filterName, setFilterName] = useState(''); // Estado para armazenar o valor do filtro de nome

    function closeEditModal() {
        setEditModalIsOpen(false);
    }



    function printModal(element) {
        setParticipante(element)
        setEditModalIsOpen(true);
    }

    // Função para filtrar os participantes pelo nome
    function handleFilterName(e) {
        setFilterName(e.target.value);
    }

    // Filtrar os participantes pelo nome
    const filteredGroupParticipantes = groupParticipantes.filter(participante => {
        return participante.name.toLowerCase().includes(filterName.toLowerCase());
    });
   
    return (
        <section className='d-flex flex-column gap-4 w-100 justify-content-center mt-4'>
            <div className='title'>
            <Inputpartic groupParticipantes={groupParticipantes} setGroupParticipantes={setGroupParticipantes}/>
                <img src={logo} width={150}/>
                <hr style={{width:'100%', backgroundColor:'#000', height: '10px'}}/>
                <h2>Lista de Presença - RETILIVRES 2023</h2>
            </div>
            <div>
                <input type="text" placeholder="Filtrar por nome" value={filterName} onChange={handleFilterName} />
            </div>
            <div className='w-100 d-flex justify-content-center'>
                <div className='buttons-emit'>
                    <EmitCsv groupParticipantes={groupParticipantes} />
                </div>
            </div>

            <div className='list-items'>
                {filteredGroupParticipantes.map((element, index) => {
                    return (
                        <div key={index} className='w-100 d-flex justify-content-center'>
                            {element.chegou &&
                                <div className='item-confirm confirmado' onClick={() => printModal(element, index)}>{element.name}</div>
                            }
                            {!element.chegou &&
                                <div className='item-confirm desconfirmado' onClick={() => printModal(element, index)}>{element.name}</div>
                            }
                        </div>
                    );
                })}
             <Confirm item={participante} show={editModalIsOpen} setGroupParticipantes={setGroupParticipantes} groupParticipantes={groupParticipantes} onHide={closeEditModal} />
            </div>
        </section>
    );
}

export default ListConfirm;
