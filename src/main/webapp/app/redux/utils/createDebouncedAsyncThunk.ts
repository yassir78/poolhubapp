import { createAsyncThunk } from '@reduxjs/toolkit';

const createDebouncedAsyncThunk = (typePrefix, payloadCreator, wait, options) => {
  const { maxWait = 0, leading = false } = options ?? {};
  let timer = 0;
  let maxTimer = 0;
  let resolve;
  const invoke = () => {
    clearTimeout(maxTimer);
    maxTimer = 0;
    if (resolve) {
      resolve(true);
      resolve = undefined;
    }
  };
  const cancel = () => {
    if (resolve) {
      resolve(false);
      resolve = undefined;
    }
  };
  return createAsyncThunk(typePrefix, payloadCreator, {
    condition() {
      const immediate = leading && !timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        invoke();
        timer = 0;
      }, wait);
      if (immediate) return true;
      cancel();
      if (maxWait && !maxTimer) maxTimer = setTimeout(invoke, maxWait);
      return new Promise(res => {
        resolve = res;
      });
    },
  });
};

export default createDebouncedAsyncThunk;
