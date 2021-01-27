import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Society from "./Society";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from "react-redux";

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
