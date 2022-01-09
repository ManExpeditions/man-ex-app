import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

export default function OnboardingRoute({ component: Component, ...rest }) {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const emailRegisterSlice = useSelector((state) => state.emailRegisterSlice);
  const { createdUser } = emailRegisterSlice;

  return (
    <Route
      {...rest}
      render={(props) =>
        (user && !user.completedOnboarding) || createdUser ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/home"></Redirect>
        )
      }
    ></Route>
  );
}
