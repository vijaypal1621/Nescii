import React from 'react';
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Notices from "./Notices";


function Home() {
    return (
        <div className='home row'>
            <div className="d-none d-md-block col-md-3 col-xl-2" style={{padding:"0"}}>
                <Sidebar />
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-xl-6 " style={{padding:"0"}}>
                <Feed />
            </div>
            <div className="d-none d-md-block col-md-3 col-xl-4" style={{padding:"0"}}>
                <Notices />
            </div>
        </div>
    )
}

export default Home;
