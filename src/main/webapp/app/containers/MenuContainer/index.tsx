import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, selectCount } from 'app/redux/slices/poolSlice';

const MenuContainer = () => {
  console.log('hello world');
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <>
      <div>dzadaz count value {count}</div>
    </>
  );
};

export default MenuContainer;
