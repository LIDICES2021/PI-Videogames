import React from 'react';


import './Card.css'

const Card = ({image, name,  genres, rating}) => {

    return (

        <div className="cardGeneral">
            <div className="container">
                <div className="card">
                <img className="img" src={image} alt={image} />
                <h3 className="title"><b>{name}</b></h3>
                <h4>{genres.join(',  ')}</h4>
            </div>
            </div>
          </div>
    )
}

export default Card
