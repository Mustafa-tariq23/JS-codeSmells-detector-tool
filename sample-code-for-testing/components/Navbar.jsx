import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar({onClick, onChange}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const [searchItem, setSearchTerm] = useState('')
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search term submitted:", searchTermLocal);
    setSearchTerm(searchTermLocal);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    console.log('Input value:', value);
    setSearchTermLocal(value);
  };

  return (
    <>
      <nav className="relative bg-white dark:bg-gray-900" data-open={isOpen}>
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between py-4">
            <Link to="/">
              <img
                className="lg:w-20 lg:h-20 rounded-full w-12 h12 ring-2 ring-white"
                src="http://localhost:3000/images/logo.jpg"
                alt="Logo Image"
              />
            </Link>

            <div className="flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="relative pl-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>

            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                  placeholder="Search"
                  value={searchTermLocal}
                  onChange={handleInputChange}
                />
                {searchTermLocal && (
                  <button
                    className="absolute inset-y-0 right-0 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md cursor-pointer"
                    onClick={() => { setSearchTermLocal(''); setSearchTerm(''); }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </form>
          </div>

          <div
            data-cloak
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center ${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'
              }`}
          >
            <div className="flex flex-col md:flex-row md:mx-6">
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/"
              >
                Home
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/#products"
              >
                Shop
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/contact"
              >
                Contact
              </Link>
              <Link
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                to="/about"
              >
                About
              </Link>
            </div>

            <div className="flex justify-center md:block">
              <Link
                className="relative text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300"
                to="/cart"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="absolute top-0 left-0 p-1 text-xs text-white bg-blue-500 rounded-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
