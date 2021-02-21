import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Resources from './Resources';
import Society from "./Society";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import { useStateValue } from "./StateProvider";
import Login from "./Login";

const store = ConfigureStore();

function App() {
  const [{ user }] = useStateValue();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          {!user ? (
            <Login />
          ) : (
            <>
              <Header />
              <div className="app__body ">
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/societies" component={Society} />
                  <Route path="/resources" component={Resources} />
                  <Redirect to="/home" />
                </Switch>
              </div>
            </>
          )}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
