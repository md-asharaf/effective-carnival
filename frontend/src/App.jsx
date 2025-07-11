import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages";
import AuthLayout from "./components/layout/AuthLayout";
import RootLayout from "./components/layout/RootLayout";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
