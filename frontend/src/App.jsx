import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";

function App() {
  return (
    <div className="">
      <Header />
      <main className="mt-16 min-h-screen">
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
