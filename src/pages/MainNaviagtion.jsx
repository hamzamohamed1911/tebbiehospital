import { Outlet } from "react-router";
import MainNaviagtion from "../components/MainNaviagtion";
import BottomNavbar from "../components/BottomNavbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col p-4">
      <MainNaviagtion />
      <main className="flex-grow h-[80vh] overflow-y-auto ">
        <Outlet />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
