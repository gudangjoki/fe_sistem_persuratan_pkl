import { useState } from "react";
import { LetterManagementProvider } from "../contexts/LetterContext";
import SubContent from "./SubContent";
import SubMenu from "./SubMenu";
import Board from "../pages/Board";
import { useLocation } from "react-router-dom";

export default function Content() {
  // Clear session storage on page reload
  window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('detail');
    sessionStorage.removeItem('edit');
  });

  const [activeMenu, setActiveMenu] = useState("buat_surat");
  const location = useLocation();  // Get the current route

  const renderContent = () => {
    switch (location.pathname) {
      case '/board':
        return <Board />;
      case '/dashboard':
        return (
          <div className="h-full p-4 space-y-4 sm:p-6 sm:space-y-6">
            <div className="grid h-full grid-cols-1 gap-5 lg:grid-cols-3">
              <LetterManagementProvider>
                <div className="h-auto lg:col-span-1">
                  <SubMenu setActiveMenu={setActiveMenu} />
                </div>

                <div className="h-full lg:col-span-2">
                  <SubContent activeMenu={activeMenu} />
                </div>
              </LetterManagementProvider>
            </div>
          </div>
        );
      default:
        return <Board />;
    }
  };

  return (
    <div className="w-full h-screen bg-gray-100">
      {renderContent()}
    </div>
  );
}
