import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPoolsSearchOptions } from 'app/redux/slices/poolSlice';
import { categoriesNamingEnToFr, formsNamingEnToFr } from 'app/helpers/constants/forms';

type PropsType = {
  handleFilters: (filters: Array<string>) => void;
  list: Array<{ name: string }>;
};
const FilterItems = ({ handleFilters, list, field }) => {
  const poolOptions = useSelector(selectPoolsSearchOptions);
  const [checked, setChecked] = useState<Array<string>>(
    field == 'forms'
      ? poolOptions[field].map(pool => formsNamingEnToFr[pool])
      : poolOptions[field].map(pool => categoriesNamingEnToFr[pool])
  );

  const handleToggle = (value: string): void => {
    const currentIndex: number = checked.indexOf(value);
    const newChecked: Array<string> = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };
  return (
    list &&
    list.map((value: { label: string }, index: number) => (
      <div className="flex items-center my-2" key={index}>
        <input
          type="checkbox"
          onChange={() => handleToggle(value.label)}
          checked={checked.indexOf(value.label) !== -1}
          className="form-checkbox text-primary focus:ring-0  border-gray-300  rounded-md 	mr-2"
        />{' '}
        <span className="font-rubik">{value.label}</span>
      </div>
    ))
  );
};

export default FilterItems;
