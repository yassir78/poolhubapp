import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScaleBalanced} from '@fortawesome/free-solid-svg-icons';
import {PoolhubLogo} from "app/helpers/icons/logo";

const Navbar = () => {

  const NB_NOTIFS: number = 3;
  const IS_CONNECTED: boolean = false;
  const PROFILE_IMAGE: string = "https://www.w3schools.com/howto/img_avatar.png";
  const SIZE_ICONS: number = 14;

  return (
    <nav className="relative flex justify-between pl-5 pr-12 pt-1 pb-2 top-0 left-0 right-0 z-[100] bg-white shadow-md w-full">
      <div className="cursor-pointer">
        <PoolhubLogo/>
      </div>
      <div className="flex gap-6 content-center items-center">
        {
          IS_CONNECTED ? (
            <img className="rounded-full w-10 h-10 cursor-pointer" src={PROFILE_IMAGE} alt="User Avatar"/>
          ) : (
            <div className="px-3 py-1 bg-primary rounded text-octonary cursor-pointer select-none hover:scale-105 transition-all ease-in active:opacity-75">Se connecter</div>
          )
        }
        <div className="relative w-10 h-10">
          {NB_NOTIFS > 0 &&
            <div
              className="inline-flex absolute -top-3 -right-3 select-none justify-center items-center w-5 h-5 text-xs bg-secondary rounded-full">{NB_NOTIFS}</div>
          }
          <FontAwesomeIcon
            className="text-primary w-full h-full cursor-pointer transition-all hover:scale-105 ease-in active:-translate-y-1"
            icon={faScaleBalanced}/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
