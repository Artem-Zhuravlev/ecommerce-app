import React from 'react';
import ModalImage from 'react-modal-image';
import defaultCard from '../../images/default-card.jpg';
import { useDispatch } from "react-redux";
import {toast} from "react-toastify";
import { CheckCircleOutlined, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const dispatch = useDispatch();
  const handleColorChange = (e) => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }

      cart.map((product, i) => {
        if (product._id === p._id)  {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart
      })
    }
  }

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`)
    }

    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((product, i) => {
        if (product._id === p._id)  {
          cart[i].count = count;
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart
      })
    }
  }

  const handleRemove = (id) => {
    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((product, i) => {
        if (product._id === p._id)  {
          cart.splice(i, 1);
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart
      })
    }
  }

  return (
    <tr>
      <td>
        <div style={{ width: '100px', objectFit: 'cover' }}>
          {p.images.length ? (
            <ModalImage
              small={p.images[0].url}
              large={p.images[0].url}
            />
          ) : (
            <ModalImage
              small={defaultCard}
              large={defaultCard}
            />
          )}
        </div>
      </td>
      <td>{p.title}</td>
      <td>${p.price}</td>
      <td>{p.brand}</td>
      <td>
        <select
          name="color"
          id="color"
          onChange={handleColorChange}
          className='form-select'
        >
          {
            p.color ? (
              <option value={p.color}>
                {p.color}
              </option>
            ) : (
              <option>Select</option>
            )
          }

          {colors.filter((c) => c !== p.color ).map((c) => (
            <option value={c} key={c}>{c}</option>
          ))}

        </select>
      </td>
      <td className='text-center'>
        <input
          type="text"
          className='form-control'
          value={p.count}
          onChange={handleQuantityChange}
        />
      </td>
      <td className='text-center'>
        {
          p.shipping  === 'Yes' ?
            (<CheckCircleOutlined className='text-success' />) :
            (<CloseCircleOutlined className='text-danger' />)
        }
      </td>
      <td>
        <div className='w-100 h-100 d-flex align-items-center justify-content-center'>
          <button
            className='d-flex  align-items-center justify-content-center btn btn-danger'
            onClick={() => handleRemove(p._id)}

          >
            <CloseOutlined />
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ProductCardInCheckout;
