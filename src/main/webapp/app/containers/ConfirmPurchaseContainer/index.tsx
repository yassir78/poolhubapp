import React from 'react';
import {PoolhubLogo} from "app/helpers/icons/logo";
import {ConfirmPurchaseSvg} from "app/containers/ConfirmPurchaseContainer/confirmPurchaseSvg";
import {Link} from "react-router-dom";

const ConfirmPurchaseContainer = () => {

  const tailwindClassesButton = "py-4 px-8 mt-4 flex select-none justify-center items-center text-white font-bold hover:scale-105 active:opacity-75 bg-primary rounded-xl cursor-pointer";

  return (
    <div className="px-20 py-10 relative h-screen relative bg-septenary">
      <PoolhubLogo tailwClasses="scale-150 ml-10"/>
      <div className="flex pt-8 flex-col gap-y-2 justify-center items-center">

        {ConfirmPurchaseSvg}
        <h1 className="text-2xl font-bold">Nous vous avons envoyé un mail</h1>
        <p className="text-lg">Vous avez reçu un mail avec les détails de la commande.</p>
        <div className="flex gap-x-8">
          <div className={tailwindClassesButton}>Imprimer votre facture</div>
          <Link to={"/"} className={tailwindClassesButton}>Retour à la page d'accueil</Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPurchaseContainer;
