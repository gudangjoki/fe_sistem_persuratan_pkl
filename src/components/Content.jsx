import React from 'react';

export default function Content() {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-1/4 p-4 bg-gray-100">
                <ul>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-red-700 bg-red-100 rounded">
                            <i className="mr-2 fa fa-user"></i>
                            Biodata Diri
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-certificate"></i>
                            Jenis Sertifikasi
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-users"></i>
                            Keluarga
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-heartbeat"></i>
                            Riwayat Kesehatan
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-futbol"></i>
                            Hobi
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-phone"></i>
                            Kontak Pegawai
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-graduation-cap"></i>
                            Riwayat Pendidikan
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-money-check-alt"></i>
                            Rekening
                        </a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="flex items-center p-2 text-gray-700 rounded hover:bg-gray-200">
                            <i className="mr-2 fa fa-plane"></i>
                            Riwayat Pelatihan
                        </a>
                    </li>
                </ul>
            </div>
            {/* Content Area */}
            <div className="w-3/4 p-6">
                <h2 className="mb-4 text-xl font-semibold">Biodata Diri</h2>
                <div className="grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <p><span className="font-bold">Nama: </span>Aldo Fernando</p>
                        <p><span className="font-bold">Email: </span>rickyputra2311@gmail.com</p>
                        <p><span className="font-bold">Jabatan: </span></p>
                        <p><span className="font-bold">Tempat Lahir: </span></p>
                        <p><span className="font-bold">Status Perkawinan: </span>Belum Kawin</p>
                        <p><span className="font-bold">Agama: </span>KRISTEN</p>
                        <p><span className="font-bold">Grade Step: </span>Grade: , Step:</p>
                    </div>
                    <div>
                        <p><span className="font-bold">Tanggal Lahir: </span>01/09/2023</p>
                        <p><span className="font-bold">Tanggal Mulai Bekerja: </span>01/09/2021</p>
                        <p><span className="font-bold">Tanggal Selesai Bekerja: </span>04/02/2025</p>
                        <p><span className="font-bold">Alamat KTP: </span></p>
                        <p><span className="font-bold">Alamat Domisili: </span></p>
                        <p><span className="font-bold">Status PTKP: </span></p>
                        <p><span className="font-bold">NIP: </span>2213999381</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
