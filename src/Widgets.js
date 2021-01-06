import React from 'react';
import './Widgets.css';
import Events from './Events';
import WidgetAbout from './WidgetAbout';
function Widgets() {
    return (
        <div className='widgets'>
            <Events />
            <WidgetAbout />
        </div>
    )
}

export default Widgets;
