import React from 'react';
import './SocietySidebarOption.css';
import {useHistory} from 'react-router-dom';

function SocietySidebarOption({url,id,title}) {

    const history = useHistory();

    const selectSociety = () => {
        if(id){
            history.push(`/societies/${id}`)
        }
    }



    return (
        <div className='sidebarOption active__society' onClick={selectSociety} >
            <img src={url} alt={title}/>
            <h3>{title}</h3>
        </div>
    )
}

export default SocietySidebarOption;
