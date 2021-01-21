import React from 'react';
import "./WidgetAbout.css";


function WidgetAbout({society}) {
    if(society===null){
        return(
            <div className='about'>
                <h2>About</h2>
            </div>
        )
    }
    else{
        return (
            <div className='about'>
                <h2>About</h2>
                <p>{society.about}
                </p>
            </div>
        )
    }

    
}

export default WidgetAbout;
