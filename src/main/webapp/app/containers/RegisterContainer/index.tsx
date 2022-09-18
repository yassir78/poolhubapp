import React, { useRef, useState } from 'react';
import { PoolhubLogo } from 'app/helpers/icons/logo';
import { RegisterSvg } from 'app/containers/RegisterContainer/registerSvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Spinner from 'app/components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  getIsRegisterFailure,
  getProfileImage,
  getRegisterErrorMessage,
  handleRegister,
  handleUploadProfileImage,
  isProfileImageFailure,
  isProfileImageLoading,
  isProfileImageSuccess,
  isRegisterLoading,
  reset,
} from 'app/redux/slices/registerSlice';
import Modal from 'app/components/Modal';

const schema = yup
  .object({
    firstName: yup.string().required('Prénom requis').min(4, 'Le prénom doit être composé de 4 caractères minimum'),
    lastName: yup.string().required('Nom requis').min(4, 'Le nom doit être composé de 4 caractères minimum'),
    email: yup.string().email("L'email n'est pas valid").required("L'email est requise"),
    password: yup.string().required('Mot de passe requis').min(4, 'Le mot de passe doit être composé de 4 caractères minimum'),
    address: yup.string().required("L'adresse est requise").min(4, "L'adresse doit être composé de 4 caractères minimum"),
    username: yup.string().required("Nom d'utilisateur requis").min(4, "Le nom d'utilisateur doit être composé de 4 caractères minimum"),
    confirmPassword: yup
      .string()
      .required('Confirmation du mot de passe requise')
      .min(4, 'La confirmation du mot de passe doit être composé de 4 caractères minimum')
      .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
  })
  .required();
const RegisterContainer = () => {
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const avatarInputRef = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector(isRegisterLoading);
  const isImageLoading = useSelector(isProfileImageLoading);
  const isImageLoadingSuccess = useSelector(isProfileImageSuccess);
  const isImageLoadingFailure = useSelector(isProfileImageFailure);
  const profileImage = useSelector(getProfileImage);
  const registerErrorMessage = useSelector(getRegisterErrorMessage);
  const isRegisterFailure = useSelector(getIsRegisterFailure);

  const onSubmit = data => {
    const firstName = watch('firstName');
    const lastName = watch('lastName');
    const email = watch('email');
    const password = watch('password');
    const address = watch('address');
    const username = watch('username');
    console.log({ firstName, lastName, email, password, address, username });
    // @ts-ignore
    dispatch(
      handleRegister({
        login: username,
        firstName,
        lastName,
        email,
        password,
        address,
        imageUrl: profileImage,
      })
    );
    reset();
    handleAvatarDelete(new Event('click'));
  };
  const handleAvatarClick = e => {
    e.preventDefault();
    // 👇️ open file input box on click of other element
    if (!avatarInputRef) return;
    avatarInputRef.current.click();
  };

  const changeAvatarHandler = event => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log('file', file);
    setSelectedFile(file);
    // @ts-ignore
    dispatch(handleUploadProfileImage(file));
  };

  const handleClose = () => {
    // @ts-ignore
    dispatch(reset());
  };

  const handleAvatarDelete = e => {
    e.preventDefault();
    setSelectedFile(null);
    // @ts-ignore
    dispatch(resetImage());
  };

  const templateAvatarSvg = () => {
    return (
      <svg
        className="fill-secondary text-secondary"
        width="41"
        height="45"
        viewBox="0 0 41 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.1426 23.3674C26.5712 23.3674 31.8263 18.1123 31.8263 11.6837C31.8263 5.25508 26.5712 0 20.1426 0C13.714 0 8.45898 5.25508 8.45898 11.6837C8.45898 18.1123 13.7141 23.3674 20.1426 23.3674Z"
          fill="currentColor"
        />
        <path
          d="M40.1944 32.7042C39.8882 31.9388 39.4801 31.2246 39.0209 30.5613C36.674 27.0919 33.0516 24.796 28.9699 24.2347C28.4598 24.1838 27.8986 24.2857 27.4904 24.5919C25.3475 26.1735 22.7965 26.9898 20.1434 26.9898C17.4903 26.9898 14.9393 26.1735 12.7964 24.5919C12.3882 24.2857 11.827 24.1327 11.3168 24.2347C7.23518 24.796 3.56175 27.0919 1.26585 30.5613C0.806667 31.2246 0.398464 31.9899 0.0924097 32.7042C-0.0606177 33.0103 -0.00964116 33.3674 0.143386 33.6736C0.551589 34.3879 1.06175 35.1022 1.52093 35.7144C2.23518 36.6838 3.00051 37.5511 3.8679 38.3674C4.58216 39.0817 5.39846 39.745 6.21487 40.4083C10.2454 43.4185 15.0924 45.0001 20.0924 45.0001C25.0924 45.0001 29.9394 43.4184 33.9699 40.4083C34.7863 39.7961 35.6026 39.0817 36.3169 38.3674C37.1332 37.5511 37.9495 36.6838 38.6639 35.7144C39.174 35.0511 39.6333 34.3879 40.0414 33.6736C40.2964 33.3674 40.3474 33.0102 40.1944 32.7042Z"
          fill="currentColor"
        />
      </svg>
    );
  };

  return (
    <div className="h-full w-full flex relative ">
      <div className="w-5/12 px-20 py-10 relative h-full bg-septenary">
        <PoolhubLogo tailwClasses="scale-150 ml-10" />
        <div className="flex justify-center mt-20 mb-28">{RegisterSvg}</div>
      </div>
      <div className="w-7/12 h-full pb-20 pt-14 px-20 bg-white">
        <div className="flex justify-end pb-4">
          <Link to={'/login'} className="w-fit cursor-pointer hover:underline text-primary  font-bold text-sm uppercase small-caps">
            Se connecter
          </Link>
        </div>

        <div className="flex">
          <h1 className="text-xl mr-10 font-bold pb-10 leading-tight tracking-tight text-tertiary md:text-2xl">
            A propos de vous <Modal isError={isRegisterFailure} messageKey={registerErrorMessage} handleClose={handleClose} />
          </h1>
          {loading && <Spinner />}
        </div>
        <form className="grid grid-cols-2 gap-x-4 gap-y-6 grid-flow-row">
          <div>
            <label htmlFor="firstName" className="block mb-4 text-lg font-medium text-tertiary">
              Nom
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              {...register('firstName')}
              className={`border border-gray-border
                   focus:outline-none
                   placeholder-textGray text-tertiary rounded-lg
                    ${errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                   block w-full p-3.5`}
              placeholder="Votre nom"
              required={true}
            />
            {errors.firstName && <p className="text-red-500 text-xs mt-2 ">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-4 text-lg font-medium text-tertiary">
              Prénom
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              {...register('lastName')}
              className={`border border-gray-border
                   focus:outline-none
                   placeholder-textGray text-tertiary rounded-lg
                    ${errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                   block w-full p-3.5`}
              placeholder="Votre prénom"
            />
            {errors.lastName && <p className="text-red-500 text-xs mt-2 ">{errors.lastName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-4 text-lg font-medium text-tertiary">
              Pseudo
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              {...register('username')}
              className={`border border-gray-border
                   focus:outline-none
                   placeholder-textGray text-tertiary rounded-lg
                    ${errors.username ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                   block w-full p-3.5`}
              placeholder="Votre nom d'utilisateur"
            />
            {errors.username && <p className="text-red-500 text-xs mt-2 ">{errors.username.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block mb-4 text-lg font-medium text-tertiary">
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
            <label htmlFor="address" className="block mb-4 text-lg font-medium text-tertiary">
              Adresse actuelle
            </label>
            <input
              type="text"
              name="address"
              id="address"
              {...register('address')}
              className={`border border-gray-border
                   focus:outline-none
                   placeholder-textGray text-tertiary rounded-lg
                    ${errors.address ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                   block w-full p-3.5`}
              placeholder="Votre adresse actuelle"
              required={true}
            />
            {errors.address && <p className="text-red-500 text-xs mt-2 ">{errors.address.message}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block mb-4 text-lg font-medium text-tertiary">
              Mot de passe
            </label>
            <div className="relative z-0	">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                {...register('password')}
                placeholder="Votre mot de passe"
                className={`border border-gray-border
                   focus:outline-none
                   placeholder-textGray text-tertiary rounded-lg
                    ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                   block w-full p-3.5`}
                required={true}
              />

              <div
                className="absolute text-textGray select-none w-8 inset-y-0 right-0 pr-3 flex items-center leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </div>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-2 ">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-4 text-lg font-medium text-tertiary">
              Confirmer mot de passe
            </label>
            <div className="relative z-0">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                {...register('confirmPassword')}
                id="confirmPassword"
                placeholder="Confirmer votre mot de passe"
                className={`border border-gray-border
                     focus:outline-none
                     placeholder-textGray text-tertiary rounded-lg
                     ${errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-transparent' : 'focus:border-primary'}
                     block w-full p-3.5`}
              />

              <div
                className="absolute text-textGray select-none w-8 inset-y-0 right-0 pr-3 flex items-center leading-5 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </div>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-2 ">{errors.confirmPassword.message}</p>}
          </div>
          <div className="pb-6 col-span-2">
            <label htmlFor="avatar" className="block mb-4 text-lg font-medium text-tertiary">
              Photo de profil
            </label>
            <div className="flex items-center gap-6">
              <div
                className={`bg-septenary flex justify-center overflow-hidden ${isImageLoading && 'border-pulsate border-4'} ${
                  isImageLoadingSuccess && 'circle-success border-4'
                } ${isImageLoadingFailure && 'circle-failure border-4'}  items-center rounded-full w-24 h-24 `}
              >
                {selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Avatar preview" /> : templateAvatarSvg()}
              </div>
              <p onClick={e => handleAvatarClick(e)} className="text-base text-primary hover:underline cursor-pointer">
                Choisir
              </p>
              <div
                className={'text-base ' + (selectedFile ? ' hover:underline cursor-pointer text-primary' : ' text-textGray')}
                onClick={e => handleAvatarDelete(e)}
              >
                Supprimer
              </div>
              {selectedFile && <span className="text-sm text-tertiary">{selectedFile.name}</span>}
              <input
                className="hidden pointer-events-none select-none"
                ref={avatarInputRef}
                onChange={e => changeAvatarHandler(e)}
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg"
              />
            </div>
          </div>
        </form>
        <div className="text-right">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isValid || isImageLoading}
            className={` mr-0  w-1/3 text-white
            ${isValid || isImageLoading ? 'bg-gray-border' : 'bg-primary'}
           text-lg font-bold focus:outline-none font-medium rounded-lg
           bg-primary
           text-sm px-5 py-3 active:opacity-75 text-center hover:scale-105 transition-all ease-in `}
          >
            S'inscrire {isValid}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterContainer;
