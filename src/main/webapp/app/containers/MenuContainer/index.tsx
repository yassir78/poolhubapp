import React from 'react';
import FilterSideNav from 'app/components/FiltlerSideNav';

const MenuContainer = () => {
  return (
    <>
      <div className="grid grid-cols-12 pt-10 gap-5">
        <div className="col-span-3">
          <FilterSideNav />
        </div>
        <div className="col-span-9 w-full bg-primary">cards</div>
      </div>
    </>
  );
};

export default MenuContainer;
