import React, { useState, useEffect } from 'react';
import { getCategory } from "../../utils/categories";
import { Link, useParams } from 'react-router-dom';
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategory(slug)
      .then(res => {
        setCategory(res.data.category);
        setProducts(res.data.products);
        setLoading(false);
      })

  }, [])

  return (
    <>
      <div
        className="text-center p-3 mt-5 mb-5 bg-light"
      >
        { loading ? (
          <h4 className='display-6'>Loading...</h4>
        ) : (
          <h4 className='display-6'>
            { products.length } Products in "{ category.name }" category
          </h4>
        ) }
      </div>
      <div className="container">
        <div className="row">
          { products.map(p => (
            <div className='col-md-4 mb-4' key={p._id}>
              <ProductCard
                product={p}
              />
            </div>
          )) }
        </div>
      </div>
    </>
  )
}

export  default CategoryHome;
