import React, { useEffect, useState } from 'react';
import { FilterParamsType } from 'app/types/types';
import FilterItemTitle from 'app/components/FilterItemTitle';
import FilterItems from 'app/components/FilterItems';
import MultiRangeSlider from 'app/components/MultiRangeSlider';
import { categories, forms } from 'app/containers/MenuContainer/MenuData';

const MenuContainer = () => {
  const [priceMinValue, setPriceMinValue] = React.useState(0);
  const [priceMaxValue, setPriceMaxValue] = React.useState(1000);
  const [volumeMinValue, setVolumeMinValue] = React.useState(0);
  const [volumeMaxValue, setVolumeMaxValue] = React.useState(100);
  const [filterParams, setFilterParams] = useState<FilterParamsType>({
    forms: [],
    categories: [],
    priceMin: null,
    priceMax: null,
    volumeMin: null,
    volumeMax: null,
  });

  useEffect(() => {
    console.log('load pools from database');
    // TODO: dispatch action to fetch
  }, []);

  const handleFilters = (filters: Array<string> | number, category: string): void => {
    const newFilters: any = filterParams;
    newFilters[category] = filters;
    if (category === 'priceMax') {
      console.log('priceMax changed');
    }
    console.log(newFilters);
    // redux call
    setFilterParams(newFilters);
  };

  return (
    <>
      <div className="grid grid-cols-12 pt-10 gap-5">
        <div className="col-span-3">
          <div className="w-full bg-white px-5 pt-4 rounded-lg border border-gray-border">
            <span className="font-rubik font-medium	text-lg		">Filtrer les résultats</span>
            <FilterItemTitle title={'Forme'} />
            <FilterItems list={forms} handleFilters={filters => handleFilters(filters, 'forms')} />
            <FilterItemTitle title={'Catégorie'} />
            <FilterItems list={categories} handleFilters={filters => handleFilters(filters, 'categories')} />
            <FilterItemTitle title={'Prix (€) '} />
            <MultiRangeSlider
              maxValue={priceMaxValue}
              minValue={priceMinValue}
              setMinValue={setPriceMinValue}
              handleFilters={handleFilters}
              setMaxValue={setPriceMaxValue}
              min={0}
              field="price"
              max={1000}
              step={100}
              priceCap={100}
            />
            <FilterItemTitle title={'Volume (m3)'} />
            <MultiRangeSlider
              maxValue={volumeMaxValue}
              minValue={volumeMinValue}
              setMinValue={setVolumeMinValue}
              handleFilters={handleFilters}
              field="volume"
              setMaxValue={setVolumeMaxValue}
              min={0}
              max={100}
              step={10}
              priceCap={10}
            />
          </div>
        </div>
        <div className="col-span-9 w-full bg-primary">cards</div>
      </div>
    </>
  );
};

export default MenuContainer;
