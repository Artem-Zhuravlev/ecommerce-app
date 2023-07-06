import React, { useState, useEffect } from 'react';
import { Card, Skeleton, Tooltip } from 'antd';
import {DeleteOutlined, EditOutlined, EyeOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import defaultCard from '../../images/default-card.jpg';
import { showAverage } from "../../utils/rating";
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";
const  { Meta } = Card

const ProductCard = ({ product }) => {
  const {
    title,
    description,
    images,
    slug,
    price
  } = product;
  const [tooltip, setTooltip] = useState('Click to add');
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const handlerAddToCard = () => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem(('cart')));
      }

      cart.push({
        ...product,
        count: 1
      });

      const unique = _.uniqWith(cart, _.isEqual);
      localStorage.setItem('cart', JSON.stringify(unique));
      setTooltip('Added');
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique
      });
      dispatch({
        type: 'SET_VISIBLE',
        payload: true
      })
    }
  }

  return (
    <>
      { product && product.ratings && product.ratings.length > 0
        ? showAverage(product)
        :  (<div className='text-center pt-1 pb-3'>No rating yet</div>)
      }
      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : defaultCard}
            style={{ height: '150px', objectFit: 'cover' }}
            className="m-1"
          />
        }

        actions={[
          <Link
            to={`/product/${slug}`}
          >
            <EyeOutlined
              className='text-warning'
            /><br/> View Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handlerAddToCard} disabled={product.quantity < 1}>
            <ShoppingCartOutlined
              className='text-danger'
            />
              <br/>
              { product.quantity < 1 ? 'Out of stock' : 'Add to cart' }
            </a>
          </Tooltip>
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={`${description && description.substring(0, 40) }`}
        />
      </Card>
    </>
  )
}

export default ProductCard;
