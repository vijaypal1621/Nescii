import React from 'react';
import './Widgets.css';
import Events from './Events';
import WidgetAbout from './WidgetAbout';
function Widgets({society}) {
    return (
        <div className='widgets'>
            <Events  />
            <WidgetAbout society={society}/>
        </div>
    )
}

export default Widgets;
