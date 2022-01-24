import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ isLoginRegister, component: Component, ...rest }) => {
  const dataReducer = useSelector((state) => state.data);
  const { jwtToken = "" } = dataReducer;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoginRegister && !jwtToken) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        }
        if (isLoginRegister && jwtToken) {
          // logged in so redirect to home page with the return url
          return <Redirect to={{ pathname: "/home", state: { from: props.location } }} />;
        }
        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
