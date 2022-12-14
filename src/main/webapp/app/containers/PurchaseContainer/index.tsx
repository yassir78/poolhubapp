import React from 'react';
import PoolPurchaseCard from 'app/components/PoolPurchaseCard';
import { Pool } from 'app/models/pool.model';
import { Shape } from 'app/models/enumerations/shape.model';
import { Color } from 'app/models/enumerations/color.model';
import { Material } from 'app/models/enumerations/material.model';
import { Category } from 'app/models/enumerations/category.model';
import BackButton from 'app/components/BackButton';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
  .object({
    firstname: yup.string().required('Nom requis').min(4, 'Le nom doit être composé de 4 caractères minimum'),
    lastname: yup.string().required('Prénom requis').min(4, 'Le prénom doit être composé de 4 caractères minimum'),
    email: yup.string().email("L'email n'est pas valid").required("L'email est requis"),
    phone: yup.string().required('Numéro de téléphone requis'),
    shippingAddress: yup
      .string()
      .required("L'adresse de livraison est requise")
      .min(4, "L'adresse doit être composé de 4 caractères minimum"),
    zipCode: yup.string().required("Nom d'utilisateur requis").min(4, "Le nom d'utilisateur doit être composé de 4 caractères minimum"),
    city: yup.string().required('La ville est requise'),
  })
  .required();
const PurchaseContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log('submit method ');
    window.scroll(0, 0);
  };

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
        <BackButton routeTo={'/'} />
        <form className="grid grid-cols-2 gap-x-4 gap-y-6 grid-flow-row">
          <h1 className="text-xl col-span-2 font-bold leading-tight tracking-tight text-tertiary md:text-2xl">Détails</h1>
          <div>
            <label htmlFor="lastname" className="block mb-3 text-lg font-medium text-tertiary">
              Nom
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              {...register('firstname')}
              className={`border border-gray-border
                        focus:outline-none
                        placeholder-textGray text-tertiary rounded-lg
                        ${errors.firstname ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                         block w-full p-3.5`}
              placeholder="Votre nom"
            />
            {errors.firstname && <p className="text-red-500 text-xs mt-2 ">{errors.firstname.message}</p>}
          </div>
          <div>
            <label htmlFor="firstname" className="block mb-3 text-lg font-medium text-tertiary">
              Prénom
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              {...register('lastname')}
              className={`border border-gray-border
                        focus:outline-none
                        placeholder-textGray text-tertiary rounded-lg
                        ${errors.lastname ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                         block w-full p-3.5`}
              placeholder="Votre prénom"
              required={true}
            />
            {errors.lastname && <p className="text-red-500 text-xs mt-2 ">{errors.lastname.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-3 text-lg font-medium text-tertiary">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              {...register('email')}
              className={`border border-gray-border
                        focus:outline-none
                        placeholder-textGray text-tertiary rounded-lg
                        ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                         block w-full p-3.5`}
              placeholder="Votre email"
              required={true}
            />
            {errors.email && <p className="text-red-500 text-xs mt-2 ">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block mb-3 text-lg font-medium text-tertiary">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              {...register('phone')}
              className={`border border-gray-border
                        focus:outline-none
                        placeholder-textGray text-tertiary rounded-lg
                        ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                         block w-full p-3.5`}
              placeholder="Votre numéro de téléphone"
              required={true}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-2 ">{errors.phone.message}</p>}
          </div>
          <div>
            <label htmlFor="address" className="block mb-3 text-lg font-medium text-tertiary">
              Adresse de la livraison
            </label>
            <input
              type="text"
              name="address"
              id="address"
              {...register('shippingAddress')}
              className={`border border-gray-border
                        focus:outline-none
                        placeholder-textGray text-tertiary rounded-lg
                        ${errors.shippingAddress ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                         block w-full p-3.5`}
              placeholder="Votre adresse"
              required={true}
            />
            {errors.shippingAddress && <p className="text-red-500 text-xs mt-2 ">{errors.shippingAddress.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-x-4 grid-flow-row">
            <div>
              <label htmlFor="zipcode" className="block mb-3 text-lg font-medium text-tertiary">
                Code postal
              </label>
              <input
                type="text"
                name="zipcode"
                id="zipcode"
                {...register('zipCode')}
                className={`border border-gray-border
                        focus:outline-none
                        placeholder-textGray text-tertiary rounded-lg
                        ${errors.zipCode ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                         block w-full p-3.5`}
                placeholder="Votre code postal"
                required={true}
              />
              {errors.zipCode && <p className="text-red-500 text-xs mt-2 ">{errors.zipCode.message}</p>}
            </div>
            <div>
              <label htmlFor="city" className="block mb-3 text-lg font-medium text-tertiary">
                Ville
              </label>
              <input
                type="text"
                name="city"
                id="city"
                {...register('city')}
                className={`border border-gray-border
                        focus:outline-none
                        placeholder-textGray text-tertiary rounded-lg
                        ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                         block w-full p-3.5`}
                placeholder="Votre ville"
                required={true}
              />
              {errors.city && <p className="text-red-500 text-xs mt-2 ">{errors.city.message}</p>}
            </div>
          </div>
          <h1 className="text-xl col-span-2 font-bold leading-tight tracking-tight text-tertiary md:text-2xl">Paiement</h1>
          <div className="col-span-2">
            <label htmlFor="cardnumber" className="block mb-3  text-lg font-medium text-tertiary">
              Numéro de carte
            </label>
            <div className="relative">
              <input
                type="number"
                name="cardnumber"
                id="cardnumber"
                disabled={true}
                className="border peer cursor-not-allowed	 border-gray-border focus:outline-none focus:border-primary bg-gray-200   placeholder-textGray text-tertiary rounded-lg block w-full pl-12 pr-3.5 py-3.5"
                placeholder="0000 0000 0000 0000"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-0 mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-textGray h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="expiredate" className="block mb-3  text-lg font-medium text-tertiary">
              Date d'expiration
            </label>
            <div className="relative">
              <input
                type="text"
                name="expiredate"
                id="expiredate"
                disabled={true}
                className="border cursor-not-allowed	 peer bg-gray-200 border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full pl-12 pr-3.5 py-3.5"
                placeholder="MM/YY"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-0 mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-textGray h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="card_cvc" className="block mb-3  text-lg font-medium text-tertiary">
              CVC/CVV
            </label>
            <div className="relative">
              <input
                type="number"
                name="card_cvc"
                id="card_cvc"
                min={0}
                max={999}
                minLength={3}
                maxLength={3}
                disabled={true}
                className="border cursor-not-allowed	 peer bg-gray-200 border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full pl-12 pr-3.5 py-3.5"
                placeholder="&bull;&bull;&bull;"
                required={true}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-0 left-0 mb-1 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-textGray h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <div className="col-span-2">
            <button
              onClick={handleSubmit(onSubmit)}
              className="inline-block float-right mt-8 mx-auto w-fit text-white bg-primary
           text-base font-normal  select-none focus:outline-none rounded-lg
           px-4 py-2 active:opacity-75 text-center hover:scale-105 transition-all ease-in cursor-pointer"
            >
              Valider votre commande
            </button>
          </div>
        </form>
      </div>
      <PoolPurchaseCard pool={pool} />
    </div>
  );
};

export default PurchaseContainer;
