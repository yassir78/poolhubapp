import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPools, getPoolsBySearch, moveToPage } from 'app/redux/slices/poolSlice';

export type Pagination = {
  id: number;
  current: boolean;
  ellipsis: boolean;
};
const usePagination = ({ pages, currentPage, isSearch }) => {
  const pagination: Array<Pagination> = [];
  const dispatch = useDispatch();
  useEffect(() => {}, [currentPage]);
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
    console.log('isSearch', isSearch);
    // @ts-ignore
    isSearch ? dispatch(getPoolsBySearch()) : dispatch(getPools());
    // @ts-ignore
  };

  const goToPrevPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    if (currentPage > 0) {
      dispatch(moveToPage(currentPage - 1));
      // @ts-ignore
      isSearch ? dispatch(getPoolsBySearch()) : dispatch(getPools());
    }
  };

  const goToNextPage = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, isLast: boolean): void => {
    event.preventDefault();
    if (!isLast) {
      dispatch(moveToPage(currentPage + 1));
      // @ts-ignore
      isSearch ? dispatch(getPoolsBySearch()) : dispatch(getPools());
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
