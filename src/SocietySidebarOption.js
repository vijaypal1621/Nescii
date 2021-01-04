import React from 'react';
import './SocietySidebarOption.css';

function SocietySidebarOption({url,title}) {
    return (
        <div className='sidebarOption'>
            <img src={url} alt={title}/>
            <h3>{title}</h3>
        </div>
    )
}

export default SocietySidebarOption;
