import "./App.css";
import Header from "./Header";
import Home from './Home';

function App() {
  return (
    <div className="app">
        {/* header */}
        <Header />
        <div className='app__body '>
          <Home />



      </div>
        
    </div>
  );
}

export default App;
