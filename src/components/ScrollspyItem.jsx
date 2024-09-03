export default function ScrollspyItem() {
    return (
      <div
        id="scrollspy-scrollable-parent-1"
        className="max-h-[300px] overflow-auto"
      >
        <header className="sticky inset-x-0 top-0 z-40 flex flex-wrap w-full py-4 text-sm bg-white sm:justify-start sm:flex-nowrap dark:bg-gray-800">
          <nav
            className="w-full mx-auto sm:flex sm:items-center sm:justify-between"
            aria-label="Global"
          >
            <div className="flex items-center justify-between">
              <a
                className="flex-none text-xl font-semibold dark:text-white"
                href="#"
              >
                Brand
              </a>
              <div className="sm:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 p-2 text-sm font-medium text-gray-700 align-middle transition-all bg-white border rounded-lg shadow-sm hs-collapse-toggle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                  data-hs-collapse="#navbar-collapse-basic"
                  aria-controls="navbar-collapse-basic"
                  aria-label="Toggle navigation"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4 hs-collapse-open:hidden"
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
                    <line x1="3" x2="21" y1="6" y2="6" />
                    <line x1="3" x2="21" y1="12" y2="12" />
                    <line x1="3" x2="21" y1="18" y2="18" />
                  </svg>
                  <svg
                    className="flex-shrink-0 hidden w-4 h-4 hs-collapse-open:block"
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
            </div>
            <div
              id="navbar-collapse-basic"
              className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
            >
              <div
                data-hs-scrollspy="#scrollspy-1"
                data-hs-scrollspy-scrollable-parent="#scrollspy-scrollable-parent-1"
                className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5 [--scrollspy-offset:220] md:[--scrollspy-offset:70]"
              >
                <a
                  className="text-sm leading-6 text-gray-700 hover:text-gray-500 focus:outline-none focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-blue-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400 active"
                  href="#first"
                >
                  First
                </a>
                <a
                  className="text-sm leading-6 text-gray-700 hover:text-gray-500 focus:outline-none focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-blue-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400"
                  href="#second"
                >
                  Second
                </a>
  
                <div
                  data-hs-scrollspy-group
                  className="hs-dropdown [--adaptive:none] [--placement:bottom-right]"
                >
                  <button
                    type="button"
                    id="hs-mega-menu-basic-dr"
                    className="inline-flex items-center justify-center mb-3 text-sm leading-6 text-gray-700 group hs-scrollspy-active:text-blue-600 sm:mb-0 dark:hs-scrollspy-active:text-blue-400 gap-x-1 hover:text-gray-500 focus:outline-none focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-blue-500"
                  >
                    Dropdown
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
  
                  <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-700 leading-6 hover:text-gray-500 focus:outline-none focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-blue-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400"
                      href="#third"
                    >
                      Third
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-700 leading-6 hover:text-gray-500 focus:outline-none focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-blue-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400"
                      href="#fourth"
                    >
                      Fourth
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-700 leading-6 hover:text-gray-500 focus:outline-none focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:text-blue-500 hs-scrollspy-active:text-blue-600 dark:hs-scrollspy-active:text-blue-400"
                      href="#fifth"
                    >
                      Fifth
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
  
        <div id="scrollspy-1" className="mt-3 space-y-4">
          <div id="first">
            <h3 className="text-lg font-semibold dark:text-white">First</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It&apos;s repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
          </div>
  
          <div id="second">
            <h3 className="text-lg font-semibold dark:text-white">Second</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It&apos;s repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
          </div>
  
          <div id="third">
            <h3 className="text-lg font-semibold dark:text-white">Third</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It&apos;s repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
          </div>
  
          <div id="fourth">
            <h3 className="text-lg font-semibold dark:text-white">Fourth</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It&apos;s repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
          </div>
  
          <div id="fifth">
            <h3 className="text-lg font-semibold dark:text-white">Fifth</h3>
            <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              This is some placeholder content for the scrollspy page. Note that
              as you scroll down the page, the appropriate navigation link is
              highlighted. It&apos;s repeated throughout the component example. We
              keep adding some more example copy here to emphasize the scrolling
              and highlighting.
            </p>
          </div>
        </div>
      </div>
    );
}
  