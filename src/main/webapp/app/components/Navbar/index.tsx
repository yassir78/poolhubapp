import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';
import { PoolhubLogo } from 'app/helpers/icons/logo';
import { useSelector } from 'react-redux';
import { selectAccount } from 'app/redux/slices/authSlice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const account = useSelector(selectAccount);
  const defaultImage = 'https://miro.medium.com/max/441/1*9EBHIOzhE1XfMYoKz1JcsQ.gif';

  return (
    <nav className="relative flex justify-between pl-5 pr-12 pt-1 pb-2 top-0 left-0 right-0 z-[100] bg-white shadow-md w-full">
      <div className="cursor-pointer">
        <PoolhubLogo />
      </div>
      <div className="flex gap-6 content-center items-center">
        {account && account.imageUrl ? (
          <LazyLoadImage src={account.imageUrl} className="rounded-full w-12 h-12 " alt="Image Alt" />
        ) : (
          <Link
            to={'/login'}
            className="px-3 py-1 bg-primary rounded text-octonary cursor-pointer select-none hover:scale-105 transition-all ease-in active:opacity-75"
          >
            Se connecter
          </Link>
        )}
        <Link to={"/comparator"} className="relative w-10 h-10">
          <div className="inline-flex absolute -top-3 -right-3 select-none justify-center items-center w-5 h-5 text-xs bg-secondary rounded-full">
            {0}
          </div>
          <FontAwesomeIcon
            className="text-primary w-full h-full cursor-pointer transition-all hover:scale-105 ease-in active:-translate-y-1"
            icon={faScaleBalanced}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
