import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";

import App from "./components/App";
import Signin from "./components/auth/Signin";
import Signout from "./components/auth/Signout";
import Home from "./components/Home";
import HeatMap from "./components/HeatMap";
import Select from "./components/Select";

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem("token") }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Signin} />
          <Route
            path="/home"
            render={() => (
              <div>
                <Home />
              </div>
            )}
          />
          <Route
            path="/heat"
            render={() => (
              <div>
                <HeatMap />
              </div>
            )}
          />
          <Route
            path="/select"
            render={() => (
              <div>
                <Select />
              </div>
            )}
          />
          <Route
            path="/signout"
            render={() => (
              <div>
                <Signout />
              </div>
            )}
          />
        </Switch>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
