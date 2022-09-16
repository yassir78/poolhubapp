import React, { useState } from 'react';
import { PoolhubLogo } from 'app/helpers/icons/logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LoginSvg } from 'app/containers/LoginContainer/loginSvg';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { login, selectLoading, selectLoginError } from 'app/redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'app/components/Spinner';

const schema = yup
  .object({
    username: yup.string().required().min(4),
    password: yup.string().required().min(4),
  })
  .required();
const LoginContainer = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const loginError = useSelector(selectLoginError);
  const loading = useSelector(selectLoading);
  const username = watch('username');
  const password = watch('password');
  const onSubmit = data => {
    console.log('data', data);
    console.log('onSubmit');
    // TODO: dispatch action to login
    // @ts-ignore
    dispatch(login(username, password, false));
    reset();
    // TODO : redirect to next page if user credentials are valid
    // TODO : show error message if user credentials are invalids
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen flex relative">
      <div className="w-7/12 px-20 py-10 relative h-full bg-septenary">
        <PoolhubLogo tailwClasses="scale-150 ml-10" />
        <div className="flex justify-center mt-10">{LoginSvg}</div>
      </div>
      <div className="w-5/12 h-full py-20 px-20 bg-white">
        <div className="flex">
          <h1 className="text-xl mr-10 font-bold pb-10 leading-tight tracking-tight text-tertiary md:text-2xl">Se connecter</h1>
          {loading && <Spinner />}
        </div>

        <form className="space-y-14 md:space-y-6 text-lg" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label htmlFor="text" className="block mb-4 text-lg font-medium text-tertiary">
              Username
            </label>
            <input
              {...register('username')}
              type="text"
              name="username"
              id="username"
              className={`border border-gray-border focus:outline-none focus:ring-0  placeholder-textGray text-tertiary rounded-lg block w-full p-3.5 ${
                errors.username ? 'border-red-500 focus:ring-red-500' : 'focus:border-primary'
              }`}
              placeholder="Votre pseudo"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-2">
                {errors.username.message === 'username is a required field' ? 'Pseudo requis' : ''}
                {errors.username.message === 'username must be at least 4 characters'
                  ? 'Le Pseudo doit contenir au moins 4 caractères'
                  : ''}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-4 text-lg font-medium text-tertiary">
              Mot de passe
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Votre mot de passe"
                className={`border border-gray-border focus:outline-none focus:ring-0  placeholder-textGray text-tertiary rounded-lg block w-full p-3.5 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'focus:border-primary'
                } p-3.5`}
              />
              <div
                className="absolute text-textGray select-none w-8 inset-y-0 right-0 pr-3 flex items-center leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-2 ">
                {errors.password.message === 'password is a required field' ? 'Mot de passe requis' : ''}
                {errors.password.message === 'password must be at least 4 characters'
                  ? 'Mot de passe doit contenir au moins 4 caractères'
                  : ''}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <a className="text-sm pb-4 font-medium text-textGray select-none cursor-pointer hover:underline">Mot de pass oublié</a>
          </div>
          {loginError && (
            <div className="text-left mb-5">
              <span className="text-xl text-red-500 ">Pseudo ou mot de passe sont incorrectes</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full   text-base font-bold focus:outline-none font-medium rounded-lg text-sm px-5 py-3 ${
              loading ? 'bg-septenary cursor-not-allowed text-black' : 'bg-primary text-white'
            } focus:opacity-75 text-center hover:scale-105 transition-all ease-in `}
          >
            Se connecter
          </button>
          <p className="pt-2 text-base font-light text-textGray flex justify-center">
            Pas encore inscrit(e) ?{' '}
            <Link to={'/signup'} className="font-medium pl-2 text-primary hover:underline font-bold">
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginContainer;
