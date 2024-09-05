/* eslint-disable react/prop-types */
export default function SelectMultiple(props) {
    const {name} = props;
    return (
        <select 
            multiple 
            // defaultValue={["1"]} // Set the default selected option
            data-hs-select='{
            "placeholder": "Select option...",
            "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
            "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50",
            "mode": "tags",
            "wrapperClasses": "relative ps-0.5 pe-9 min-h-[46px] flex items-center flex-wrap text-nowrap w-full border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500",
            "tagsItemTemplate": "<div class=\"flex flex-nowrap items-center relative z-10 bg-white border border-gray-200 rounded-full p-1 m-1 \"><div class=\"whitespace-nowrap text-gray-800 \" data-title></div><div class=\"inline-flex shrink-0 justify-center items-center size-5 ms-2 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm cursor-pointer\" data-remove><svg class=\"shrink-0 size-3\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/></svg></div></div>",
            "tagsInputClasses": "py-3 px-2 rounded-lg order-1 text-sm outline-none",
            "optionTemplate": "<div class=\"flex items-center\"><div><div class=\"text-sm font-semibold text-gray-800 \" data-title></div><div class=\"text-xs text-gray-500 \" data-description></div></div><div class=\"ms-auto\"><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-4 text-blue-600\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div></div>",
            "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
            }' 
            className="hidden" name={name}
        >
            <option value="">Choose</option>
            <option value="1" data-hs-select-option='{
                "description": "chris"
                }'>Christina</option>
            <option value="2" data-hs-select-option='{
                "description": "david"
                }'>David</option>
            <option value="3" disabled data-hs-select-option='{
                "description": "alex27"
                }'>Alex</option>
            <option value="4" data-hs-select-option='{
                "description": "samia_samia"
                }'>Samia</option>
        </select>
    );
}
