import React, {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";

export interface PropsBackButton {
  routeTo?: string
}

const BackButton: FC<PropsBackButton> = (props) => {

  const navigate = useNavigate();

  const backArrowSvg = () => {
    return <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_33_10)">
        <path
          d="M66.6667 40C66.6667 54.7 54.7 66.6667 40 66.6667C25.3 66.6667 13.3334 54.7 13.3334 40C13.3334 25.3 25.3 13.3333 40 13.3333C54.7 13.3333 66.6667 25.3 66.6667 40ZM73.3334 40C73.3334 21.6 58.4 6.66667 40 6.66667C21.6 6.66667 6.6667 21.6 6.6667 40C6.6667 58.4 21.6 73.3333 40 73.3333C58.4 73.3333 73.3334 58.4 73.3334 40ZM40 43.3333H53.3334V36.6667L40 36.6667V26.6667L26.6667 40L40 53.3333V43.3333Z"
          fill="#00ADB5"/>
      </g>
      <defs>
        <clipPath id="clip0_33_10">
          <rect width="80" height="80" fill="white" transform="translate(80) rotate(90)"/>
        </clipPath>
      </defs>
    </svg>
  }

  const buttonClasses = "absolute cursor-pointer hover:scale-110 transition-all ease-in active:opacity-50 -left-20 top-0 z-40";

  return (
    <>
      {
        props.routeTo ? (
          <Link to={props.routeTo}
                className={buttonClasses}>{backArrowSvg()}</Link>
        ) : (
          <div onClick={() => navigate(-1)}>{backArrowSvg()}</div>
        )
      }
    </>
  );
};

export default BackButton;
