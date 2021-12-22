import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

export default function PrivateRoute({ component: Component, ...rest }) {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.completedOnboarding ? (
          <Component {...props}></Component>
        ) : user && !user.emailVerified ? (
          <Redirect to="onboarding/verify/email"></Redirect>
        ) : user && !user.phone ? (
          <Redirect to="/onboarding/enter/phone"></Redirect>
        ) : user && !user.phoneVerified ? (
          <Redirect to="/onboarding/verify/phone"></Redirect>
        ) : user && !user.firstName ? (
          <Redirect to="/onboarding/aboutyou"></Redirect>
        ) : user && !user.interests ? (
          <Redirect to="/onboarding/interests"></Redirect>
        ) : user && !user.continents ? (
          <Redirect to="/onboarding/continents"></Redirect>
        ) : user && !user.city ? (
          <Redirect to="/onboarding/location"></Redirect>
        ) : user && !user.continents ? (
          <Redirect to="/onboarding/continents"></Redirect>
        ) : (
          <Redirect to="/signin"></Redirect>
        )
      }
    ></Route>
  );
}
