import "./App.css";
import "react-toastify/dist/ReactToastify.css";

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
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import PressPage from "./pages/PressPage/PressPage";
import OnboardingRoute from "./routes/OnboardingRoute";

function App() {
  return (
    <Router>
      <Route path="/signin" component={SigninPage}></Route>
      <Route path="/register" component={RegisterPage}></Route>
      <OnboardingRoute
        path="/onboarding/verify/email"
        component={VerifyEmailPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/enter/phone"
        component={EnterPhonePage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/verify/phone"
        component={VerifyPhonePage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/aboutyou"
        component={AboutYouPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/morequestions"
        component={MoreQuestionsPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/interests"
        component={InterestsPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/continents"
        component={ContinentsPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/location"
        component={LocationPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/upload/profilepic"
        component={UploadProfilePicPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/verify/profilepic/social"
        component={VerifyProfilePicSocialPage}
      ></OnboardingRoute>
      <OnboardingRoute
        path="/onboarding/verify/profilepic/manual"
        component={VerifyProfilePicManualPage}
      ></OnboardingRoute>
      <Route path="/home" component={HomePage}></Route>
      <Route path="/aboutus" component={AboutPage}></Route>
      <Route path="/press" component={PressPage}></Route>
    </Router>
  );
}

export default App;
