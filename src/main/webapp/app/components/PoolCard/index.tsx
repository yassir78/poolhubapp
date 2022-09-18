import React, { FC } from 'react';
import { Pool } from 'app/models/pool.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCube, faLayerGroup, faPalette, faRecycle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPool } from 'app/redux/slices/poolSlice';

export interface PoolCardProps {
  pool: Pool;
}

const PoolCard: FC<PoolCardProps> = ({ pool }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = e => {
    e.preventDefault();
    navigate(`/pool/${pool.ref}`);
    dispatch(setPool(pool));
  };
  const poolDetail = (detail: string, icon: IconDefinition, title: string = '') => {
    return (
      <div className="flex flex-row items-center" title={title}>
        <div className="mx-2">
          <FontAwesomeIcon className="fill-tertiary text-gray-400" icon={icon} />
        </div>
        <span className="text-tertiary font-thin text-sm truncate text-blue-600 lowercase">{detail}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md pb-6 hover:cursor-pointer hover:opacity-50" onClick={handleClick}>
      <div className="space-y-3">
        <div className="aspect-w-4 aspect-h-2 relative">
          <img className="object-cover rounded-t-lg w-full" src={pool.image} />
        </div>

        <div className="px-6">
          <div className="leading-6 popping space-y-2">
            <h3 className="text-lg font-bold truncate text-quinary ">{pool.label}</h3>
            <div className="text-sm flex justify-between">
              <p className="font-thin popping text-tertiary ">{pool.price} € </p>
              <p className="font-thin text-tertiary ">{pool.brand}</p>
            </div>
            <div className="flex flex-row items-center">
              <span className="text-textGray font-thin text-sm text-justify line-clamp-2">{pool.description}</span>
            </div>

            <div className="grid grid-cols-2 gap-1 pt-4 border-t-2 border-gray-border">
              {poolDetail(pool.volume + ' m3', faCube)}
              {poolDetail(pool.category, faLayerGroup)}
              {poolDetail(pool.material, faRecycle)}
              {poolDetail(pool.color, faPalette)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
