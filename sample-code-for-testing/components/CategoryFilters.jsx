import React, { useState } from "react";
import products from "./products-info";

const CategoryFilters = ({ selectCategory, catItems, setItems }) => {
  return (
    
    <>
      <div className="filterButtons justify-center gap-4 mb-8 pt-5 flex flex-wrap">
      <button
          className={`btn btn-outline hover:border-rose-600 text-rose-600 hover:bg-rose-600 border-rose-600 `}
          onClick={()=>setItems(products)}
        >
          {console.log(products)}
          ALL
        </button>
        {catItems.map((item, id) => {
          return (
            <button
              className={`btn btn-outline hover:border-rose-300 text-rose-300 hover:bg-rose-300 border-rose-300 `}
              onClick={()=>selectCategory(item)}
              key={id}
            >
              {/* {console.log(item)} */}
              {item}
            </button>

          )
        })
        }
      </div>
    </>
  );
};

export default CategoryFilters;
