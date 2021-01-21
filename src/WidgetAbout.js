import React from 'react';
import "./WidgetAbout.css";


function WidgetAbout({society}) {
        return (
            <div className='about'>
                <h2>About</h2>
                <p>{!society?(""):(society.about)}
                </p>
            </div>
        )
    

    
}

export default WidgetAbout;
