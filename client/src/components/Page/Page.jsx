 import React from 'react';
 import { Link } from 'react-router-dom';

 import './Page.css';


 
 function Page() {

     return (
         <div className='page'>
             <div className='container'>
             <h1 className='title'><b>Mi aplicacion de<br></br>
                  videojuegos</b></h1><div className='img'></div>
             </div>
             <div><Link to='/home'><button className='entrar' type='submit'><b>Entrar</b></button></Link></div>
         </div>
     )
 }
     
 
 
 export default Page
 