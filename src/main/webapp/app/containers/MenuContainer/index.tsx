import React, {useEffect, useState} from 'react';
import {FilterParamsType, PaginationType} from 'app/types/types';
import FilterItemTitle from 'app/components/FilterItemTitle';
import FilterItems from 'app/components/FilterItems';
import MultiRangeSlider from 'app/components/MultiRangeSlider';
import {categories, forms} from 'app/containers/MenuContainer/MenuData';
import {Pool} from 'app/models/pool.model';
import PoolCard from 'app/components/PoolCard';
import PageSelector from 'app/components/PageSelector';
import SearchBar from 'app/components/SeachBar';
import {useDispatch, useSelector} from 'react-redux';
import {
  getPools,
  getPoolsBySearch,
  selectPoolsList,
  selectPoolsLoading,
  selectPoolsPagination,
  selectPoolsSearch,
  selectPoolsSearchOptions,
  setPoolSearch,
} from 'app/redux/slices/poolSlice';
import Skeleton from 'app/components/Skeleton';
import usePagination from 'app/helpers/hooks/usePagination';
import { categoriesNamingFrToEn, formsNamingFrToEn } from 'app/helpers/constants/forms';

const MenuContainer = () => {
  const pools = useSelector(selectPoolsList);
  const loading = useSelector(selectPoolsLoading);
  const isSearch = useSelector(selectPoolsSearch);
  const poolSearchOptions = useSelector(selectPoolsSearchOptions);

  const paginationBack: PaginationType = useSelector(selectPoolsPagination);
  const {pagination, prevPage, nextPage, changePage} = usePagination({
    pages: paginationBack.totalPages,
    currentPage: paginationBack.pageable.pageNumber,
    isSearch: isSearch,
  });

  const [priceMinValue, setPriceMinValue] = React.useState(0);
  const [priceMaxValue, setPriceMaxValue] = React.useState(10000);
  const [volumeMinValue, setVolumeMinValue] = React.useState(0);
  const [volumeMaxValue, setVolumeMaxValue] = React.useState(100);
  const dispatch = useDispatch();
  const [filterParams, setFilterParams] = useState<FilterParamsType>({
    forms: [],
    categories: [],
    priceMin: null,
    priceMax: null,
    volumeMin: null,
    volumeMax: null,
  });

  useEffect(() => {
    if (!isSearch) {
      // @ts-ignore
      dispatch(getPools());
    }
  }, []);

  const handleFilters = (filters: Array<string> | number, category: string): void => {
    const newFilters: any = filterParams;
    let newFiltersArray: Array<string> = [];
    if (category === 'forms') {
      // @ts-ignore
      newFiltersArray = filters.map(filter => formsNamingFrToEn[filter]);
    }
    if (category === 'categories') {
      // @ts-ignore
      newFiltersArray = filters.map(filter => categoriesNamingFrToEn[filter]);
    }
    newFiltersArray.length === 0 ? (newFilters[category] = filters) : (newFilters[category] = newFiltersArray);
    setFilterParams(newFilters);
    // redux call
    dispatch(setPoolSearch(newFilters));
    // @ts-ignore
    dispatch(getPoolsBySearch());
  };

  return (

    <div className="min-h-screen bg-octonary px-24 ">
      <div className="grid grid-cols-12 pt-10 gap-5">
        <div className="col-span-3">
          <div className="w-full bg-white px-5 pt-4 rounded-lg shadow-md">
            <span className="font-rubik font-medium	text-lg		">Filtrer les résultats</span>
            <FilterItemTitle title={'Forme'} />
            <FilterItems list={forms} handleFilters={filters => handleFilters(filters, 'forms')} field="forms" />
            <FilterItemTitle title={'Catégorie'} />
            <FilterItems list={categories} handleFilters={filters => handleFilters(filters, 'categories')} field="categories" />
            <FilterItemTitle title={'Prix (€) '} />
            <MultiRangeSlider
              maxValue={priceMaxValue}
              minValue={priceMinValue}
              setMinValue={setPriceMinValue}
              handleFilters={handleFilters}
              setMaxValue={setPriceMaxValue}
              min={0}
              field="price"
              max={10000}
              step={100}
              priceCap={100}
            />
            <FilterItemTitle title={'Volume (m3)'}/>
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
          <SearchBar handleFilters={filters => handleFilters(filters, 'search')}/>
          <div className="font-rubik my-4 text-xl">Résultat : {paginationBack.totalElements} piscines</div>
          {loading && <Skeleton/>}
          <div className="grid grid-cols-3 grid-rows-2 grid-flow-row gap-6">
            {!loading && pools.map((pool: Pool, index: number) => <PoolCard key={index} pool={pool}/>)}
          </div>
          <PageSelector
            pagination={pagination}
            changePage={changePage}
            nextPage={nextPage}
            isLast={paginationBack.last}
            prevPage={prevPage}
            isFirst={paginationBack.first}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuContainer;
