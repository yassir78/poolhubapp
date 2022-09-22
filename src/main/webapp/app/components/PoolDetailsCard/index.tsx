import React, { FC, useEffect, useState } from 'react';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addPoolToComparator, selectComparatorPools } from 'app/redux/slices/poolSlice';
import { PoolType } from 'app/types/types';
import { useNavigate } from 'react-router-dom';

export interface PropsPoolDetailsCard {
  pool: PoolType;
}

const PoolDetailsCard: FC<PropsPoolDetailsCard> = ({ pool }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comparatorPools = useSelector(selectComparatorPools);
  const [isInComparator, setIsInComparator] = useState(false);

  useEffect(() => {
    setIsInComparator(comparatorPools.some(pl => pl.ref === pool.ref));
  }, [comparatorPools]);

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

  const handleAddToComparator = () => {
    if (isInComparator) return;
    dispatch(addPoolToComparator(pool));
    window.scroll(0, 0);
  };

  return (
    <div className="bg-white flex flex-col justify-between rounded-lg shadow-md px-10 pt-12 pb-6 w-full lg:w-2/5">
      <div>
        <h3 className="text-quinary  text-3xl font-bold overflow-hidden line-clamp-2 pb-4 capitalize">{pool.label}</h3>

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
        {pool.stock > 0 ? (
          <p className="text-primary pt-10">{`Il ne reste plus que ${pool.stock} examplaire(s) en stock.`}</p>
        ) : (
          <p className="text-red-500 pt-10">{`Rupture de stock.`}</p>
        )}
        <div className="grid gap-8 grid-cols-2 text-white pt-5">
          <div className={pool.stock > 0 ? 'button' : 'button-disabled'} onClick={() => navigate('/purchase')}>
            Acheter
          </div>
          <div
            onClick={() => handleAddToComparator()}
            className={isInComparator || comparatorPools.length === 3 ? 'button-disabled' : 'button'}
          >
            Comparer
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolDetailsCard;
