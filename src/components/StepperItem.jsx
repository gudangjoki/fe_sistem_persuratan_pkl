export default function StepperItem() {
    return (
      <div data-hs-stepper>
        <ul className="relative flex flex-row gap-x-2">
          <li
            className="flex items-center flex-1 gap-x-2 shrink basis-0 group active"
            data-hs-stepper-nav-item='{
              "index": 1,
              "isOptional": true
            }'
          >
            <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
              <span className="flex items-center justify-center flex-shrink-0 font-medium text-gray-800 bg-gray-100 rounded-full w-7 h-7 group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                  1
                </span>
                <svg
                  className="flex-shrink-0 hidden w-3 h-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm font-medium text-gray-800 ms-2 group-focus:text-gray-500 dark:text-white dark:group-focus:text-gray-400">
                Step
              </span>
            </span>
            <div className="flex-1 w-full h-px bg-gray-200 group-last:hidden dark:bg-blue-500 hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
          </li>
  
          <li
            className="flex items-center flex-1 gap-x-2 shrink basis-0 group"
            data-hs-stepper-nav-item='{
            "index": 2,
            "isOptional": true
          }'
          >
            <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
              <span className="flex items-center justify-center flex-shrink-0 font-medium text-gray-800 bg-gray-100 rounded-full w-7 h-7 group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                  2
                </span>
                <svg
                  className="flex-shrink-0 hidden w-3 h-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm font-medium text-gray-800 ms-2 group-focus:text-gray-500 dark:text-white dark:group-focus:text-gray-400">
                Step
              </span>
            </span>
            <div className="flex-1 w-full h-px bg-gray-200 group-last:hidden dark:bg-gray-700 hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
          </li>
  
          <li
            className="flex items-center flex-1 gap-x-2 shrink basis-0 group"
            data-hs-stepper-nav-item='{
            "index": 3
          }'
          >
            <span className="min-w-[28px] min-h-[28px] group inline-flex items-center text-xs align-middle focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
              <span className="flex items-center justify-center flex-shrink-0 font-medium text-gray-800 bg-gray-100 rounded-full w-7 h-7 group-focus:bg-gray-200 dark:bg-gray-700 dark:text-white dark:group-focus:bg-gray-600 hs-stepper-active:bg-blue-600 hs-stepper-active:text-white hs-stepper-success:bg-blue-600 hs-stepper-success:text-white hs-stepper-completed:bg-teal-500 hs-stepper-completed:group-focus:bg-teal-600">
                <span className="hs-stepper-success:hidden hs-stepper-completed:hidden">
                  3
                </span>
                <svg
                  className="flex-shrink-0 hidden w-3 h-3 hs-stepper-success:block"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-sm font-medium text-gray-800 ms-2 group-focus:text-gray-500 dark:text-white dark:group-focus:text-gray-400">
                Step
              </span>
            </span>
            <div className="flex-1 w-full h-px bg-gray-200 group-last:hidden dark:bg-gray-700 hs-stepper-success:bg-blue-600 hs-stepper-completed:bg-teal-600"></div>
          </li>
        </ul>
  
        <div className="mt-5 sm:mt-8">
          <div
            data-hs-stepper-content-item='{
              "index": 1
            }'
            style={{ display: 'none' }}
          >
            <div className="flex items-center justify-center h-48 p-4 border border-gray-200 border-dashed bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-gray-500">First content</h3>
            </div>
          </div>
  
          <div
            data-hs-stepper-content-item='{
              "index": 2
            }'
            style={{ display: 'none' }}
          >
            <div className="flex items-center justify-center h-48 p-4 border border-gray-200 border-dashed bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-gray-500">Second content</h3>
            </div>
          </div>
  
          <div
            data-hs-stepper-content-item='{
              "index": 3
            }'
            style={{ display: 'none' }}
          >
            <div className="flex items-center justify-center h-48 p-4 border border-gray-200 border-dashed bg-gray-50 rounded-xl dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-gray-500">Third content</h3>
            </div>
          </div>
  
          <div
            data-hs-stepper-content-item='{
              "isFinal": true
            }'
          >
            <div className="flex items-center justify-center h-48 p-4 border border-gray-200 border-dashed bg-gray-50 rounded-xl">
              <h3 className="text-gray-500">Final content</h3>
            </div>
          </div>
  
          <div className="flex items-center justify-between mt-5 gap-x-2">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-1 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-back-btn
            >
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-1 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-skip-btn
              style={{ display: 'none' }}
            >
              Skip
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-1 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-next-btn
            >
              Next
              <svg
                className="flex-shrink-0 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-1 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-finish-btn
              style={{ display: 'none' }}
            >
              Finish
            </button>
            <button
              type="reset"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-lg gap-x-1 hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              data-hs-stepper-reset-btn
              style={{ display: 'none' }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    );
}
  