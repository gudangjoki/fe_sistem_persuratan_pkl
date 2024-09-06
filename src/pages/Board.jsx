export default function Board() {
    return(
    <>
    <div className="bg-gray-200">
        <div class="max-w-[85rem] py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div class="grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
                <div>
                    <h4 class="text-lg sm:text-xl font-semibold text-gray-800">Total Surat</h4>
                    <p class="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">99</p>
                    <p class="mt-1 text-gray-500">in fulfilling orders</p>
                </div>

                <div>
                    <h4 class="text-lg sm:text-xl font-semibold text-gray-800">Total User</h4>
                    <p class="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">2,000+</p>
                    <p class="mt-1 text-gray-500">partner with Preline</p>
                </div>

                <div>
                    <h4 class="text-lg sm:text-xl font-semibold text-gray-800">Total Tipe Surat</h4>
                    <p class="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">85</p>
                    <p class="mt-1 text-gray-500">this year alone</p>
                </div>
            </div>
        </div>
    </div>


    <div class="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition" href="#">
            <div class="p-4 md:p-5">
                <div class="flex justify-between items-center gap-x-3">
                <div class="grow">
                    <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">
                    Surat Keputusan 
                    </h3>
                    <p class="text-sm text-gray-500">
                    4 job positions
                    </p>
                </div>
                <div>
                    <svg class="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
                </div>
            </div>
            </a>

            <a class="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition" href="#">
            <div class="p-4 md:p-5">
                <div class="flex justify-between items-center gap-x-3">
                <div class="grow">
                    <h3 class="group-hover:text-blue-600 font-semibold text-gray-800">
                    App Development
                    </h3>
                    <p class="text-sm text-gray-500">
                    26 job positions
                    </p>
                </div>
                <div>
                    <svg class="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>
                </div>
            </div>
            </a>
        </div>
    </div>
    </>
    
    );
}