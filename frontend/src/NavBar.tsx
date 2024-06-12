import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <>
        <div className='navBar' style={{display: "flex", justifyContent: "space-around", flex: 1, flexDirection: "row"}}>
            <div className='Standings'>
                <Link to="/">Standings</Link> 
            </div>
            <div className='Games'>
                <Link to="/games">Games</Link>
            </div>
        </div>
        </>
    )
}

export default NavBar