/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import './Paginado.css';


 function Paginado ({videogamesPerPage, cantGames, paginado, currentPage}) {

    const pageNumbers = [];

    
    for(let i = 0; i <= Math.floor(cantGames/videogamesPerPage); i++) {
        pageNumbers.push(i+1)
    }

    return (
        <nav className="paginado">

            {
                pageNumbers && pageNumbers.map(number => {

                    if (currentPage === number) {
                        return (
                            <div key={number} id="selected" className="item">

                                <button onClick={() => paginado(number)}><b>{number}</b></button>
                            </div>

                        )
                    } else {
                        return (
                            <div key={number} className="item">

                                <button onClick={() => paginado(number)}>{number}</button>
                            </div>
                        )
                    }

                })
            }
             </nav>
    )
}

export default Paginado;


