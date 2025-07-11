import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <h1 className="text-lg bg-slate-800">Hey Infosys</h1>
      <Outlet />
    </>
  )
}

export default App
