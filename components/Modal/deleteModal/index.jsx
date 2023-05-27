import React from 'react';

const Delete = ({ isVisible, close, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === 'delete') close();
  };
  return (
    <div class="flex fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden bg-opacity-25 backdrop-blur-sm overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="delete" onClick={handleClose}>
      <div class="relative w-full h-full max-w-md px-4 md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div class="flex justify-end p-2">
            <button
              type="button"
              onClick={() => close()}
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
              data-modal-toggle="delete-user-modal"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div class="p-6 pt-0 text-center">
            <svg class="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
