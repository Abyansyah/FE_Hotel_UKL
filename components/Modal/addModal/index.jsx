const Modal = ({ isVisible, close, judul, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === 'tambah') close();
  };
  return (
    <>
      <div class="fixed left-0 flex right-0 z-50 items-center justify-center bg-opacity-25 backdrop-blur-sm overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full" id="tambah" onClick={handleClose}>
        <div class="relative w-full h-full max-w-2xl px-4 md:h-auto">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
              <h3 class="text-xl font-semibold dark:text-white">{judul}</h3>
              <button
                type="button"
                onClick={() => close()}
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                data-modal-toggle="add-user-modal"
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

            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
