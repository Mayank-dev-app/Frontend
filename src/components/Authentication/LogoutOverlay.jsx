import React from 'react';
import { X } from 'lucide-react';

const LogoutOverlay = ({ onCancel, onLogout }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sm:p-10 w-[90%] sm:w-[400px] text-center space-y-4">

        {/* Close icon */}
        <button
          className="absolute top-2 right-2 cursor-pointer hover:text-red-500"
          onClick={onCancel}
        >
          <X />
        </button>

        <div className="flex flex-col gap-5 font-serif">
          <h1 className="font-bold text-red-600 text-2xl">Confirm</h1>
          <h3 className="text-base sm:text-lg text-gray-800 dark:text-gray-100">
            Are you sure you want to Logout?
          </h3>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={onCancel}
              className="text-white bg-gray-800 rounded-2xl px-6 py-2 hover:bg-gray-900 transition"
            >
              Cancel
            </button>

            <button
              onClick={onLogout}
              className="text-white bg-red-400 font-bold rounded-2xl px-6 py-2 hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutOverlay;
