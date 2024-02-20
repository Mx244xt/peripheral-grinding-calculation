import React from 'react'
type Props = {
  children: React.ReactNode;
  label: string;
  isAccordion: boolean;
  changAccordion: () => void;
}

function Accordion({ children, isAccordion, changAccordion, label }: Props) {
  return (
    <section className="mb-5 border border-gray-200 rounded-xl dark:border-gray-700">
      <button type="button" className={`flex items-center justify-between w-full p-3 font-medium rtl:text-right text-gray-500 ${isAccordion ? "rounded-xl" : "rounded-t-xl"} focus:ring-1 focus:ring-gray-200 dark:focus:ring-gray-800  dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`} onClick={() => changAccordion()}>
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">{label}</h2>
        <svg xmlns="http://www.w3.org/2000/svg" data-accordion-icon className={`w-3 h-3 ${isAccordion ? "rotate-0" : "rotate-180"} shrink-0`} aria-hidden="true" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
        </svg>
      </button>
      <div className={`${isAccordion && "hidden"} grid grid-cols-1 mb-5 sm:grid-cols-2`}>
        {children}
      </div>
    </section>
  )
}

export default Accordion