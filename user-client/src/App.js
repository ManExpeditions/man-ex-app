import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AboutYouPage from "./pages/OnboardingPages/AboutYouPage/AboutYouPage";
import MoreQuestionsPage from "./pages/OnboardingPages/MoreQuestionsPage/MoreQuestionsPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import InterestsPage from "./pages/OnboardingPages/InterestsPage/InterestsPage";

function App() {
  return (
    <Router>
      <Route path="/signin" component={SigninPage}></Route>
      <Route path="/register" component={RegisterPage}></Route>
      <Route path="/onboarding/1" component={AboutYouPage}></Route>
      <Route path="/onboarding/2" component={MoreQuestionsPage}></Route>
      <Route path="/onboarding/3" component={InterestsPage}></Route>
    </Router>
  );
}

export default App;
