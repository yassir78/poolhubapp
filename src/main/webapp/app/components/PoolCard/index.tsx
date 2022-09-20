import React, {FC} from 'react';
import {Pool} from 'app/models/pool.model';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faCube,
  faLayerGroup,
  faMagnifyingGlass, faMagnifyingGlassPlus,
  faPalette,
  faRecycle,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setPool} from 'app/redux/slices/poolSlice';
import {categoriesNamingEnToFr, colorsNamingEnToFr, materialNamingEnToFr} from "app/helpers/constants/forms";

export interface PoolCardProps {
  pool: Pool;
}

const PoolCard: FC<PoolCardProps> = ({pool}) => {
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
          <FontAwesomeIcon className="fill-tertiary text-gray-400" icon={icon}/>
        </div>
        <span className="text-tertiary font-thin text-sm truncate text-blue-600">{detail}</span>
      </div>
    );
  };

  return (
    <div className={"bg-white rounded-lg shadow-md pb-6 relative overflow-hidden hover:cursor-pointer group " + (pool.stock > 0 ? "" : " opacity-80")} onClick={handleClick}>
      { pool.stock <= 0 &&
        <div className="text-2xl flex justify-center font-bold absolute -left-1/4 top-1/3 z-50 pl-10 w-[140%] py-4 bg-opacity-80 bg-textGray -rotate-[30deg] text-white">Rupture de stock</div>
      }
      <div className="space-y-3">
           <div className="aspect-w-4 aspect-h-2 relative z-20">
            <img className="object-cover rounded-t-lg w-full" src={pool.image}/>
          </div>
        <div className="px-6">
          <div className="leading-6 popping space-y-2">
            <h3 className="text-xl font-bold truncate text-quinary capitalize group-hover:underline">{pool.label}</h3>
            <div className="text-sm flex justify-between">
              <p className="font-thin popping text-tertiary ">{pool.price} € </p>
              <p className="font-thin text-tertiary ">{pool.brand}</p>
            </div>
            <div className="flex flex-row items-center">
              <span className="text-textGray font-thin text-sm text-justify line-clamp-2">{pool.description}</span>
            </div>

            <div className="grid grid-cols-2 gap-1 pt-4 border-t-2 border-gray-border">
              {poolDetail(pool.volume + ' m3', faCube)}
              {poolDetail(categoriesNamingEnToFr[pool.category], faLayerGroup)}
              {poolDetail(materialNamingEnToFr[pool.material], faRecycle)}
              {poolDetail(colorsNamingEnToFr[pool.color], faPalette)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolCard;
