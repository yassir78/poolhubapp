import React, { useEffect, useState } from 'react';
import { FilterParamsType } from 'app/types/types';
import FilterItemTitle from 'app/components/FilterItemTitle';
import FilterItems from 'app/components/FilterItems';
import MultiRangeSlider from 'app/components/MultiRangeSlider';
import { categories, forms } from 'app/containers/MenuContainer/MenuData';
import { Pool } from 'app/models/pool.model';
import { Shape } from 'app/models/enumerations/shape.model';
import { Color } from 'app/models/enumerations/color.model';
import { Material } from 'app/models/enumerations/material.model';
import { Category } from 'app/models/enumerations/category.model';
import PoolCard from 'app/components/PoolCard';
import PageSelector from 'app/components/PageSelector';

const PoolExample: Pool = {
  id: 1,
  ref: '1',
  label: 'Piscine power steel',
  description:
    'Cette piscine tubulaire composée d\'une structure métallique clipsable "Seal & Lock system" est robuste et facile à installer, une trentaine de minutes vous suffira pour l\'installation de cette piscine.',
  volume: 19.28,
  shape: Shape.RECTANGULAR,
  color: Color.WHITE,
  material: Material.TUBULAR,
  image:
    'https://firebasestorage.googleapis.com/v0/b/poolhubapp-859cf.appspot.com/o/pool_test_images%2FPISCINE%20NOIR.jpg?alt=media&token=dfa2bdd9-af3d-4498-8a00-be8f51ad260c',
  length: 2.74,
  width: 6.4,
  depth: 1.32,
  warranty: 2,
  category: Category.ONGROUND,
  brand: 'BESTWAY',
  price: 1299,
  nbStock: 3,
  active: true,
};

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
        <div className="col-span-9 w-full pb-4 ">
          <div className="grid grid-cols-3 grid-rows-2 grid-flow-col gap-6">
            <PoolCard pool={PoolExample}></PoolCard>
            <PoolCard pool={PoolExample}></PoolCard>
            <PoolCard pool={PoolExample}></PoolCard>
            <PoolCard pool={PoolExample}></PoolCard>
            <PoolCard pool={PoolExample}></PoolCard>
            <PoolCard pool={PoolExample}></PoolCard>
          </div>
          <PageSelector />
        </div>
      </div>
    </>
  );
};

export default MenuContainer;
