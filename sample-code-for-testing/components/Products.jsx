

import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ src, alt, heading, onClick, para, detail, price }) => {

  return (
    <div className="card w-80 h-96 glass ">
      <figure>
        <img src={src} alt={alt} className="object-cover w-full h-40 md:h-48 lg:h-56 xl:h-64" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{heading}</h2>
        <p>{para}</p>
        <button onClick={onClick} className=' px-5 py-2 mt-6 text-sm tracking-wider text-black font-semibold uppercase transition-colors duration-300 transform bg-rose-300 rounded-lg lg:w-auto hover:bg-rose-400 focus:outline-none focus:bg-rose-400'>View Details</button>
      </div>
    </div>
  );
};

export default Product;