import React from 'react';
import PoolDetailsCard from "app/components/PoolDetailsCard";
import {Pool} from "app/models/pool.model";
import {Shape} from "app/models/enumerations/shape.model";
import {Color} from "app/models/enumerations/color.model";
import {Material} from "app/models/enumerations/material.model";
import {Category} from "app/models/enumerations/category.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCube,
  faLayerGroup,
  faRecycle,
  faPalette,
  IconDefinition,
  faSquare,
  faArrowsUpDown, faArrowsLeftRight, faArrowDownShortWide, faCopyright, faClipboardCheck
} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import BackButton from "app/components/BackButton";

const PoolDetailsContainer = () => {

  const pool: Pool = {
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

  const tableLine = (key: string, value: string, icon: IconDefinition) => {
    return <div className="grid grid-cols-2 px-8 py-6 border-b odd:border-r border-gray-border">
      <div>
        <FontAwesomeIcon className="w-10" icon={icon}/>
        {key}
      </div>
      <div>{value}</div>
    </div>
  }

  return (
    <div className="flex relative flex-col text-tertiary gap-y-10">
      <BackButton routeTo={"/"}/>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="aspect-w-4 lg:aspect-h-1 aspect-h-2 w-full lg:w-3/5 bg-white rounded-lg border border-gray-border relative">
          <img className="object-cover w-full rounded-lg" src={pool.image} alt="pool image"/>
        </div>
        <PoolDetailsCard pool={pool}/>
      </div>
      <div className="w-full rounded-lg bg-white text-tertiary border border-gray-border pt-6 pb-12">
        <h3 className="font-semibold px-8 pb-6">Description :</h3>
        <p className=" px-8 pb-7 text-justify">{pool.description}</p>
        <h3 className="px-8 py-3 font-bold bg-octonary">Détails du bien</h3>
        <div className="grid md:grid-cols-2 grid-cols-1">

        {tableLine("Volume", pool.volume.toString() + " m3", faCube)}
        {tableLine("Forme", pool.shape, faSquare)}
        {tableLine("Couleur", pool.color, faPalette)}
        {tableLine("Materiel", pool.material, faRecycle)}
        {tableLine("Longueur", pool.width.toString() + "m", faArrowsLeftRight)}
        {tableLine("Largeur", pool.length.toString() + "m", faArrowsUpDown)}
        {tableLine("Profondeur", pool.depth.toString() + "m", faArrowDownShortWide)}
        {tableLine("Garantie", pool.warranty.toString() + " ans", faClipboardCheck)}
        {tableLine("Categorie", pool.category, faLayerGroup)}
        {tableLine("Marque", pool.brand, faCopyright)}
        </div>

      </div>
    </div>
  );
};

export default PoolDetailsContainer;
