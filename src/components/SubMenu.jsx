export default function SubMenu() {
    return (
        <div className="p-4 bg-white shadow-md lg:col-span-1">
            <div className="mb-4 text-lg font-semibold text-gray-700">MENUS</div>
            <ul className="pb-5">
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-white bg-red-600 rounded-lg">
                        <span className="mr-2"><i className="fas fa-user"></i></span> Biodata Diri
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-file-alt"></i></span> Jenis Sertifikasi
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-users"></i></span> Keluarga
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-vial"></i></span> Riwayat Kesehatan
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-futbol"></i></span> Hobi
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-phone"></i></span> Kontak Pegawai
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-graduation-cap"></i></span> Riwayat Pendidikan
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-credit-card"></i></span> Rekening
                    </a>
                </li>
                <li className="mb-2">
                    <a href="#" className="flex items-center p-3 text-gray-700 bg-white border rounded-lg hover:bg-gray-100">
                        <span className="mr-2"><i className="fas fa-rocket"></i></span> Riwayat Pelatihan
                    </a>
                </li>
            </ul>
        </div>
    );
}