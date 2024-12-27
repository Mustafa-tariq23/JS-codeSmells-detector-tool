import React from 'react'

const ProductDetails = ({src, alt, heading, para, detail, price, onClick}) => {
  
  return (
    <>
      <div>
      <img src={src} alt={alt} />
      <h2>{heading}</h2>
      <p>{para}</p>
      <p>{detail}</p>
      <p>Price: {price}</p>
      <button onClick={onClick}>Buy Now</button>
    </div>
    </>
  )
}

export default ProductDetails