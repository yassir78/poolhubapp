import React, {useEffect} from 'react';
import {getPools, selectPoolsList} from "app/redux/slices/poolSlice";
import {useSelector} from "react-redux";
import PoolPurchaseCard from "app/components/PoolPurchaseCard";
import {Pool} from "app/models/pool.model";
import {Shape} from "app/models/enumerations/shape.model";
import {Color} from "app/models/enumerations/color.model";
import {Material} from "app/models/enumerations/material.model";
import {Category} from "app/models/enumerations/category.model";
import BackButton from "app/components/BackButton";

const PurchaseContainer = () => {

  const handleValidateOrder = () => {

  }

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

  return (
    <div className="bg-octonary pb-12 px-20 flex gap-8 pt-8">

      <div className="px-12 py-6 relative rounded-lg bg-white text-tertiary h-fit w-9/12 shadow-md">
        <BackButton routeTo={"/"}/>
        <form className="grid grid-cols-2 gap-x-4 gap-y-6 grid-flow-row">
          <h1 className="text-xl col-span-2 font-bold leading-tight tracking-tight text-tertiary md:text-2xl">
            Détails
          </h1>
          <div>
            <label htmlFor="lastname" className="block mb-3 text-lg font-medium text-tertiary">Nom</label>
            <input type="text" name="lastname" id="lastname"
                   className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                   placeholder="Votre nom" required={true}/>
          </div>
          <div>
            <label htmlFor="firstname" className="block mb-3 text-lg font-medium text-tertiary">Prénom</label>
            <input type="text" name="firstname" id="firstname"
                   className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                   placeholder="Votre prénom" required={true}/>
          </div>
          <div>
            <label htmlFor="email" className="block mb-3 text-lg font-medium text-tertiary">Email</label>
            <input type="email" name="email" id="email"
                   className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                   placeholder="Votre email" required={true}/>
          </div>
          <div>
            <label htmlFor="phone" className="block mb-3 text-lg font-medium text-tertiary">Téléphone</label>
            <input type="tel" name="phone" id="phone"
                   className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                   placeholder="Votre numéro de téléphone" required={true}/>
          </div>
          <div>
            <label htmlFor="adress" className="block mb-3 text-lg font-medium text-tertiary">Adresse</label>
            <input type="text" name="adress" id="adress"
                   className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                   placeholder="Votre adresse" required={true}/>
          </div>
          <div className="grid grid-cols-2 gap-x-4 grid-flow-row">
            <div>
              <label htmlFor="zipcode" className="block mb-3 text-lg font-medium text-tertiary">Code postal</label>
              <input type="text" name="zipcode" id="zipcode"
                     className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                     placeholder="Votre code postal" required={true}/>
            </div>
            <div>
              <label htmlFor="city" className="block mb-3 text-lg font-medium text-tertiary">Ville</label>
              <input type="text" name="city" id="city"
                     className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                     placeholder="Votre ville" required={true}/>
            </div>
          </div>
          <h1 className="text-xl col-span-2 font-bold leading-tight tracking-tight text-tertiary md:text-2xl">
            Paiement
          </h1>
          <div className="col-span-2">
            <label htmlFor="cardnumber" className="block mb-3  text-lg font-medium text-tertiary">Numéro de
              carte</label>
            <div className="relative">
              <input type="number" name="cardnumber" id="cardnumber"
                     className="border peer border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full pl-12 pr-3.5 py-3.5"
                     placeholder="0000 0000 0000 0000" required={true}/>
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="absolute bottom-0 left-0 mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-textGray h-6 w-6"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="expiredate" className="block mb-3  text-lg font-medium text-tertiary">Date
              d'expiration</label>
            <div className="relative">
              <input type="text" name="expiredate" id="expiredate"
                     className="border peer border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full pl-12 pr-3.5 py-3.5"
                     placeholder="MM/YY" required={true}/>
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="absolute bottom-0 left-0 mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-textGray h-6 w-6"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="card_cvc" className="block mb-3  text-lg font-medium text-tertiary">CVC/CVV</label>
            <div className="relative">
              <input type="number" name="card_cvc" id="card_cvc" min={0} max={999} minLength={3} maxLength={3}
                     className="border peer border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full pl-12 pr-3.5 py-3.5"
                     placeholder="&bull;&bull;&bull;" required={true}/>
              <svg xmlns="http://www.w3.org/2000/svg"
                   className="absolute bottom-0 left-0 mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-textGray h-6 w-6"
                   fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
          </div>
        </form>
        <div onClick={(e) => handleValidateOrder()} className="inline-block float-right mt-8 mx-auto w-fit text-white bg-primary
           text-base font-bold select-none focus:outline-none rounded-lg
           px-4 py-2 active:opacity-75 text-center hover:scale-105 transition-all ease-in cursor-pointer">Valider votre
          commande
        </div>


      </div>
      <PoolPurchaseCard pool={pool}/>
    </div>
  );
};

export default PurchaseContainer;
