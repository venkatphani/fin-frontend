import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { setToken } from "./apis";
import { useHistory } from "react-router-dom";

const App = (props) => {
  const { children } = props;
  const dataReducer = useSelector((state) => state.data);
  const { jwtToken = "" } = dataReducer;
  const history = useHistory();
  useEffect(() => {
    if (jwtToken) {
      setToken(jwtToken);
    }
  }, [jwtToken, history]);
  return <div>{children}</div>;
};

export default App;
