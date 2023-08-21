"use client";
const Modal = ({ children, isModalOpen, toggleModal }) => {
  const handleOverlayClick = (event) => {
    if (event.target.id === "defaultModal") {
      toggleModal();
    }
  };

  return (
    <div>
      {/* Main modal */}
      {isModalOpen && (
        <div
          id="defaultModal"
          tabIndex="-1"
          aria-hidden="true"
          onClick={handleOverlayClick}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative w-[400px] max-w-2xl">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-6 space-y-6">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;