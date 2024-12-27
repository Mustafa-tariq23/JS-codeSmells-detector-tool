import React from 'react'
import Navbar from './Navbar'
import { useLocation, useNavigate } from 'react-router-dom'

function ShowItem() {

  const location = useLocation()
  const navigate = useNavigate()
  const productName = location.state?.heading;
  const productDetails = location.state?.detail;
  const productPara = location.state?.para;
  const productAlt = location.state?.alt;
  const productSource = location.state?.src
  const productPrice = location.state?.price

  function handleOnClick() {
    navigate('/buyNow')
  } 
  return (
    <>
      <Navbar />
      <div className="item">
        <div className="flex px-10 py-5 justify-center ">
          <div className="image ">
            <img className=' image-full w-2/4 h-2/2' src={`http://localhost:3000/${productSource}`} alt={productAlt} />
          </div>
          <div>
            <h2 className='tex-white font-extrabold text-2xl'>{productName}</h2>
            <h4>{productDetails}</h4>
            <p>
              {productPara}
            </p>
            <h2 className=' font-extrabold text-3xl'>{productPrice}</h2>
            <button onClick={handleOnClick} className='px-5 py-2 mt-6 text-sm tracking-wider text-black font-semibold uppercase transition-colors duration-300 transform bg-rose-300 rounded-lg lg:w-auto hover:bg-rose-400 focus:outline-none focus:bg-rose-400'>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowItem;

// userName
// email
// Order ID
// Shipping Address
// Amount