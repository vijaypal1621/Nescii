import "./App.css";
import Header from "./Header";
<<<<<<< HEAD
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Notices from "./Notices";
=======
import Home from './Home';
import Society from './Society';
>>>>>>> d915217c2c101812921b027dab1ff4736f2372ab

function App() {
  return (
    <div className="app">
<<<<<<< HEAD
      {/* header */}
      <Header />
      <div className="app__body ">
        {/* leftsidebar */}
        <Sidebar />
        <Feed />
        {/* main */}
        <Notices />
        {/* right sidebar */}
      </div>
=======
        {/* header */}
        <Header />
        <div className='app__body '>
          {/* <Home /> */}
          <Society />



      </div>
        
>>>>>>> d915217c2c101812921b027dab1ff4736f2372ab
    </div>
  );
}

export default App;
