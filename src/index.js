import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const Root = (props) => {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={props.store}>
        <Router>
          <App>{routes}</App>
        </Router>
      </Provider>
    </PersistGate>
  );
};

ReactDOM.render(<Root store={store} />, document.getElementById("root"));
