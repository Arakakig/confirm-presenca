import React from 'react'
import { CSVLink } from "react-csv";
import './emitcsv.css'

function EmitCsv(props) {
    // Converte os dados do groupParticipantes para o formato esperado pela biblioteca react-csv
    const csvData = props.groupParticipantes.map(({ name, numero, nome_responsavel, numero_responsavel, pago, chegou, cpf, id }) => ({
        name,
        numero,
        nome_responsavel,
        numero_responsavel,
        chegou: chegou ? "Sim" : "Não",
        pago: pago ? "Sim" : "Não",
        id
      }));

    // Define as configurações do arquivo CSV
    const csvHeaders = [
      { label: "Nome", key: "name" },
      { label: "Telefone", key: "numero" },
      { label: "Nome Responsável", key: "nome_responsavel" },
      { label: "Numero do Responsável", key: "numero_responsavel" },
      { label: "Chegou", key: "chegou" },
      { label: "Pago", key: "pago" },
      { label: "ID", key: "id" }
    ];
  
    // Define o nome do arquivo CSV
    const fileName = "groupParticipantes.csv";
  
    // Renderiza o link de download do arquivo CSV com os dados do groupParticipantes
    return (
      <CSVLink data={csvData} headers={csvHeaders} filename={fileName} className='export-btn'>
        Imprimir CSV
      </CSVLink>
    );
  }
  
export default EmitCsv