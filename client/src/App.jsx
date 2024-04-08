import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Header } from "./compnents/Header";

import FooterCon from "./compnents/FooterCon";
import { PrivatedRoute } from "./compnents/PrivatedRoute";
import { OnlyAdminPrivateRoute } from "./compnents/OnlyAdminPrivateRoute";
import { CreatePost } from "./pages/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivatedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
        </Route>

        <Route path="/projects" element={<Projects />} />
      </Routes>
      <FooterCon />
    </BrowserRouter>
  );
}

export default App;
