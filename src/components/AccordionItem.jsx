/* eslint-disable react/prop-types */
export default function AccordionItem(props) {
  const { title, content } = props;

  return (
    <div className="hs-accordion">
      <button className="inline-flex items-center w-full py-3 font-semibold text-gray-800 rounded-lg hs-accordion-toggle hs-accordion-active:text-blue-600 gap-x-3 text-start hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400">
        <svg
          className="block w-4 h-4 hs-accordion-active:hidden"
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
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <svg
          className="hidden w-4 h-4 hs-accordion-active:block"
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
          <path d="M5 12h14" />
        </svg>
        {title}
      </button>
      <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300">
        <p className="text-gray-800 dark:text-gray-200">{content}</p>
      </div>
    </div>
  );
}
