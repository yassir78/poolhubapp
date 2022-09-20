import React, {FC, useEffect, useRef, useState} from 'react';
import Zoom from 'react-img-zoom'

interface PropsModalImg {
  image: string,
  handleClose: () => void
}

const ModalImg: FC<PropsModalImg> = ({handleClose, image}) => {
  const [imageDimensions, setImageDimensions] = useState(null);
  const imageRef = useRef();

  useEffect(() => {
    if (!imageRef.current) return;
    setImageDimensions({width: imageRef.current['width'], height: imageRef.current['height']})
  }, [imageRef])

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto" onClick={handleClose}>
        <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
          <div className="transform overflow-hidden w-fit rounded-lg bg-white  text-left shadow-xl transition-all"
               onClick={(e) => e.stopPropagation()}>
            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6" onClick={handleClose}>
              <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                   className="hover:cursor-pointer active:-translate-y-1 transition-all ease-in"
                   xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px"
                   viewBox="0 0 121.31 122.876" enableBackground="new 0 0 121.31 122.876" xmlSpace="preserve">
                <g>
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"/>
                </g>
              </svg>
            </div>
            <div className="mt-2">
              <img ref={imageRef} className="hidden" src={image} id="monImage"/>
              {imageDimensions && <Zoom className="overflow-hidden"
                                        img={image}
                                        zoomScale={2}
                                        height={imageDimensions.height > 700 ? 700 : imageDimensions.height}
                                        width={imageDimensions.width > 1400 ? 1400 : imageDimensions.width}
                                        transitionTime={0.2}
              />}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImg;
