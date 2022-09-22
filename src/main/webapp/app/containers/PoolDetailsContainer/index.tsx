import React, { FC, useState } from 'react';
import PoolDetailsCard from 'app/components/PoolDetailsCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownShortWide,
  faArrowsLeftRight,
  faArrowsUpDown,
  faClipboardCheck,
  faCopyright,
  faCube,
  faLayerGroup,
  faMagnifyingGlassPlus,
  faPalette,
  faRecycle,
  faSquare,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import BackButton from 'app/components/BackButton';
import { categoriesNamingEnToFr, colorsNamingEnToFr, formsNamingEnToFr, materialNamingEnToFr } from 'app/helpers/constants/forms';
import ModalImg from 'app/components/ModalImg';
import { useSelector } from 'react-redux';
import { selectPool } from 'app/redux/slices/poolSlice';

const PoolDetailsContainer: FC = () => {
  const pool = useSelector(selectPool);
  const tableLine = (key: string, value: string, icon: IconDefinition) => {
    return (
      <div className="grid grid-cols-2 px-8 py-6 border-b odd:border-r border-gray-border">
        <div>
          <FontAwesomeIcon className="w-10 text-gray-400 " icon={icon} />
          <span className="text-blue-600">{key}</span>
        </div>
        <div>{value}</div>
      </div>
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex relative flex-col text-tertiary gap-y-10 px-24 py-10">
      <BackButton routeTo={'/'} />
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="aspect-w-4 overflow-hidden lg:aspect-h-1 group aspect-h-2 w-full lg:w-3/5 bg-white rounded-lg shadow-md relative">
          <img className="object-cover w-full rounded-lg" src={pool.image} />
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-full h-full cursor-pointer z-3 bg-quinary bg-opacity-25 opacity-0 group-hover:opacity-100 transition-all ease-in duration-200"
          ></div>
          <FontAwesomeIcon
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer absolute z-4 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 w-24 h-24 text-tertiary rotate-90 transition-all ease-in duration-200 "
            icon={faMagnifyingGlassPlus}
          />
        </div>
        <PoolDetailsCard pool={pool} />
      </div>
      <div className="w-full rounded-lg bg-white text-tertiary border border-gray-border pt-6 pb-12">
        <h3 className="font-semibold px-8 pb-6">Description :</h3>
        <p className=" px-8 pb-7 text-justify">{pool.description}</p>
        <h3 className="px-8 py-3 font-bold bg-octonary">Détails du bien</h3>
        <div className="grid md:grid-cols-2 grid-cols-1">
          {tableLine('Volume', pool.volume != undefined ? `${pool.volume} m3` : '-', faCube)}
          {tableLine('Forme', pool.shape != undefined ? `${formsNamingEnToFr[pool.shape]}` : '-', faSquare)}
          {tableLine('Couleur', pool.color != undefined ? `${colorsNamingEnToFr[pool.color]}` : '-', faPalette)}
          {tableLine('Materiel', pool.material != undefined ? `${materialNamingEnToFr[pool.material]}` : '-', faRecycle)}
          {tableLine('Longueur', pool.width != undefined ? `${pool.width} m` : '-', faArrowsLeftRight)}
          {tableLine('Largeur', pool.length != undefined ? `${pool.length} m` : '-', faArrowsUpDown)}
          {tableLine('Profondeur', pool.height != undefined ? `${pool.height} m` : '-', faArrowDownShortWide)}
          {tableLine('Garantie', pool.warranty != undefined ? `${pool.warranty} ans` : '-', faClipboardCheck)}
          {tableLine('Categorie', pool.category != undefined ? `${categoriesNamingEnToFr[pool.category]}` : '-', faLayerGroup)}
          {tableLine('Marque', pool.brand != undefined ? `${pool.brand}` : '-', faCopyright)}
        </div>
      </div>
      {isModalOpen && <ModalImg image={pool.image} handleClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PoolDetailsContainer;
