import React from 'react';
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Notices from "./Notices";


function Home() {
    return (
        <div className='home' style={{'display':'flex'}}>
            <Sidebar />
            <Feed />
            <Notices />
        </div>
    )
}

export default Home;
