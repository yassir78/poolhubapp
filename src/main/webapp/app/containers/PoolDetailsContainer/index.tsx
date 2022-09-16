import React, { FC, useEffect } from 'react';
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
  faPalette,
  faRecycle,
  faSquare,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import BackButton from 'app/components/BackButton';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Color } from 'app/models/enumerations/color.model';
import { Material } from 'app/models/enumerations/material.model';
import { Shape } from 'app/models/enumerations/shape.model';
import { Category } from 'app/models/enumerations/category.model';
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

  return (
    <div className="min-h-screen bg-octonary px-24 ">
      <div className="flex relative flex-col text-tertiary pt-10 gap-y-10">
        <BackButton routeTo={"/"}/>
        <div className="flex flex-col lg:flex-row gap-10">
          <div
            className="aspect-w-4 lg:aspect-h-1 aspect-h-2 w-full lg:w-3/5 bg-white rounded-lg border border-gray-border relative">
            <img className="object-cover w-full rounded-lg" src={pool.image} alt="pool image"/>
          </div>
          <PoolDetailsCard pool={pool}/>
        </div>
        <div className="w-full rounded-lg bg-white text-tertiary border border-gray-border pt-6 pb-12">
          <h3 className="font-semibold px-8 pb-6">Description :</h3>
          <p className=" px-8 pb-7 text-justify">{pool.description}</p>
          <h3 className="px-8 py-3 font-bold bg-octonary">Détails du bien</h3>
          <div className="grid md:grid-cols-2 grid-cols-1">
            {tableLine('Volume', pool.volume != undefined ? `${pool.shape} m3` : '-', faCube)}
            {tableLine('Forme', pool.shape != undefined ? `${pool.shape}` : '-', faSquare)}
            {tableLine('Couleur', pool.color != undefined ? `${pool.color}` : '-', faPalette)}
            {tableLine('Materiel', pool.material != undefined ? `${pool.material}` : '-', faRecycle)}
            {tableLine('Longueur', pool.width != undefined ? `${pool.width} m` : '-', faArrowsLeftRight)}
            {tableLine('Largeur', pool.length != undefined ? `${pool.length} m` : '-', faArrowsUpDown)}
            {tableLine('Profondeur', pool.height != undefined ? `${pool.height} m` : '-', faArrowDownShortWide)}
            {tableLine('Garantie', pool.warranty != undefined ? `${pool.warranty} ans` : '-', faClipboardCheck)}
            {tableLine('Categorie', pool.category, faLayerGroup)}
            {tableLine('Marque', pool.brand, faCopyright)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolDetailsContainer;
