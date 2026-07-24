import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

function Layout() {
  return (
    <div className="app-shell">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
