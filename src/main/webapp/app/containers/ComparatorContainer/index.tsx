import React, { useEffect, useState } from 'react';
import {
  faArrowDownShortWide,
  faArrowsLeftRight,
  faArrowsUpDown,
  faCheck,
  faClipboardCheck,
  faCopyright,
  faCube,
  faEuro,
  faLayerGroup,
  faPalette,
  faRecycle,
  faSquare,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackButton from 'app/components/BackButton';
import { categoriesNamingEnToFr, colorsNamingEnToFr, formsNamingEnToFr, materialNamingEnToFr } from 'app/helpers/constants/forms';
import { useDispatch, useSelector } from 'react-redux';
import { removePoolIndexFromComparator, selectComparatorPools, setPool } from 'app/redux/slices/poolSlice';
import { PoolType } from 'app/types/types';
import { Link, useNavigate } from 'react-router-dom';

const ComparatorContainer = () => {
  const comparatorPools = useSelector(selectComparatorPools);

  // list of pools, max 3
  const [pools, setPools] = useState<PoolType[]>(comparatorPools);
  // bestValues for the check marks
  const [bestValues, setBestValues] = useState(null);
  // Filtered values
  const [filteredPrices, setFilteredPrices] = useState([]);
  const [filteredImagesLabels, setFilteredImagesLabels] = useState([]);
  const [filteredVolume, setFilteredVolume] = useState([]);
  const [filteredShape, setFilteredShape] = useState([]);
  const [filteredColor, setFilteredColor] = useState([]);
  const [filteredMaterial, setFilteredMaterial] = useState([]);
  const [filteredWidth, setFilteredWidth] = useState([]);
  const [filteredLength, setFilteredLength] = useState([]);
  const [filteredHeight, setFilteredHeight] = useState([]);
  const [filteredWarranty, setFilteredWarranty] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setPools(comparatorPools);
  }, [comparatorPools]);

  useEffect(() => {
    if (pools.length < 1) return;
    const tempBestValues = JSON.parse(JSON.stringify(pools[0]));

    pools.forEach(pool => {
      if (pool.price < tempBestValues.price) {
        tempBestValues.price = pool.price;
      }
      if (pool.volume > tempBestValues.volume) {
        tempBestValues.volume = pool.volume;
      }
      if (pool.width > tempBestValues.width) {
        tempBestValues.width = pool.width;
      }
      if (pool.length > tempBestValues.length) {
        tempBestValues.length = pool.length;
      }
      if (pool.height > tempBestValues.height) {
        tempBestValues.height = pool.height;
      }
      if (pool.warranty < tempBestValues.warranty) {
        tempBestValues.warranty = pool.warranty;
      }
      setBestValues(tempBestValues);
    });
    setFilteredPrices(pools.map(pool => (pool.price !== undefined ? `${pool.price} €` : '- €')));
    // Settings filtered values
    setFilteredImagesLabels(pools.map(pool => ({ image: pool.image, label: pool.label })));
    setFilteredVolume(pools.map(pool => (pool.volume !== undefined ? `${pool.volume} m3` : '-')));
    setFilteredShape(pools.map(pool => (pool.shape !== undefined ? `${formsNamingEnToFr[pool.shape]}` : '-')));
    setFilteredColor(pools.map(pool => (pool.color !== undefined ? `${colorsNamingEnToFr[pool.color]}` : '-')));
    setFilteredMaterial(pools.map(pool => (pool.material !== undefined ? `${materialNamingEnToFr[pool.material]}` : '-')));
    setFilteredWidth(pools.map(pool => (pool.width !== undefined ? `${pool.width} m` : '-')));
    setFilteredLength(pools.map(pool => (pool.length !== undefined ? `${pool.length} m` : '-')));
    setFilteredHeight(pools.map(pool => (pool.height !== undefined ? `${pool.height} m` : '-')));
    setFilteredWarranty(pools.map(pool => (pool.warranty !== undefined ? `${pool.warranty} ans` : '-')));
    setFilteredCategory(pools.map(pool => (pool.category !== undefined ? `${categoriesNamingEnToFr[pool.category]}` : '-')));
    setFilteredBrand(pools.map(pool => (pool.brand !== undefined ? `${pool.brand}` : '-')));
  }, [pools]);

  const handlePoolRemove = (index: number) => {
    dispatch(removePoolIndexFromComparator(index));
  };

  const getImageDiv = (poolLabel: string, imgSrc: string, index: number): JSX.Element => {
    console.log(index);
    return (
      <div className="col-span-2 relative px-4 pt-4">
        <div className="mb-4 aspect-w-4 aspect-h-2 relative shadow-md">
          <svg
            onClick={() => handlePoolRemove(index)}
            className="absolute $ cursor-pointer hover:opacity-75 text-red-500 top-0 left-full w-8 h-8 -translate-x-full z-20"
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 22.5V27.5H37.5V22.5H12.5ZM25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM25 45C13.975 45 5 36.025 5 25C5 13.975 13.975 5 25 5C36.025 5 45 13.975 45 25C45 36.025 36.025 45 25 45Z"
              fill="currentColor"
            />
          </svg>
          <img className="select-none object-cover rounded-lg w-full" src={imgSrc} alt="Pool image" />
        </div>
        <h2 className="flex justify-center font-bold text-2xl text-tertiary">{poolLabel}</h2>
      </div>
    );
  };

  const getKeyDiv = (key: string, icon: IconDefinition): JSX.Element => {
    return (
      <div className="py-6 pl-8 pr-4 border-r-2 border-r-textGray">
        <FontAwesomeIcon className="w-10 text-gray-400 " icon={icon} />
        <span className="text-quinary">{key}</span>
      </div>
    );
  };

  const getValueDiv = (value: string, isBestValue: boolean | null) => {
    return (
      <div className="text-quinary col-span-2 flex justify-center items-center">
        {value}
        {isBestValue && pools.length > 1 && <FontAwesomeIcon className="ml-4 w-6 h-6 text-primary" icon={faCheck} />}
      </div>
    );
  };

  const getTableLine = (keyDiv: JSX.Element, filteredValues: any[], bestValue: any = null): JSX.Element => {
    return (
      <div className={`bg-white even:bg-octonary grid grid-flow-row grid-cols-7`}>
        {keyDiv}
        {filteredValues.map(value => {
          return getValueDiv(value, value ? value === bestValue : null);
        })}
      </div>
    );
  };
  const handleClick = pool => {
    dispatch(setPool(pool));
    navigate('/purchase');
  };

  const getBuyButtons = () => {
    const rows: JSX.Element[] = [];
    for (const pool of pools) {
      rows.push(
        <div className="col-span-2 flex flex-col justify-center items-center">
          <div
            onClick={() => handleClick(pool)}
            className={
              'px-16 py-3 mt-5 rounded-lg w-fit font-bold text-octonary select-none ' +
              (pool.stock > 0 ? ' bg-primary cursor-pointer hover:scale-105 transition-all ease-in active:opacity-75' : 'bg-textGray')
            }
          >
            Acheter
          </div>
          {pool.stock <= 0 && <p className="text-red-500 text-xs mt-2">Rupture de stock</p>}
        </div>
      );
    }
    return (
      <div className="grid grid-flow-row grid-cols-7">
        <div />
        {rows}
      </div>
    );
  };

  if (pools.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center text-tertiary font-bold w-full px-24 pb-[34rem] pt-10">
        <h1 className="text-2xl">Aucun élément dans le comparateur</h1>
        <Link
          to={'/'}
          className={
            'px-16 py-3 mt-5 rounded-lg w-fit text-octonary select-none bg-primary cursor-pointer hover:scale-105 transition-all ease-in active:opacity-75'
          }
        >
          Retourner à la page principal
        </Link>
      </div>
    );
  }

  return (
    <div className="text-tertiary px-24 py-10">
      <BackButton routeTo={'/'} />
      <div className={`grid grid-flow-row grid-cols-7`}>
        <div />
        {filteredImagesLabels.map((imageLabel, index) => {
          return getImageDiv(imageLabel.label, imageLabel.image, index);
        })}
      </div>
      <div className="shadow-md mt-8">
        {bestValues && (
          <>
            {getTableLine(getKeyDiv('Prix', faEuro), filteredPrices, bestValues.price + ' €')}
            {getTableLine(getKeyDiv('Volume', faCube), filteredVolume, bestValues.volume + ' m3')}
            {getTableLine(getKeyDiv('Forme', faSquare), filteredShape)}
            {getTableLine(getKeyDiv('Couleur', faPalette), filteredColor)}
            {getTableLine(getKeyDiv('Materiel', faRecycle), filteredMaterial)}
            {getTableLine(getKeyDiv('Longueur', faArrowsLeftRight), filteredWidth, bestValues.width + ' m')}
            {getTableLine(getKeyDiv('Largeur', faArrowsUpDown), filteredLength, bestValues.length + ' m')}
            {getTableLine(getKeyDiv('Profondeur', faArrowDownShortWide), filteredHeight, bestValues.height + ' m')}
            {getTableLine(getKeyDiv('Garantie', faClipboardCheck), filteredWarranty, bestValues.warranty + ' ans')}
            {getTableLine(getKeyDiv('Categorie', faLayerGroup), filteredCategory)}
            {getTableLine(getKeyDiv('Marque', faCopyright), filteredBrand)}
          </>
        )}
      </div>
      {getBuyButtons()}
    </div>
  );
};

export default ComparatorContainer;
