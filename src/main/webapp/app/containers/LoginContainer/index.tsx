import React, {useState} from 'react';
import {PoolhubLogo} from "app/helpers/icons/logo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {LoginSvg} from "app/containers/LoginContainer/loginSvg";
import {Link} from "react-router-dom";

const LoginContainer = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("email", email)
    console.log("password", password)
  }

  return (
    <div className="h-screen w-screen flex relative">
      <div className="w-7/12 px-20 py-10 relative h-full bg-septenary">
        <PoolhubLogo tailwClasses="scale-150 ml-10"/>
        <div className="flex justify-center mt-10">
          {LoginSvg}
        </div>
      </div>
      <div className="w-5/12 h-full py-20 px-20 bg-white">
        <h1 className="text-xl font-bold pb-10 leading-tight tracking-tight text-tertiary md:text-2xl">
          Se connecter
        </h1>
        <form className="space-y-14 md:space-y-6 text-lg" onSubmit={handleSubmit}>
          <div className="pb-4">
            <label htmlFor="email" className="block mb-4 text-lg font-medium text-tertiary">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   className="border border-gray-border focus:outline-none focus:border-primary placeholder-textGray text-tertiary rounded-lg block w-full p-3.5"
                   placeholder="Votre email" required={true}/>
          </div>
          <div>
            <label htmlFor="password"
                   className="block mb-4 text-lg font-medium text-tertiary dark:text-white"
            >Mot de passe</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" id="password"
                     placeholder="Votre mot de passe"
                     className="border border-gray-border placeholder-textGray text-tertiary focus:outline-none focus:border-primary rounded-lg block w-full p-3.5"
                     required={true}
                     value={password} onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute text-textGray select-none w-8 inset-y-0 right-0 pr-3 flex items-center leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? (
                    <FontAwesomeIcon icon={faEye}/>
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash}/>
                  )
                }
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">

            <a className="text-sm pb-4 font-medium text-textGray select-none cursor-pointer hover:underline">Mot de pass oublié</a>
          </div>
          <button type="submit"
                  className="w-full text-white bg-primary text-lg font-bold focus:outline-none font-medium rounded-lg text-sm px-5 py-3 focus:opacity-75 text-center hover:scale-105 transition-all ease-in ">Se
            connecter
          </button>
          <p className="pt-2 text-base font-light text-textGray flex justify-center">
            Pas encore inscrit(e) ? <Link to={"/signup"}
                                       className="font-medium pl-2 text-primary hover:underline font-bold">S'inscrire</Link>
          </p>
        </form>

      </div>
    </div>
  );
};

export default LoginContainer;
