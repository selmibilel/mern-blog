import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { useContext } from "react";
import { Context } from "./context/Context";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Footer from "./components/footer/Footer";



function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar/>

      {/* Gestion des routes  */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={ <About /> } />
        <Route path="/contact" element={ <Contact /> } />
        <Route path="/login" element={user? <Home /> : <Login />} />
        <Route path="/register" element={user? <Home /> : <Register />} />
        <Route path="/settings" element={user? <Settings /> : <Register />} />
        <Route path="/write" element={user? <Write /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
