import React, { useEffect, useRef, useState } from 'react';

const MultiRangeSlider = ({ initialMin, initialMax, min, max, step, priceCap }) => {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = e => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = e => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + '%';
    progressRef.current.style.right = step - (maxValue / max) * step + '%';
  }, [minValue, maxValue, max, step]);

  return (
    <div className="mb-4">
      <div className="slider relative h-1 rounded-md bg-gray-300">
        <div className="progress absolute h-1 bg-green-300 rounded " ref={progressRef} />
      </div>

      <div className="range-input relative  ">
        <input
          onChange={handleMin}
          type="range"
          min={min}
          step={step}
          max={max}
          value={minValue}
          className="range-min absolute w-full  -top-1  h-1   bg-gray-100  appearance-none pointer-events-none"
        />

        <input
          onChange={handleMax}
          type="range"
          min={min}
          step={step}
          max={max}
          value={maxValue}
          className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
        />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
