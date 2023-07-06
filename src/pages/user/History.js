import React, { useState, useEffect } from 'react';
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../utils/users";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentsInfo from '../../components/cards/ShowPaymentsInfo'

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadUserOrders = () => {
    getUserOrders(user.token)
      .then(res => {
        setOrders(res.data);
      })
  }

  const showEachOrders = () => orders.map((order, i) => (
    <div key={i} className='mt-5 mb-5 p-3 card'>
      <ShowPaymentsInfo
        order={order}
      />
      {
        showOrderInTable(order)
      }
    </div>
  ))

  const showOrderInTable = (order) => {
    return (
      <table className='table table-bordered'>
        <thead className="table-light">
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Brand</th>
            <th scope='col'>Color</th>
            <th scope='col'>Count</th>
            <th scope='col'>Shipping</th>
          </tr>
        </thead>
        <tbody>
          { order.products.map((p, i) => (
            <tr key={i}>
              <td><b>{p.product.title}</b></td>
              <td><b>{p.product.price}</b></td>
              <td><b>{p.product.brand}</b></td>
              <td><b>{p.product.color}</b></td>
              <td><b>{p.count}</b></td>
              <td><b>{p.product.shipping}</b></td>
            </tr>
          )) }
        </tbody>
      </table>
    )
  }

  useEffect(() => {
    loadUserOrders();
  }, [])
  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: 'calc(100vh - 47px)' }}>
        <div className="col-md-2 border border-top-0 border-bottom-0 border-start-o">
          <UserNav />
        </div>
        <div className="col pt-4 ps-5">
          <h4>
            { orders.length > 0? 'User purchase orders' : 'No purchase orders' }
          </h4>
          {
            showEachOrders()
          }
        </div>
      </div>
    </div>
  )
}

export default History;
