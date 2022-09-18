import React, {FC} from 'react';
import PropTypes from 'prop-types';
import {Pool} from "app/models/pool.model";

export interface PropsPoolDetailsCard {
  pool: Pool
}

const PoolPurchaseCard: FC<PropsPoolDetailsCard> = ({pool}) => {
  
  return (
    <div className="w-3/12 px-4 pt-4 pb-6 rounded-lg h-fit bg-white shadow-md text-tertiary">
      <div className="mb-4 aspect-w-4 aspect-h-2 relative">
        <img className="object-cover rounded-lg w-full" src={pool.image}/>
      </div>
      <p className="text-xs text-justify mt-4 mb-4 pb-2 text-textGray border-b border-textGray">En passant votre commande, vous acceptez les Conditions générales de vente de PoolHub.</p>
      <div className="text-xl flex justify-between">
        <span>Montant total:</span>
        <div>{pool.price} €</div>
      </div>
    </div>
  );
};

export default PoolPurchaseCard;
