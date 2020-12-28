import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Feed from './Feed';


function App() {
  return (
    <div className="app">
        {/* header */}
        <Header />
        <div className='app__body'>
          {/* leftsidebar */}
          <Sidebar />
          <Feed />
        
        {/* main */}
        {/* right sidebar */}
        </div>
        

    </div>
  );
}

export default App;
