import React, { useState } from 'react';
import './listGrup.css';

export default function ListGrup(props) {
    const groups = [
        { color: 'Azul', hexadecimal: '0000FF' },
        { color: 'Verde', hexadecimal: '00FF00' },
        { color: 'Amarelo', hexadecimal: 'FFFF00' },
        { color: 'Rosa', hexadecimal: 'FFC0CB' },
        { color: 'Vermelho', hexadecimal: 'FF0000' },
        { color: 'Branco', hexadecimal: 'FFFFFF' },
        { color: 'Laranja', hexadecimal: 'FFA500' },
        { color: 'Preto', hexadecimal: '000000' }
    ]; function getContrastYIQ(hexcolor) {
        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    const [showNames, setShowNames] = useState(false);

    function changeName() {
        if (showNames === false) {
            props.setFilterColor('todos');
            setShowNames(true);
        } else {
            setShowNames(false);
        }

    }
   


    return (
        <div className='d-flex grupos-container'>
            <h3 onClick={() => changeName()} style={{ cursor: 'pointer' }}>Grupos</h3>
            <hr />
            {showNames && (
                <div className='w-100 d-flex justify-content-center text-center'>
                    {groups.map((element, index) => {
                        const textColor = getContrastYIQ(element.hexadecimal);
                        return (
                            <div
                                key={index}
                                className='d-flex justify-content-center align-items-center'
                                style={{
                                    backgroundColor: `#${element.hexadecimal}`,
                                    color: textColor,
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '20px',
                                    margin: '5px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => props.setFilterColor(element.color)}
                            >
                                {element.color.substring(0, 2)}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
}
