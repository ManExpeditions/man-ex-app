import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <Route path="/register" component={RegisterPage}></Route>
    </Router>
  );
}

export default App;
