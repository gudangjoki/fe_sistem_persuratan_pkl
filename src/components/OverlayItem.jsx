// OverlayItem.js
/* eslint-disable react/prop-types */
export default function OverlayItem(props) {
  const { contentId, title, content } = props;

  return (
      <>
          <div
              id={contentId}
              className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-full max-w-xs w-full z-[80] bg-white border-s dark:bg-neutral-800 dark:border-neutral-700" role="dialog" aria-labelledby="hs-offcanvas-right-label"
              tabIndex="-5"
          >
              <div className="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
                  <button
                      type="button"
                      className="flex items-center justify-center text-sm font-semibold text-gray-800 border border-transparent rounded-full w-7 h-7 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      data-hs-overlay={`#${contentId}`}
                  >
                      <span className="sr-only">Close modal</span>
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
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                      </svg>
                  </button>
              </div>
              <div className="p-4 space-y-3">
                    <div className="p-4 text-sm text-gray-600 transition bg-white border shadow-sm group rounded-xl hover:shadow-md focus:outline-none focus:shadow-md" role="alert" tabIndex="-1" aria-labelledby="hs-link-on-right-label">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                            </div>
                            <div className="flex-1 md:flex md:justify-between ms-2">
                                <p id="hs-link-on-right-label" className="text-sm text-gray-800 dark:text-gray-400">
                                    {content}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 text-sm text-gray-600 transition bg-white border shadow-sm group rounded-xl hover:shadow-md focus:outline-none focus:shadow-md" role="alert" tabIndex="-1" aria-labelledby="hs-link-on-right-label">
                        <div className="flex">
                            <div className="shrink-0">
                                <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                            </div>
                            <div className="flex-1 md:flex md:justify-between ms-2">
                                <p id="hs-link-on-right-label" className="text-sm text-gray-800 dark:text-gray-400">
                                    {content}
                                </p>
                            </div>
                        </div>
                    </div>
              </div>
          </div>
      </>
  );
}
