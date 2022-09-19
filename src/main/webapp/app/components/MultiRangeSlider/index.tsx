import React, { useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useSelector } from 'react-redux';
import { selectPoolsSearchOptions } from 'app/redux/slices/poolSlice';

const MultiRangeSlider = ({ maxValue, minValue, setMaxValue, setMinValue, min, max, step, priceCap, handleFilters, field }) => {
  const progressRef = useRef(null);
  const poolOptions = useSelector(selectPoolsSearchOptions);

  const handleMin = e => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        field == 'price' ? handleFilters(parseInt(e.target.value), 'priceMin') : handleFilters(parseInt(e.target.value), 'volumeMin');
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        field == 'price' ? handleFilters(parseInt(e.target.value), 'priceMin') : handleFilters(parseInt(e.target.value), 'volumeMin');
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = e => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        field == 'price' ? handleFilters(parseInt(e.target.value), 'priceMax') : handleFilters(parseInt(e.target.value), 'volumeMax');
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        field == 'price' ? handleFilters(parseInt(e.target.value), 'priceMax') : handleFilters(parseInt(e.target.value), 'volumeMax');
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    if (field == 'price') {
      if (poolOptions.priceMin != null) setMinValue(poolOptions.priceMin);
      if (poolOptions.priceMax != null) setMaxValue(poolOptions.priceMax);
    } else if (field == 'volume') {
      if (poolOptions.volumeMin != null) setMinValue(poolOptions.volumeMin);
      if (poolOptions.volumeMax != null) setMaxValue(poolOptions.volumeMax);
    }
    progressRef.current.style.left = (minValue / max) * step + '%';
    progressRef.current.style.right = step - (maxValue / max) * step + '%';
  }, [minValue, maxValue, max, step]);

  return (
    <div className="flex items-center justify-between ">
      <span className="mr-3 text-sm font-rubik">{minValue}</span>
      <div className="my-4 w-3/4">
        <div className="slider relative h-1 rounded-md bg-gray-300">
          <div className="progress absolute h-1 bg-green-300 rounded " ref={progressRef} />
        </div>
        <div className="range-input relative  ">
          <DebounceInput
            onChange={handleMin}
            type="range"
            min={min}
            debounceTimeout={300}
            step={step}
            max={max}
            value={minValue}
            className="range-min absolute w-full  -top-1  h-1   bg-gray-100  appearance-none pointer-events-none"
          />

          <DebounceInput
            onChange={handleMax}
            type="range"
            min={min}
            debounceTimeout={300}
            step={step}
            max={max}
            value={maxValue}
            className="range-max absolute w-full  -top-1 h-1  bg-transparent appearance-none  pointer-events-none"
          />
        </div>
      </div>
      <span className="ml-2 text-sm font-rubik">{maxValue}</span>
    </div>
  );
};

export default MultiRangeSlider;
