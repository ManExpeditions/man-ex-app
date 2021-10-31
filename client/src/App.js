import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AboutYouPage from "./pages/AboutYouPage/AboutYouPage";

function App() {
  return (
    <Router>
      <Route path="/register" component={RegisterPage}></Route>
      <Route path="/onboarding/1" component={AboutYouPage}></Route>
    </Router>
  );
}

export default App;
