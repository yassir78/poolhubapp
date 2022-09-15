import React from 'react';

const PageItem = ({ page, selected, changePage }) => {
  return (
    <a
      onClick={event => changePage(event)}
      className={`${
        selected ? 'bg-primary text-octonary' : 'text-textGray'
      }  relative hidden items-center bg-white px-4 py-2 text-sm font-md   focus:z-20 md:inline-flex hover:cursor-pointer`}
    >
      {page + 1}
    </a>
  );
};

export default PageItem;
