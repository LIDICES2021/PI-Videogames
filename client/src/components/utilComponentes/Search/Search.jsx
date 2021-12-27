import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Search.css";
import { buscarVideogames } from "../../../actions/index";

function Search(props) {

  const [state, setState] = useState({
    name: ""
  })


  let handleChange = (e) => {
    setState({ name: e.target.value });
  }


  let handleSubmit = (e) => {
    e.preventDefault();
    props.buscarVideogames(state.name)
  }

  return (
    <div>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Buscar VideoGames"
            className="input"
            autoComplete="off"
            value={state.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Buscar</button>
        
      
      </form>
      <ul>
        {
          props.search && props.search.map(v => (
            <div key={v.id} className="card">
              <Link to={`/videogame/${v.id}`} >
                <img src={v.image} alt={v.name} width="200px" height="auto"/>
                <div className="container">
                <h4><b>{v.name}</b></h4>
                </div>
               </Link>
               <div className="genres">{v.genres.join(', ')}</div>
               </div>
          ))
        }
      </ul>
    </div>
  );
}

let mapStateToProps = (state) => {
  return {
    search: state.gameSearch
  };
}

let mapDispatchToProps = (dispatch) => {
  return {
    buscarVideogames: name => dispatch(buscarVideogames(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);



/*import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Search.css";
import {buscarVideogames} from "../../../actions/index";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.buscarVideogames(this.state.name)
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <form className="form" onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <input
              type="text"
              placeholder="Buscar VideoGames"
              className="input"
              autoComplete="off"
              value={name}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul>
        {
           this.props.search && this.props.search.map(v => (
            <div key={v.id}> 
            <Link to={`/detalleVideogame/${v.id}`} >
              {v.name}
            </Link>
            <button onClick={() => this.props.buscarVideogames({name: v.name})}>Buscar</button>
            </div>
          ))
         }
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    search: state.gameSearch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
    buscarVideogames: name => dispatch(buscarVideogames(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);*/
