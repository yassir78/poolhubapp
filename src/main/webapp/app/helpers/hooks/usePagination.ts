import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPools, moveToPage } from 'app/redux/slices/poolSlice';

export type Pagination = {
  id: number;
  current: boolean;
  ellipsis: boolean;
};
const usePagination = ({ pages, currentPage }) => {
  const pagination: Array<Pagination> = [];
  const dispatch = useDispatch();
  useEffect(() => {
    // TODO document why this arrow function is empty
    console.log(pages);
    console.log(currentPage);
  }, [currentPage]);
  let ellipsisLeft: boolean = false;
  let ellipsisRight: boolean = false;
  for (let i = 0; i < pages; i++) {
    if (i === currentPage) {
      pagination.push({ id: i, current: true, ellipsis: false });
    } else {
      if (i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1) {
        pagination.push({ id: i, current: false, ellipsis: false });
      } else if (i > 1 && i < currentPage && !ellipsisLeft) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisLeft = true;
      } else if (i < pages && i > currentPage && !ellipsisRight) {
        pagination.push({ id: i, current: false, ellipsis: true });
        ellipsisRight = true;
      }
    }
  }
  const changePage = (page: number, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    dispatch(moveToPage(page));
    // @ts-ignore
    dispatch(getPools());
  };

  const goToPrevPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    if (currentPage > 0) {
      dispatch(moveToPage(currentPage - 1));
      // @ts-ignore
      dispatch(getPools());
    }
  };

  const goToNextPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, isLast: boolean): void => {
    event.preventDefault();
    if (!isLast) {
      dispatch(moveToPage(currentPage + 1));
      // @ts-ignore
      dispatch(getPools());
    }
  };
  return {
    pagination,
    prevPage: goToPrevPage,
    nextPage: goToNextPage,
    changePage,
  };
};

export default usePagination;
