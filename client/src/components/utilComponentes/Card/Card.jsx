import React from 'react';
import {Link} from 'react-router-dom';


import './Card.css'

const Card = ({image, name,  genres, data}) => {

    return (

        <div className="cardGeneral">
            <div className="container">
                <div className="card">
                <Link to={`/videogame/${data}`}>
                <img className="img" src={image} alt={image} />
                <h3 className="title"><b>{name}</b></h3></Link>
                <h4>{genres.join(',  ')}</h4>
            </div>
            </div>
          </div>
    )
}

export default Card
