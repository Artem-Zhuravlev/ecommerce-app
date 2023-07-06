import React, {useState} from 'react';
import {Card, Tabs, Tooltip} from 'antd';
import { Link } from 'react-router-dom';
import ProductListItems from "./ProductListItems";
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import StarRatings from "react-star-ratings/build/star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../utils/rating";
import defaultCard from '../../images/default-card.jpg'
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import { addToWishlist } from "../../utils/users";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id} = product;
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [tooltip, setTooltip] = useState('Click to add');
  const history = useNavigate();
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

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token)
      .then(res => {
        toast.success('Added to wishlist');
        history('/user/wishlist')
      })
  }

  return(
    <>
      <div className="col-md-6 offset-1">
        {
          images && images.length ? (
            <Carousel
              showArrows={true}
              autoPlay={true}
            >
              { images && images.map(i => (
                <img
                  src={i.url}
                  key={i.public_key}
                  alt={i.public_key}
                />
              ))}
          </Carousel>) : (
            <Card
              cover={
                <img
                  src={defaultCard}
                  style={{ height: '450px', objectFit: 'cover' }}
                  alt="Default Card"
                />
              }
            />
          )
        }

        <Tabs type='card' defaultActiveKey='1'>
          <Tabs.TabPane
            tab='Description'
            key='1'
          >
            {description && description}
          </Tabs.TabPane>
          <Tabs.TabPane
            tab='More'
            key='2'
          >
            Call us on XXX XXX XXX to learn about this product
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className='bg-light p-4'>{title}</h1>
        { product && product.ratings && product.ratings.length > 0
            ? showAverage(product)
          :  (<div className='text-center pt-1 pb-3'>No rating yet</div>)
        }
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <a onClick={handlerAddToCard}>
                <ShoppingCartOutlined
                  className='text-danger'
                />
                <br/>
                Add to cart
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined
                className='text-info'
              />
              <br/>
              Add to Wishlist
            </a>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                starDimension="25px"
                starSpacing="5px"
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='purple'
              />
            </RatingModal>
          ]}
        >
          <ProductListItems
            product={product}
          />
        </Card>
      </div>
    </>
  )
}

export default SingleProduct;
