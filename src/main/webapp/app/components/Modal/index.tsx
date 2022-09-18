import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from 'app/redux/slices/registerSlice';
import { messages } from 'app/helpers/constants/messages';
import { clearAuth } from 'app/redux/slices/authSlice';

const Modal = ({ isError, messageKey, handleClose }) => {
  const dispatch = useDispatch();
  const message = messages[messageKey];
  const resetError = () => {};

  return (
    <>
      {isError ? (
        <div className="relative z-50	" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 py-5 sm:p-6 sm:pb-5">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-16 sm:w-16">
                      <svg
                        className="h-10 w-10 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-xl font-medium leading-6 text-gray-900" id="modal-title">
                        Ouups...
                      </h3>
                      <div className="mt-2">
                        <p className="text-base text-gray-500">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => handleClose()}
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-400 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
