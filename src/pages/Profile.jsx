import { useState } from 'react';

export default function Board() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [fullName, setFullName] = useState('');

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const getInitials = (name) => {
        const words = name.split(' ').slice(0, 2); // Ambil hanya 2 kata pertama
        const initials = words.map(word => word[0]).join('');
        return initials.toUpperCase();
    };

    return (
        <div className="px-4 py-10 mx-auto max-full sm:px-6 lg:px-8">
            <div className="p-4 bg-white shadow rounded-xl sm:p-7">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800">
                        Profile
                    </h2>
                    <p className="text-sm text-gray-600">
                        Manage your name, password and account settings.
                    </p>
                </div>

                <form>
                    <div className="grid gap-2 sm:grid-cols-12 sm:gap-6">
                        <div className="sm:col-span-3">
                            <label className="inline-block text-sm text-gray-800 mt-2.5">
                                Profile photo
                            </label>
                        </div>

                        <div className="sm:col-span-9">
                            <div className="flex items-center gap-5">
                                {/* Check if user has profile image, else show initials */}
                                {fullName ? (
                                    <div className="flex items-center justify-center inline-block w-16 h-16 text-2xl text-center text-white bg-gray-300 rounded-full">
                                        {getInitials(fullName)}
                                    </div>
                                ) : (
                                    <img className="inline-block w-16 h-16 rounded-full ring-2 ring-white" src="https://preline.co/assets/img/160x160/img1.jpg" alt="Avatar" />
                                )}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="af-account-full-name" className="inline-block text-sm text-gray-800 mt-2.5">
                                Full name
                            </label>
                        </div>

                        <div className="sm:col-span-9">
                            <div className="sm:flex">
                                <input
                                    id="af-account-full-name"
                                    type="text"
                                    className="relative block w-full px-3 py-2 -mt-px text-sm border border-gray-200 shadow-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Enter full name..."
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="af-account-email" className="inline-block text-sm text-gray-800 mt-2.5">
                                Email
                            </label>
                        </div>

                        <div className="sm:col-span-9">
                            <input id="af-account-email" type="email" className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="maria@site.com" />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="af-account-password" className="inline-block text-sm text-gray-800 mt-2.5">
                                Password
                            </label>
                        </div>

                        <div className="relative sm:col-span-9">
                            <input
                                id="password"
                                type={passwordVisible ? 'text' : 'password'}
                                className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-0 end-0 p-3.5"
                            >
                                <svg
                                    className={`flex-shrink-0 w-3.5 h-3.5 ${passwordVisible ? 'text-gray-400' : 'text-neutral-600'}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {passwordVisible ? (
                                        <>
                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </>
                                    ) : (
                                        <>
                                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                            <line x1="2" x2="22" y1="2" y2="22" />
                                        </>
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end mt-5 gap-x-2">
                        {/* <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
                            Cancel
                        </button> */}
                        <button type="button" className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700">
                            Save changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
