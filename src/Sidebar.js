import { Avatar } from '@material-ui/core';
import React from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar__profile'>
                <div className='profile__background'>

                </div>
                <div className='profile__image'>
                    <Avatar className='large' />
                </div>
                <h3 className='profile__name'>Vijay PAL</h3>
                <h4 className='profile__sem'>Sem-4</h4>

            </div>
        </div>
    )
}

export default Sidebar;
