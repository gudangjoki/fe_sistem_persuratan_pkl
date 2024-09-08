export default function Board() {
    return(
    <>
    <div className="bg-gray-200">
        <div className="max-w-[85rem] py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid grid-cols-2 gap-6 sm:gap-12 lg:grid-cols-3 lg:gap-8">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 sm:text-xl">Total Surat</h4>
                    <p className="mt-2 text-4xl font-bold text-blue-600 sm:mt-3 sm:text-6xl">99</p>
                    <p className="mt-1 text-gray-500">in fulfilling orders</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-800 sm:text-xl">Total User</h4>
                    <p className="mt-2 text-4xl font-bold text-blue-600 sm:mt-3 sm:text-6xl">2,000+</p>
                    <p className="mt-1 text-gray-500">partner with Preline</p>
                </div>

                <div>
                    <h4 className="text-lg font-semibold text-gray-800 sm:text-xl">Total Tipe Surat</h4>
                    <p className="mt-2 text-4xl font-bold text-blue-600 sm:mt-3 sm:text-6xl">85</p>
                    <p className="mt-1 text-gray-500">this year alone</p>
                </div>
            </div>
        </div>
    </div>


    <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            <a className="flex flex-col transition bg-white border shadow-sm group rounded-xl hover:shadow-md focus:outline-none focus:shadow-md" href="#">
            <div className="p-4 md:p-5">
                <div className="flex items-center justify-between gap-x-3">
                    <div className="grow">
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                        Surat Keputusan 
                        </h3>
                        <p className="text-sm text-gray-500">
                        4 job positions
                        </p>
                    </div>
                    <div>
                        <svg className="text-gray-800 shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                </div>
            </div>
            </a>

            <a className="flex flex-col transition bg-white border shadow-sm group rounded-xl hover:shadow-md focus:outline-none focus:shadow-md" href="#">
            <div className="p-4 md:p-5">
                <div className="flex items-center justify-between gap-x-3">
                    <div className="grow">
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">
                        App Development
                        </h3>
                        <p className="text-sm text-gray-500">
                        26 job positions
                        </p>
                    </div>
                    <div>
                        <svg className="text-gray-800 shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                </div>
            </div>
            </a>
        </div>
    </div>
    </>
    
    );
}