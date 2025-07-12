import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, Villages } from "./pages";
import AuthLayout from "./components/layout/AuthLayout";
import RootLayout from "./components/layout/RootLayout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import About from "./components/About";
import HostProfile from "./pages/HostProfile";
import VillageProfile from "./pages/VillageProfile";
import PublicHostProfile from "./pages/pulic-host-profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Villages" element={<Villages />} />
          <Route path="/about" element={<About />} />
          <Route path="/host-profile" element={<HostProfile />} />
          <Route path="/host-public-profile" element={<PublicHostProfile />} />
          <Route path="/village-details" element={<VillageProfile />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
