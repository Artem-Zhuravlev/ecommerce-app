import React, { useState, useEffect } from 'react';
import { getProduct, productStar } from "../utils/product";
import { useParams } from "react-router-dom";
import SingleProduct from '../components/cards/SingleProduct.js';
import {useSelector} from "react-redux";
import { getRelated } from "../utils/product";
import ProductCard from "../components/cards/ProductCard";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [star, setStar] = useState(0);
  const { user } = useSelector((state) => ({...state}));
  const { slug } = useParams();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    loadSingleProduct()
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (el) => el.postedBy.toString() === user._id.toString()
      );

      existingRatingObject && setStar(existingRatingObject.star)
    }
  })

  const loadSingleProduct = () => {
    getProduct(slug)
      .then(res => {
        setProduct(res.data);
        getRelated(res.data._id).then(r => setRelated(r.data))
      });
  }
  const onStarClick = (newRating, name) => {
    setStar(newRating)
    productStar(name, newRating, user.token)
      .then(res => {
        loadSingleProduct();
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='container-fluid'>
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>
      <div className="row pt-5 pb-5">
        <div className='text-center p-3 mt-5 mb-5 display-6 bg-light text-secondary'>Related products</div>
      </div>
      <div className="container">
        <div className="row pb-5">
          {
            related.length ? related.map(el => (
              <div
                key={el._id}
                className='col-md-4'
              >
                <ProductCard
                  product={el}
                />
              </div>
            )) : (
              <div
                className='text-center col'
              >
                No related products
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Product
