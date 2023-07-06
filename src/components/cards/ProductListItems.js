import React from "react";
import { Link } from 'react-router-dom';
const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } = product
  return (
    <ul className='list-group list-group-flush'>
      <li className='list-group-item d-flex justify-content-between align-items-center fs-5'>
        Price
        <span className='text-lowercase '>
          $ {price}
        </span>
      </li>
      {
        category ? (
          <li className='list-group-item d-flex justify-content-between align-items-center fs-5'>
            Category
            <Link to={`/category/${category.slug}`} className='text-capitalize'>
              {category.name}
            </Link>
          </li>
        ) : ''
      }
      {
        subs ? (
          <li className='list-group-item justify-content-between d-flex align-items-center fs-5'>
            Sub Categories
            {
              subs.map(s => (
                <Link
                  to={`/sub/${s.slug}`}
                  key={s._id}
                  className='text-capitalize'
                >
                {s.name}
               </Link>
              ))
            }
          </li>
        ) : ''
      }
      <li className='list-group-item d-flex justify-content-between align-items-center fs-5'>
        Shipping
        <span className='text-capitalize'>
          {shipping}
        </span>
      </li>
      <li className='list-group-item d-flex justify-content-between align-items-center fs-5'>
        Color
        <span className='text-capitalize'>
          {color}
        </span>
      </li>
      <li className='list-group-item d-flex justify-content-between align-items-center fs-5'>
        Brand
        <span className='text-capitalize'>
          {brand}
        </span>
      </li>
      <li className='list-group-item d-flex justify-content-between align-items-center fs-5'>
        Available
        <span className='text-capitalize'>
          {quantity}
        </span>
      </li>
      <li className='list-group-item d-flex justify-content-between align-items-center fs-5'>
        Sold
        <span className='text-capitalize'>
          {sold}
        </span>
      </li>
    </ul>
  )
}

export default ProductListItems
