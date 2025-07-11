import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

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
