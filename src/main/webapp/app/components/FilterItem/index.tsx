import React from 'react';

const FilterItem = ({ label }) => {
  return (
    <div className="flex items-center my-2">
      <input type="checkbox" className="form-checkbox text-primary focus:ring-0  border-gray-300  rounded-md 	mr-2" />{' '}
      <span className="font-rubik">{label}</span>
    </div>
  );
};

export default FilterItem;
