import React, { FC } from 'react';
import { Pool } from 'app/models/pool.model';
import { Shape } from 'app/models/enumerations/shape.model';
import { Color } from 'app/models/enumerations/color.model';
import { Material } from 'app/models/enumerations/material.model';
import { Category } from 'app/models/enumerations/category.model';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export interface PropsPoolDetailsCard {
  pool: Pool;
}

const PoolDetailsCard: FC<PropsPoolDetailsCard> = ({ pool }) => {
  const starSvg = () => {
    return (
      <svg className="fill-[yellow]" width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_26_167)">
          <rect width="27" height="28" fill="white" />
          <path
            d="M16.2338 12.6667L13.5 3.33333L10.7662 12.6667H2.25L9.2025 17.8117L6.55875 26.6667L13.5 21.195L20.4525 26.6667L17.8088 17.8117L24.75 12.6667H16.2338Z"
            fill="#FFDE00"
          />
        </g>
        <defs>
          <clipPath id="clip0_26_167">
            <rect width="27" height="28" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };

  return (
    <div className="bg-white flex flex-col justify-between rounded-lg shadow-md px-10 pt-12 pb-6 w-full lg:w-2/5">
      <div>
        <h3 className="text-quinary  text-3xl font-bold overflow-hidden line-clamp-2 pb-4">{pool.label}</h3>

        <div className="flex text-xl justify-between pb-4">
          <div className="flex">
            {starSvg()}
            {starSvg()}
            {starSvg()}
            {starSvg()}
            {starSvg()}
          </div>
          <p className="font-rubik text-2xl">{pool.price} €</p>
        </div>
        <p className="text-xl lowercase">{pool.brand}</p>
      </div>
      <div>
        <p className="text-primary pt-10">{`Il ne reste plus que ${pool.nbStock} examplaire(s) en stock.`}</p>
        <div className="grid gap-8 grid-cols-2 text-white pt-5">
          <div className="button">Acheter</div>
          <div className="button">Comparer</div>
        </div>
      </div>
    </div>
  );
};

export default PoolDetailsCard;
