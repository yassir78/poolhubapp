import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PageSelector = () => {
  const pageNumber = (page: number | string, selected: boolean = false): JSX.Element => {
    return (
      <a
        href="#"
        className={`${
          selected ? 'font-bold' : ''
        }  relative hidden items-center bg-white px-4 py-2 text-sm font-md text-textGray hover:bg-octonary focus:z-20 md:inline-flex`}
      >
        {page}
      </a>
    );
  };

  return (
    <div className="w-full flex justify-end">
      <nav className="isolate inline-flex -space-x-px border border-gray-border" aria-label="Pagination">
        <a
          href="#"
          className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-medium text-tertiary hover:bg-octonary  focus:z-20"
        >
          <span className="sr-only">Previous</span>
          <FontAwesomeIcon className="h-5 w-5 text-primary" aria-hidden="true" icon={faChevronLeft} />
        </a>
        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
        {pageNumber(1, true)}
        {pageNumber(2, false)}
        {pageNumber(3, false)}
        {pageNumber('...', false)}
        {pageNumber(8, false)}
        {pageNumber(9, false)}
        {pageNumber(10, false)}

        <a
          href="#"
          className="relative inline-flex items-center bg-white px-2 py-2 text-sm font-medium text-tertiary hover:bg-octonary focus:z-20"
        >
          <span className="sr-only">Next</span>
          <FontAwesomeIcon className="h-5 w-5 text-primary" aria-hidden="true" icon={faChevronRight} />
        </a>
      </nav>
    </div>
  );
};

export default PageSelector;
