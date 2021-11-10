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
import UploadProfilePicPage from "./pages/OnboardingPages/UploadProfilePicPage/UploadProfilePicPage";
import VerifyProfilePicSocialPage from "./pages/OnboardingPages/VerifyProfilePicSocialPage/VerifyProfilePicSocialPage";
import VerifyProfilePicManualPage from "./pages/OnboardingPages/VerifyProfilePicManualPage/VerifyProfilePicManualPage";

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
      <Route path="/onboarding/aboutyou" component={AboutYouPage}></Route>
      <Route
        path="/onboarding/morequestions"
        component={MoreQuestionsPage}
      ></Route>
      <Route path="/onboarding/interests" component={InterestsPage}></Route>
      <Route path="/onboarding/continents" component={ContinentsPage}></Route>
      <Route path="/onboarding/location" component={LocationPage}></Route>
      <Route
        path="/onboarding/upload/profilepic"
        component={UploadProfilePicPage}
      ></Route>
      <Route
        path="/onboarding/verify/profilepic/social"
        component={VerifyProfilePicSocialPage}
      ></Route>
      <Route
        path="/onboarding/verify/profilepic/manual"
        component={VerifyProfilePicManualPage}
      ></Route>
    </Router>
  );
}

export default App;
