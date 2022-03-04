import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

export default function PrivateRoute({ component: Component, ...rest }) {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.adminUser ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/home"></Redirect>
        )
      }
    ></Route>
  );
}
