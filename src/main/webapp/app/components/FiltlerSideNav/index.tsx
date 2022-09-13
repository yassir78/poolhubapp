import React from 'react';
import FilterItemTitle from 'app/components/FilterItemTitle';
import FilterItem from 'app/components/FilterItem';
import MultiRangeSlider from 'app/components/MultiRangeSlider';

const FilterSideNav = () => {
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(1000);
  return (
    <div className="w-full bg-white px-5 pt-4 rounded-lg border border-gray-border">
      <span className="font-rubik font-medium	text-lg		">Filtrer les résultats</span>
      <FilterItemTitle title={'Forme'} />
      <FilterItem label={'Hexagone'} />
      <FilterItem label={'Réctangulaire'} />
      <FilterItem label={'Oval'} />
      <FilterItemTitle title={'Catégorie'} />
      <FilterItem label={'Creusée'} />
      <FilterItem label={'Semi-Creusée'} />
      <FilterItem label={'Hors-sol'} />

      <FilterItemTitle title={'Prix (€) '} />
      <MultiRangeSlider initialMin={2500} initialMax={7500} min={0} max={10000} step={100} priceCap={1000} />
      <FilterItemTitle title={'Volume (m3)'} />
      <span>Volume filter</span>
    </div>
  );
};

export default FilterSideNav;
