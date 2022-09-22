import React from 'react';
import { PoolhubLogo } from 'app/helpers/icons/logo';
import { ConfirmPurchaseSvg } from 'app/containers/ConfirmPurchaseContainer/confirmPurchaseSvg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetOrder } from 'app/redux/slices/orderSlice';

const ConfirmPurchaseContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tailwindClassesButton =
    'py-4 px-8 mt-4 flex select-none justify-center items-center text-white font-bold hover:scale-105 active:opacity-75 bg-primary rounded-xl cursor-pointer';
  const handleClick = () => {
    //@ts-ignore
    dispatch(resetOrder());
    navigate('/');
  };
  return (
    <div className="px-20 py-10 relative h-screen relative bg-septenary">
      <PoolhubLogo tailwClasses="scale-150 ml-10" />
      <div className="flex pt-8 flex-col gap-y-2 justify-center items-center">
        {ConfirmPurchaseSvg}
        <h1 className="text-2xl font-bold">Nous vous avons envoyé un mail</h1>
        <p className="text-lg">Vous avez reçu un mail avec les détails de la commande.</p>
        <div className="flex gap-x-8">
          <button onClick={() => handleClick()} className={tailwindClassesButton}>
            Retour à la page d'accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseContainer;
