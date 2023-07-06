import React from 'react';
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import defaultImage from '../../images/default-card.jpg';

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const imageStyle = {
    width: '100%',
    height: '50px',
    objectFit: 'cover'
  }

  return (
    <Drawer
      visible={drawer}
      className='text-center'
      title={`Cart / ${cart.length} Product`}
      placement='left'
      onClose={() => {
        dispatch({
          type: 'SET_VISIBLE',
          payload: false
        })
      }}
    >
      {
        cart.map((p) => (
          <div key={p._id} className='row'>
            <div className="col">
              {
                p.images[0] ? (
                  <>
                    <img src={p.images[0].url} style={imageStyle} />
                    <p className='text-center bg-secondary text-light'>
                      {p.title} x {p.count}
                    </p>
                  </>
                ) : (
                  <>
                    <img src={defaultImage} alt="default image"/>
                    <p className='text-center bg-secondary text-light'>
                      {p.title} x {p.count}
                    </p>
                  </>
                )
              }
            </div>
          </div>
        ))
      }
      <Link
        to='/cart'
        className='btn btn-info w-100'
        onClick={() => {
          dispatch({
            type: 'SET_VISIBLE',
            payload: false
          })
        }}
      >
        Go to cart
      </Link>
    </Drawer>
  )
}

export default SideDrawer;
