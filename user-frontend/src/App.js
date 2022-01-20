import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from "./pages/public/RegisterPage/RegisterPage";
import AboutYouPage from "./pages/private/OnboardingPages/AboutYouPage/AboutYouPage";
import MoreQuestionsPage from "./pages/private/OnboardingPages/MoreQuestionsPage/MoreQuestionsPage";
import SigninPage from "./pages/public/SigninPage/SigninPage";
import InterestsPage from "./pages/private/OnboardingPages/InterestsPage/InterestsPage";
import ContinentsPage from "./pages/private/OnboardingPages/ContinentsPage/ContinentsPage";
import LocationPage from "./pages/private/OnboardingPages/LocationPage/LocationPage";
import VerifyEmailPage from "./pages/private/OnboardingPages/VerifyEmailPage/VerifyEmailPage";
import VerifyPhonePage from "./pages/private/OnboardingPages/VerifyPhonePage/VerifyPhonePage";
import EnterPhonePage from "./pages/private/OnboardingPages/EnterPhonePage/EnterPhonePage";
import UploadProfilePicPage from "./pages/private/OnboardingPages/UploadProfilePicPage/UploadProfilePicPage";
import VerifyProfilePicSocialPage from "./pages/private/OnboardingPages/VerifyProfilePicSocialPage/VerifyProfilePicSocialPage";
import VerifyProfilePicManualPage from "./pages/private/OnboardingPages/VerifyProfilePicManualPage/VerifyProfilePicManualPage";
import HomePage from "./pages/mixed/HomePage/HomePage";
import AboutPage from "./pages/public/AboutPage/AboutPage";
import PressPage from "./pages/public/PressPage/PressPage";
import OnboardingRoute from "./routes/OnboardingRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ExperiencesPage from "./pages/mixed/ExperiencesPage/ExperiencesPage";
import UserSettingsPage from "./pages/private/UserSettingsPage/UserSettingsPage";
import TravelSponsorshipsPage from "./pages/public/TravelSponsorshipsPage/TravelSponsorshipsPage";

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
        path="/onboarding/verify/phone/:phoneNumber"
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
      <Route path="/experiences" component={ExperiencesPage}></Route>
      <Route path="/aboutus" component={AboutPage}></Route>
      <Route path="/press" component={PressPage}></Route>
      <Route
        path="/travelsponsorships"
        component={TravelSponsorshipsPage}
      ></Route>
      <PrivateRoute
        path="/profile/settings"
        component={UserSettingsPage}
      ></PrivateRoute>
    </Router>
  );
}

export default App;
