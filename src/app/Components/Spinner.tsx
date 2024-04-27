const Spinner = () => {
    return (
        <div className="flex items-center justify-center">
        <svg
          className="animate-spin h-5 w-5 text-gray-500 mr-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.003 8.003 0 014 12H0c0 4.418 3.582 8 8 8v-4zm10-1.708A8.003 8.003 0 0120 12h4c0 4.418-3.582 8-8 8v-4zm-2-6.584V4a8.003 8.003 0 01-4 6.292z"
          ></path>
        </svg>
        <span>Loading...</span>
      </div>
    );
};

export default Spinner;
