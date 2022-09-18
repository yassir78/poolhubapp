import React, {useEffect, useState} from 'react';
import {Pool} from "app/models/pool.model";
import {Shape} from "app/models/enumerations/shape.model";
import {Color} from "app/models/enumerations/color.model";
import {Material} from "app/models/enumerations/material.model";
import {Category} from "app/models/enumerations/category.model";
import {
  faArrowDownShortWide,
  faArrowsLeftRight, faArrowsUpDown, faCheck, faClipboardCheck, faCopyright,
  faCube, faEuro, faLayerGroup,
  faPalette,
  faRecycle,
  faSquare,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ComparatorContainer = () => {

  const pool1: Pool = {
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
    height: 1.32,
    warranty: 2,
    category: Category.ONGROUND,
    brand: 'BESTWAY',
    price: 1299,
    nbStock: 3,
    active: true,
  }

  const pool2: Pool = {
    id: 2,
    ref: '2',
    label: 'Piscine power wood',
    description:
      'Cette piler, une trentaine de minutes vous suffira pour l\'installation de cette piscine.',
    volume: 15,
    shape: Shape.CIRCULAR,
    color: Color.BLUE,
    material: Material.BLACK,
    image: "https://firebasestorage.googleapis.com/v0/b/poolhubapp-859cf.appspot.com/o/pool_test_images%2F51gD4JXe9YL._AC_SL1000_.jpg?alt=media&token=451ae718-8e02-4f47-a8ac-df39d503bc04",
    length: 4,
    width: 7,
    height: 1.3,
    warranty: 5,
    category: Category.SEMI_INGROUND,
    brand: 'PARIS',
    price: 700,
    nbStock: 1,
    active: true,
  }

  // list of pools, max 3
  const [pools, setPools] = useState<Pool[]>([pool1, pool2]);
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

  useEffect(() => {
    if (pools.length < 1) return;
    const tempBestValues = JSON.parse(JSON.stringify(pools[0]));

    pools.forEach(pool => {
      if (pool.price < tempBestValues.price) {
        tempBestValues.price = pool.price
      }
      if (pool.volume > tempBestValues.volume) {
        tempBestValues.volume = pool.volume
      }
      if (pool.width > tempBestValues.width) {
        tempBestValues.width = pool.width
      }
      if (pool.length > tempBestValues.length) {
        tempBestValues.length = pool.length
      }
      if (pool.height > tempBestValues.height) {
        tempBestValues.height = pool.height
      }
      if (pool.warranty < tempBestValues.warranty) {
        tempBestValues.warranty = pool.warranty
      }
      setBestValues(tempBestValues)
    })
    setFilteredPrices(pools.map(pool => pool.price !== undefined ? `${pool.price} €` : '- €'));
    // Settings filtered values
    setFilteredImagesLabels(pools.map(pool => ({image: pool.image, label: pool.label})));
    setFilteredVolume(pools.map(pool => pool.volume !== undefined ? `${pool.volume} m3` : '-'));
    setFilteredShape(pools.map(pool => pool.shape !== undefined ? `${pool.shape}` : '-'));
    setFilteredColor(pools.map(pool => pool.color !== undefined ? `${pool.color}` : '-'));
    setFilteredMaterial(pools.map(pool => pool.material !== undefined ? `${pool.material}` : '-'));
    setFilteredWidth(pools.map(pool => pool.width !== undefined ? `${pool.width} m` : '-'));
    setFilteredLength(pools.map(pool => pool.length !== undefined ? `${pool.length} m` : '-'));
    setFilteredHeight(pools.map(pool => pool.height !== undefined ? `${pool.height} m` : '-'));
    setFilteredWarranty(pools.map(pool => pool.warranty !== undefined ? `${pool.warranty} ans` : '-'));
    setFilteredCategory(pools.map(pool => pool.category !== undefined ? `${pool.category}` : '-'));
    setFilteredBrand(pools.map(pool => pool.brand !== undefined ? `${pool.brand}` : '-'));
  }, [pools]);


  const getImageDiv = (poolLabel: string, imgSrc: string): JSX.Element => {
    return <div className="col-span-2 px-4 pt-4">
      <div className="mb-4 aspect-w-4 aspect-h-2 relative shadow-md">
        <img className="object-cover rounded-lg w-full" src={imgSrc} alt="Pool image"/>
      </div>
      <h2 className="flex justify-center font-bold text-2xl text-tertiary">{poolLabel}</h2>
    </div>
  }

  const getKeyDiv = (key: string, icon: IconDefinition): JSX.Element => {
    return <div className="py-6 pl-8 pr-4 border-r-2 border-r-textGray">
      <FontAwesomeIcon className="w-10 text-gray-400 " icon={icon}/>
      <span className="text-quinary">{key}</span>
    </div>
  }

  const getValueDiv = (value: string, isBestValue: boolean | null) => {
    return <div className="text-quinary col-span-2 flex justify-center items-center">
      {value}
      {isBestValue && pools.length > 1 && <FontAwesomeIcon className="ml-4 w-6 h-6 text-primary" icon={faCheck}/>}
    </div>
  }

  const getTableLine = (keyDiv: JSX.Element, filteredValues: any[], bestValue: any = null): JSX.Element => {
    return <div className={`bg-white even:bg-octonary grid grid-flow-row grid-cols-7`}>
      {keyDiv}
      {filteredValues.map((value) => {
        return getValueDiv(value, value ? value === bestValue : null)
      })}
    </div>
  }

  const getBuyButtons = () => {
    const rows: JSX.Element[] = [];
    for (let i = 0; i < pools.length; i++) {
      rows.push(<div className="col-span-2 flex justify-center align-middle">
        <div className="px-16 py-3 bg-primary mt-5 rounded-lg font-bold text-octonary cursor-pointer select-none hover:scale-105 transition-all ease-in active:opacity-75">
          Acheter
        </div>
      </div>);
    }
    return <div className="grid grid-flow-row grid-cols-7">
      <div/>
      {rows}
    </div>
  }

  return (
    <div className="text-tertiary px-24 py-10">

      <div className={`grid grid-flow-row grid-cols-7`}>
        <div/>
        {filteredImagesLabels.map(imageLabel => {
          return getImageDiv(imageLabel.label, imageLabel.image)
        })}
      </div>
      <div className="shadow-md mt-8">
        {
          bestValues && <>
            {getTableLine(getKeyDiv('Prix', faEuro), filteredPrices, bestValues.price + " €")}
            {getTableLine(getKeyDiv('Volume', faCube), filteredVolume, bestValues.volume + " m3")}
            {getTableLine(getKeyDiv('Forme', faSquare), filteredShape)}
            {getTableLine(getKeyDiv('Couleur', faPalette), filteredColor)}
            {getTableLine(getKeyDiv('Materiel', faRecycle), filteredMaterial)}
            {getTableLine(getKeyDiv('Longueur', faArrowsLeftRight), filteredWidth, bestValues.width + " m")}
            {getTableLine(getKeyDiv('Largeur', faArrowsUpDown), filteredLength, bestValues.length + " m")}
            {getTableLine(getKeyDiv('Profondeur', faArrowDownShortWide), filteredHeight, bestValues.height + " m")}
            {getTableLine(getKeyDiv('Garantie', faClipboardCheck), filteredWarranty, bestValues.warranty + " ans")}
            {getTableLine(getKeyDiv('Categorie', faLayerGroup), filteredCategory)}
            {getTableLine(getKeyDiv('Marque', faCopyright), filteredBrand)}
          </>
        }

      </div>
      {getBuyButtons()}
    </div>
  );
};

export default ComparatorContainer;
