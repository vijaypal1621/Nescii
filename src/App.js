import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Notices from "./Notices";

function App() {
  return (
    <div className="app">
        {/* header */}
        <Header />
        <div className='app__body '>
          {/* leftsidebar */}
          <Sidebar />
          <Feed />
          <Notices />
        {/* main */}
        {/* right sidebar */}
      </div>
    </div>
  );
}

export default App;
