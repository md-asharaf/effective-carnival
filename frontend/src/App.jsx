import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLogin from "./components/auth/UserLogin"
import UserRegister from "./components/auth/UserRegister"
import AuthLayout from "./components/layout/AuthLayout"
import RootLayout from "./components/layout/RootLayout"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
        </Route>
        <Route element={<RootLayout />}>
          <Route path="/" element={<div>Home Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
