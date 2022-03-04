import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function AdminRoute({ component: Component, ...rest }) {
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
