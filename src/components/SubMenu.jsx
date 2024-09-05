export default function SubMenu() {
    return (
        <div className="h-auto p-4 bg-white rounded-lg shadow-md lg:col-span-1">
            <div className="mb-4 text-lg font-semibold text-gray-700">MENUS</div>
            <ul className="pb-5">
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-white bg-red-600 rounded-lg">
                        <span className="mr-2"><i className="fas fa-user"></i></span> Buat Surat
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-users"></i></span> List Surat
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-vial"></i></span> Manajemen Role
                    </a>
                </li>
                
            </ul>
        </div>
    );
}