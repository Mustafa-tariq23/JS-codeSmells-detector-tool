import React, { useState } from "react";
import CategoryFilters from "./CategoryFilters";
import Products from "./Products";
import Testimonial from "./Testimonial";
import Footer from "./Footer";
import Header from "./Header";
import products from "./products-info";
import { useNavigate } from "react-router-dom";

function Home() {
    const [item, setItem] = useState(products);

    const navigate = useNavigate();

    function handleOnClick({ alt, src, heading, detail, para, id, price }) {
        console.log(id);
        navigate(`product-details/${id}`, {
            state: {
                alt: alt,
                src: src,
                heading: heading,
                detail: detail,
                para: para,
                id: id,
                price: price,
            },
        });
    }

    const categoryItems = [...new Set(products.map((Val) => Val.category))];

    const filterItem = (curCat) => {
        // console.log(curCat)
        const newItem = products.filter((newVal) => {
            // console.log(cu)
            return newVal.category === curCat;
        });
        // console.log(newItem)
        setItem(newItem);
    };

    return (
        <>
            <Header />

            <CategoryFilters
                selectCategory={filterItem}
                setItems={setItem}
                catItems={categoryItems}
            />


            <div className="flex flex-wrap items-center px-50 gap-5 justify-center">
                {item.map((item, index) => {
                    return (
                        <Products
                            onClick={() =>
                                handleOnClick({
                                    alt: item.alt,
                                    src: item.src,
                                    heading: item.heading,
                                    detail: item.category,
                                    para: item.para,
                                    id: item.id,
                                    price: item.price,
                                })
                            }
                            key={index}
                            src={item.src}
                            alt={item.alt}
                            heading={item.heading}
                            para={item.para}
                            detail={item.para}
                            id={item.id}
                        />
                    );
                })}
            </div>
            <Testimonial />
            <Footer />
        </>
    );
}

export default Home;
