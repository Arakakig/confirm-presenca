import React, { useState } from 'react';

function uniKey(length = 10) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function Inputpartic(props) {
  const [inputVisible, setInputVisible] = useState(true);
  let users = [];

  async function TransformCsvtoArray(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = e => {
        if (e.target.result == undefined) return false;
        let result = e.target.result.replace(/;/g, ',');
        let aux = result.split(/\r?\n/);
        aux.forEach((elemento, index) => {
          elemento = elemento.replace(/"/g, ''); 
          let dados = elemento.split(',');
          let data = {
            name: dados[0],
            numero: dados[1],
            nome_responsavel: dados[2],
            numero_responsavel: dados[3] != undefined ? dados[3] : '',
            pago: dados[4] == 'Paga' ? true : false,
            chegou: dados[4] == 'Presente' ? true : false,
            id: uniKey()
          }
          users.push(data);
        });
        resolve(users);
      };
      reader.onerror = error => {
        reject(error);
      };
      reader.onloadend = () => {
        sortGroupParticipantesByName(users);
        setInputVisible(false);
      }
    });
  }
  
  function sortGroupParticipantesByName(users) {
    const sortedGroupParticipantes = [...users];
    sortedGroupParticipantes.sort((a, b) => a.name.localeCompare(b.name));
    props.setGroupParticipantes(sortedGroupParticipantes);
  }
  
  return (
    <div  className={inputVisible ? '' : 'hidden'} style={{borderBottom:"2px solid black", marginBottom:"15px", paddingBottom:"15px"}}>
      <h4>Coloque aqui a lista de participantes</h4>
      <input type='file' accept='.csv' onChange={(e) => TransformCsvtoArray(e.target.files[0])} />
    </div>
  )
}

export default Inputpartic;
