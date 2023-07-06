import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../utils/users";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false)
  const [couponState, setCouponState] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const history = useNavigate();

  const dispatch = useDispatch();
  const { user, cod, coupon } = useSelector((state) => ({ ...state }));
  const saveAddressToDb = () => {
    saveUserAddress(user.token, address)
      .then(res => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success('Address saved');
        }
      })
  }

  const emptyCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: []
    });

    emptyUserCart(user.token)
      .then(res => {
        setProducts([]);
        setTotal(0);
        setTotalAfterDiscount(0);
        setCouponState('')
        toast.success('Cart is empty. Continue shopping');
      });
  }

  useEffect(() => {
    getUserCart(user.token)
      .then(res => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
  }, []);

  const showAddress = () => {
    return (
      <>
        <ReactQuill
          theme="snow"
          value={address}
          onChange={setAddress}
        />
        <button
          className='btn btn-primary mt-2'
          onClick={saveAddressToDb}
        >
          Save
        </button>
      </>
    )
  };

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div
        key={i}
      >
        <p>{p.product.title} ({ p.color }) x {p.count} = {p.product.price * p.count}</p>
      </div>
    ))
  }

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        className='form-control'
        value={couponState}
        onChange={(e) => {
          setCouponState(e.target.value)
          setDiscountError('')
        }}
      />
      <button
        className='btn btn-primary mt-2'
        onClick={applyDiscountCoupon}
      >
        Apply
      </button>
    </>
  )

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, couponState)
      .then(res => {
        if (res.data) {
          setTotalAfterDiscount(res.data);
          dispatch({
            type: 'COUPON_APPLIED',
            payload: true
          })
        }

        if(res.data.err) {
          setDiscountError(res.data.err);
          dispatch({
            type: 'COUPON_APPLIED',
            payload: false
          })
        }
      })
  }

  const createCashOrder = () => {
    createCashOrderForUser(user.token, cod, coupon)
      .then(res => {
          if (res.data.ok) {
            if (typeof window !== 'undefined') localStorage.removeItem('cart')
            dispatch({
              type: 'ADD_TO_CART',
              payload :[]
            });
            dispatch({
              type: 'COUPON_APPLIED',
              payload: false
            });
            dispatch({
              type: 'COD',
              payload: false
            });
            emptyUserCart(user.token);
            setTimeout(() => {
              history('/user/history');
            }, 1000)
          }
      })
  }

  return (
    <div className="container-fluid mt-4">
      <div className='row'>
        <div className="col-md-6">
          <h4 className='mb-2'>Delivery Address</h4>
          {showAddress()}
          <hr/>
          <h4 className='mb-2'>Get Coupon?</h4>
          {showApplyCoupon()}
          <br/>
          {discountError && <p className='text-danger p-2'>{discountError}</p>}
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          <hr/>
          <p>Products {products.length}</p>
          <hr/>

          {showProductSummary()}

          <hr/>
          <p>Card Total: ${ total }</p>
          { totalAfterDiscount > 0 && (
            <div className='d-flex gap-2'>
              <strike>${total}</strike>
              <p className='text-success'>${totalAfterDiscount}</p>
            </div>
          )}
          <div className="row">
            <div className="col-md-6">
              {
                cod ? (
                  <button
                    className='btn btn-primary'
                    disabled={!addressSaved || !products.length}
                    onClick={createCashOrder}
                  >Place Order</button>
                ) : (
                  <button
                    className='btn btn-primary'
                    disabled={!addressSaved || !products.length}
                    onClick={() => history('/payment')}
                  >Place Order</button>
                )
              }

            </div>
            <div className="col-md-6">
              <button
                disabled={!products.length}
                onClick={emptyCart}
                className='btn btn-primary'
              >Empty Card</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  Checkout;
