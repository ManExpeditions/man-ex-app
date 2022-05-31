import 'react-toastify/dist/ReactToastify.css';
import 'react-pro-sidebar/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RegisterPage from './pages/public/RegisterPage/RegisterPage';
import AboutYouPage from './pages/private/OnboardingPages/AboutYouPage/AboutYouPage';
import MoreQuestionsPage from './pages/private/OnboardingPages/MoreQuestionsPage/MoreQuestionsPage';
import SigninPage from './pages/public/SigninPage/SigninPage';
import InterestsPage from './pages/private/OnboardingPages/InterestsPage/InterestsPage';
import ContinentsPage from './pages/private/OnboardingPages/ContinentsPage/ContinentsPage';
import LocationPage from './pages/private/OnboardingPages/LocationPage/LocationPage';
import VerifyEmailPage from './pages/private/OnboardingPages/VerifyEmailPage/VerifyEmailPage';
import VerifyPhonePage from './pages/private/OnboardingPages/VerifyPhonePage/VerifyPhonePage';
import EnterPhonePage from './pages/private/OnboardingPages/EnterPhonePage/EnterPhonePage';
import UploadProfilePicPage from './pages/private/OnboardingPages/UploadProfilePicPage/UploadProfilePicPage';
import VerifyProfilePicSocialPage from './pages/private/OnboardingPages/VerifyProfilePicSocialPage/VerifyProfilePicSocialPage';
import VerifyProfilePicManualPage from './pages/private/OnboardingPages/VerifyProfilePicManualPage/VerifyProfilePicManualPage';
import HomePage from './pages/mixed/HomePage/HomePage';
import AboutPage from './pages/public/AboutPage/AboutPage';
import PressPage from './pages/public/PressPage/PressPage';
import OnboardingRoute from './routes/OnboardingRoute';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import ExperiencesPage from './pages/mixed/ExperiencesPage/ExperiencesPage';
import UserSettingsPage from './pages/private/UserProfilePages/UserSettingsPage/UserSettingsPage';
import TravelSponsorshipsPage from './pages/public/TravelSponsorshipsPage/TravelSponsorshipsPage';
import PrivacyAndServiceTermsPage from './pages/public/PrivacyAndServiceTermsPage/PrivacyAndServiceTermsPage';
import UserProfilePage from './pages/private/UserProfilePages/UserProfilePage/UserProfilePage';
import UserEditProfilePage from './pages/private/UserProfilePages/UserEditProfilePage/UserEditProfilePage';
import UpdateEmailPage from './pages/private/UserProfilePages/UpdateEmailPage/UpdateEmailPage';
import UpdatePhonePage from './pages/private/UserProfilePages/UpdatePhonePage/UpdatePhonePage';
import UpdatePasswordPage from './pages/private/UserProfilePages/UpdatePasswordPage/UpdatePasswordPage';
import ManageAccountPage from './pages/private/UserProfilePages/ManageAccountPage/ManageAccountPage';
import ExperiencePage from './pages/private/ExperiencePage/ExperiencePage';
import AdminPanelPage from './pages/admin/AdminPanelPage';
import UserDisplayProfilePage from './pages/private/UserProfilePages/UserDisplayProfilePage/UserDisplayProfilePage';
import MessagesPage from './pages/public/MessagesPage/MessagesPage';
import FavoritesPage from './pages/private/FavoritesPage/FavoritesPage';
import MembersPage from './pages/public/MembersPage/MembersPage';
import AuthRoute from './routes/AuthRoute';
import ThankYouPage from './pages/private/ThankYouPage/ThankYouPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from './pages/public/ResetPasswordPage/ResetPasswordPage';

function App() {
  return (
    <Router>
      <Switch>
        <AuthRoute path="/signin" component={SigninPage}></AuthRoute>
        <AuthRoute
          path="/forgotpassword"
          component={ForgotPasswordPage}
        ></AuthRoute>
        <AuthRoute
          path="/resetpassword/:token"
          component={ResetPasswordPage}
        ></AuthRoute>
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
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/home" component={HomePage}></Route>
        <PrivateRoute
          path="/experiences/:id"
          exact
          component={ExperiencePage}
        ></PrivateRoute>
        <Route path="/experiences" exact component={ExperiencesPage}></Route>
        <Route path="/aboutus" component={AboutPage}></Route>
        <PrivateRoute path="/messages" component={MessagesPage}></PrivateRoute>
        <PrivateRoute path="/members" component={MembersPage}></PrivateRoute>
        <Route path="/press" component={PressPage}></Route>
        <Route
          path="/travelsponsorships"
          component={TravelSponsorshipsPage}
        ></Route>
        <Route
          path="/privacy-and-serviceterms"
          component={PrivacyAndServiceTermsPage}
        ></Route>
        <PrivateRoute
          path="/favorites"
          component={FavoritesPage}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/thankyou"
          component={ThankYouPage}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/profile/settings/email"
          component={UpdateEmailPage}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/profile/settings/phone"
          component={UpdatePhonePage}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/profile/settings/password"
          component={UpdatePasswordPage}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/profile/settings/account"
          component={ManageAccountPage}
          exact
        ></PrivateRoute>
        <PrivateRoute
          path="/profile/settings"
          component={UserSettingsPage}
          exact
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/profile/edit"
          component={UserEditProfilePage}
        ></PrivateRoute>
        <PrivateRoute
          path="/profile/:id"
          exact
          component={UserDisplayProfilePage}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/profile"
          component={UserProfilePage}
        ></PrivateRoute>
        <AdminRoute
          exact
          path="/manexadmin"
          component={AdminPanelPage}
        ></AdminRoute>
      </Switch>
    </Router>
  );
}

export default App;
