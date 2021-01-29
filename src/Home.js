import React from 'react';
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Notices from "./Notices";


function Home() {
    return (
        <div className='home row'>
            <div className="col-md-2" style={{padding:"0"}}>
                <Sidebar />
            </div>
            <div className="col-md-6" style={{padding:"0"}}>
                <Feed />
            </div>
            <div className="col-md-4" style={{padding:"0"}}>
                <Notices />
            </div>
        </div>
    )
}

export default Home;
