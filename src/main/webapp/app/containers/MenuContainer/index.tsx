import React from 'react';
import FilterSideNav from 'app/components/FiltlerSideNav';
import {Pool} from "app/models/pool.model";
import {Shape} from "app/models/enumerations/shape.model";
import {Color} from "app/models/enumerations/color.model";
import {Material} from "app/models/enumerations/material.model";
import {Category} from "app/models/enumerations/category.model";
import PoolCard from "app/components/PoolCard";
import PageSelector from "app/components/PageSelector";

const PoolExample:Pool = {
  id: 1,
  ref: "1",
  label: "Piscine power steel",
  description: "Cette piscine tubulaire composée d'une structure métallique clipsable \"Seal & Lock system\" est robuste et facile à installer, une trentaine de minutes vous suffira pour l'installation de cette piscine.",
  volume: 19.28,
  shape: Shape.RECTANGULAR,
  color: Color.WHITE,
  material: Material.TUBULAR,
  image: "https://firebasestorage.googleapis.com/v0/b/poolhubapp-859cf.appspot.com/o/pool_test_images%2FPISCINE%20NOIR.jpg?alt=media&token=dfa2bdd9-af3d-4498-8a00-be8f51ad260c",
  length: 2.74,
  width: 6.4,
  depth: 1.32,
  warranty: 2,
  category: Category.ONGROUND,
  brand: "BESTWAY",
  price: 1299,
  nbStock: 3,
  active: true

}

const MenuContainer = () => {
  return (
    <>
      <div className="grid grid-cols-12 pt-10 gap-5">
        <div className="col-span-3">
          <FilterSideNav/>
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
          <PageSelector/>
        </div>
      </div>
    </>
  );
};

export default MenuContainer;
