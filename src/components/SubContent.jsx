import UploadFile from './DropFile';
import SelectItem from './SelectItem';
import SelectMultiple from './SelectMultiple';

export default function SubContent() {
    return (
        <div className="col-span-2 p-4 bg-white rounded-lg shadow-md lg:h-full">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                Fill in the form
            </h2>
            <form>
                <div className="grid gap-4 mt-6 lg:gap-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                    <div>
                        <label htmlFor="hs-firstname-hire-us-1" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">ID Surat</label>
                        <input type="text" name="hs-firstname-hire-us-1" id="hs-firstname-hire-us-1" className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                    </div>

                    <div>
                        <label htmlFor="hs-lastname-hire-us-1" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Tanggal Simpan</label>
                        <input type="text" name="hs-lastname-hire-us-1" id="hs-lastname-hire-us-1" className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                    </div>
                    </div>

                    <div>
                        <label htmlFor="hs-work-email-hire-us-1" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Judul</label>
                        <input type="email" name="hs-work-email-hire-us-1" id="hs-work-email-hire-us-1" autoComplete="email" className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"/>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                        <div>
                            <label htmlFor="hs-company-hire-us-1" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Tipe Surat</label>
                            <SelectItem />
                        </div>

                        <div>
                            <label htmlFor="hs-company-website-hire-us-1" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">List Keyword</label>
                            <SelectMultiple />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="hs-about-hire-us-1" className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Drop File</label>
                        <UploadFile />
                    </div>
                </div>
            </form>
        </div>
    );
}