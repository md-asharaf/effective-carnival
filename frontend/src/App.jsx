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
