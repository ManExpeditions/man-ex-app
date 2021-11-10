import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AboutYouPage from "./pages/OnboardingPages/AboutYouPage/AboutYouPage";
import MoreQuestionsPage from "./pages/OnboardingPages/MoreQuestionsPage/MoreQuestionsPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import InterestsPage from "./pages/OnboardingPages/InterestsPage/InterestsPage";
import ContinentsPage from "./pages/OnboardingPages/ContinentsPage/ContinentsPage";
import LocationPage from "./pages/OnboardingPages/LocationPage/LocationPage";
import VerifyEmailPage from "./pages/OnboardingPages/VerifyEmailPage/VerifyEmailPage";
import VerifyPhonePage from "./pages/OnboardingPages/VerifyPhonePage/VerifyPhonePage";
import EnterPhonePage from "./pages/OnboardingPages/EnterPhonePage/EnterPhonePage";

function App() {
  return (
    <Router>
      <Route path="/signin" component={SigninPage}></Route>
      <Route path="/register" component={RegisterPage}></Route>
      <Route
        path="/onboarding/verify/email"
        component={VerifyEmailPage}
      ></Route>
      <Route path="/onboarding/enter/phone" component={EnterPhonePage}></Route>
      <Route
        path="/onboarding/verify/phone"
        component={VerifyPhonePage}
      ></Route>
      <Route path="/onboarding/1" component={AboutYouPage}></Route>
      <Route path="/onboarding/2" component={MoreQuestionsPage}></Route>
      <Route path="/onboarding/3" component={InterestsPage}></Route>
      <Route path="/onboarding/4" component={ContinentsPage}></Route>
      <Route path="/onboarding/5" component={LocationPage}></Route>
    </Router>
  );
}

export default App;
