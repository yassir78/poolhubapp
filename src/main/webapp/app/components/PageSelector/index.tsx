import React from 'react';
import { Pagination } from 'app/helpers/hooks/usePagination';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageItem from 'app/components/PageItem';

type PropsType = {
  pagination: Array<Pagination>;
  prevPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  changePage: (page: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};
const PageSelector = ({ pagination, prevPage, changePage, nextPage, isLast, isFirst }) => {
  return (
    <>
      <div className="w-full flex justify-end mt-5">
        <nav className="isolate inline-flex -space-x-px border border-gray-border" aria-label="Pagination">
          <a
            onClick={event => prevPage(event)}
            className={`relative inline-flex items-center bg-white px-2 py-2 text-sm font-medium text-tertiary ${
              isFirst ? 'bg-septenary cursor-not-allowed' : 'bg-white hover:bg-octonary'
            }   focus:z-20`}
          >
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon className="h-5 w-5 text-primary" aria-hidden="true" icon={faChevronLeft} />
          </a>
          {pagination.map((page: Pagination, index: number) => {
            if (!page.ellipsis) {
              if (page.current) {
                return <PageItem page={page.id} selected={page.current} key={index} changePage={event => changePage(page.id, event)} />;
              } else {
                return <PageItem page={page.id} selected={page.current} key={index} changePage={event => changePage(page.id, event)} />;
              }
            } else {
              return (
                <a
                  onClick={event => changePage(event)}
                  className={`relative inline-flex items-center bg-white px-2 py-2 text-sm font-medium text-tertiary ${
                    isLast ? 'bg-septenary cursor-not-allowed' : 'bg-white hover:bg-octonary'
                  }   focus:z-20`}
                >
                  ...
                </a>
              );
            }
          })}
          <a
            onClick={event => nextPage(event, isLast)}
            className={`relative inline-flex items-center bg-white px-2 py-2 text-sm font-medium text-tertiary ${
              isLast ? 'bg-septenary cursor-not-allowed' : 'bg-white hover:bg-octonary'
            }  focus:z-20'}`}
          >
            <span className="sr-only">Next</span>
            <FontAwesomeIcon className="h-5 w-5 text-primary" aria-hidden="true" icon={faChevronRight} />
          </a>
        </nav>
      </div>

      {/*
                   )
*/}
    </>
  );
};

export default PageSelector;
