import { Outlet } from "react-router-dom";
import Header from "../root/Header";
import Footer from "../root/Footer";

function RootLayout() {
  return (
    <div className="">
      <Header />
      <main className="mt-16 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
