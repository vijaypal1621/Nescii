import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Society from "./Society";

function App() {
  return (
    <div className="app">
      {/* header */}
      <Header />
      <div className="app__body ">
        {/* <Home /> */}
        <Society />
      </div>
    </div>
  );
}

export default App;
