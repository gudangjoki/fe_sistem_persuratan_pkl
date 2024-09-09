import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function Board() {
    const token = Cookies.get('access_token');

    const [letterCategories, setLetterCategories] = useState([]);
    const [totalLetter, setTotalLetter] = useState(0);
    const [totalLetterType, setTotalLetterType] = useState(0);
    const [loading, setLoading] = useState(true);

    const getAllCategorizeLetter = async () => {
        const BASE_URL = 'http://localhost:8000/api/count_letter';
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }

        try {
            const response = await axios.get(BASE_URL, options);
            console.log(response.data);
            const { success, data, total_letter_type, total_letter } = response.data;
            setLetterCategories(data);
            setTotalLetter(total_letter);
            setTotalLetterType(total_letter_type);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategorizeLetter();
    }, [])

    return(
    <>
    <div className="bg-gray-200">
        <div className="max-w-[85rem] py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-3 lg:gap-8">
                <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Total Surat</h4>
                    <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">{!loading && totalLetter}</p>
                    <p className="mt-1 text-gray-500">in fulfilling orders</p>
                </div>

                <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Total User</h4>
                    <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">2,000+</p>
                    <p className="mt-1 text-gray-500">partner with Preline</p>
                </div>

                <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-800">Total Tipe Surat</h4>
                    <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold text-blue-600">{!loading && totalLetterType}</p>
                    <p className="mt-1 text-gray-500">this year alone</p>
                </div>
            </div>
        </div>
    </div>


    <div className="max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            { !loading && letterCategories.map((val, idx) => {
                return (
                <a key={idx} className="group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md focus:outline-none focus:shadow-md transition" href="#">
                <div key={idx} className="p-4 md:p-5">
                    <div className="flex justify-between items-center gap-x-3">
                    <div className="grow">
                        <h3 className="group-hover:text-blue-600 font-semibold text-gray-800">
                        {val.letter_type}
                        </h3>
                        <p className="text-sm text-gray-500">
                        {val.total_letter_type}
                        </p>
                    </div>
                    <div>
                        <svg className="shrink-0 size-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                    </div>
                </div>
                </a>
                )
            })}
        </div>
    </div>
    </>
    
    );
}