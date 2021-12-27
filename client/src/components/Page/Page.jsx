 import React from 'react';
 import { Link } from 'react-router-dom';

 import './Page.css';


 
 function Page() {

    return (
        <div className='page'>
            <div className='title'>
               <h2>App VideoGames</h2>
                <Link to='/home'>
                    <button className='title' type='submit'>
                        Home
                    </button>
                </Link>
            </div>
        </div>
    )

    
    }
     
 
 
 export default Page
 