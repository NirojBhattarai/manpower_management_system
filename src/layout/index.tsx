import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header/Header";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex bg-white u-max-w-app h-screen overflow-hidden font-outfit">
      <Sidebar isSidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="u-flex-parent">
        <Header />
        <main className="u-flex-parent p-6">
          <Suspense
            fallback={
              <div className="flex justify-center items-center w-full h-full">
                <LoadingScreen />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;
