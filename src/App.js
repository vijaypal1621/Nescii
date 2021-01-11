import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Society from "./Society";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <div className="app__body ">
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/societies" component={Society} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
