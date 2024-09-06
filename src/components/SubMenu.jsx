/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function SubMenu({ setActiveMenu }) {
  const menus = [
    { label: "Buat Surat", icon: "fas fa-user", key: "buat_surat" },
    { label: "List Surat", icon: "fas fa-users", key: "list_surat" },
    { label: "Manajemen Role", icon: "fas fa-vial", key: "manajemen_role" },
  ];

  // Periksa sessionStorage saat pertama kali render
  const getInitialMenu = () => {
    const savedMenu = sessionStorage.getItem("activeMenu");
    return savedMenu ? savedMenu : "buat_surat"; // Default ke 'buat_surat' jika tidak ada
  };

  // Set state untuk menyimpan menu aktif
  const [activeMenu, setActiveMenuState] = useState(getInitialMenu);

  // Update sessionStorage dan state saat menu di-klik
  const handleMenuClick = (menuKey) => {
    sessionStorage.setItem("activeMenu", menuKey); // Simpan ke sessionStorage
    setActiveMenu(menuKey); // Memperbarui parent state (jika diperlukan)
    setActiveMenuState(menuKey); // Memperbarui local activeMenu state
  };

  // Update state saat komponen di-mount dengan nilai dari sessionStorage
  useEffect(() => {
    const savedMenu = sessionStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenuState(savedMenu); // Set state ke nilai dari sessionStorage
      setActiveMenu(savedMenu); // Memperbarui parent state (jika diperlukan)
    }
  }, [setActiveMenu]);

  return (
    <div className="h-auto p-4 bg-white rounded-lg shadow-md lg:col-span-1">
      <div className="mb-4 text-lg font-semibold text-gray-700">MENUS</div>
      <ul className="pb-5">
        {menus.map((menu, index) => (
          <li className="mb-2" key={index}>
            <a
              href="#"
              onClick={() => handleMenuClick(menu.key)}
              className={`flex items-center p-3 rounded-lg ${
                activeMenu === menu.key
                  ? "text-white bg-red-600"
                  : "text-gray-700 bg-white border hover:bg-gray-100"
              }`}
            >
              <span className="mr-2">
                <i className={menu.icon}></i>
              </span>
              {menu.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
