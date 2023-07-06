import React, { useState } from 'react';
import {Badge, Menu} from 'antd';

import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Search from "../forms/Search";

import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  ShopOutlined,
  ShoppingCartOutlined
} from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState('home');
  const history = useNavigate();
  const { user, cart } = useSelector((state) => ({...state}));
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const dispatch = useDispatch();
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null
    });
    history('/login');
  }
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Item
        key="home"
        icon={<AppstoreOutlined />}
      >
        <Link to="/">Home</Link>
      </Item>
      <Item
        key="shop"
        icon={<ShopOutlined />}
      >
        <Link to="/shop">Shop</Link>
      </Item>
      <Item
        key="cart"
        icon={<ShoppingCartOutlined />}
      >
        <Link to="/cart">

          <Badge count={cart.length} offset={[9, 0]}>Cart</Badge>
        </Link>
      </Item>


      {user  && (
        <>
          <li>
            <Search/>
          </li>
          <SubMenu
            key="userSubMenu"
            icon={<SettingOutlined />}
            title={user.email && user.email.split('@')}
            className='ms-auto'
          >
            {
              user && user.role === 'subscriber' && (
                <Item key="dashboardUser">
                  <Link to='/user/history'>Dashboard</Link>
                </Item>
              )
            }

            {
              user && user.role === 'admin' && (
                <Item key="dashboardAdmin">
                  <Link to='/admin/dashboard'>Dashboard</Link>
                </Item>
              )
            }
            <Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </SubMenu>
        </>
      )}

      {!user && (
        <Item key="register" icon={<UserAddOutlined />}>
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>
      )}
    </Menu>
  );
}

export default Header;
