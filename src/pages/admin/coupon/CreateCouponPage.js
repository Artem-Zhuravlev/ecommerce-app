import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from 'react-datepicker';
import { getCoupons, removeCoupon, createCoupon } from "../../../utils/coupon";
import 'react-datepicker/dist/react-datepicker.min.css';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([])

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllCoupons();
  }, []);

  const loadAllCoupons = () => {
    getCoupons().then(res => {
      setCoupons(res.data);
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCoupon({
      name, expiry, discount
    }, user.token)
      .then(res => {
        setLoading(false);
        loadAllCoupons();
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`${res.data.name} is created`);
      })
      .catch(err => {
        toast.error(err);
      })
  }

  const handleRemove = (couponId) => {
    if (window.confirm('Delete ? ')) {
      setLoading(true)
      removeCoupon(couponId, user.token)
        .then(res => {
          loadAllCoupons();
          setLoading(false);
          toast.error(`${res.data.name} was deleted`);
        })
    }
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: 'calc(100vh - 47px)' }}>
        <div className="col-md-2 border border-top-0 border-bottom-0 border-start-o">
          <AdminNav />
        </div>
        <div className="col pt-4 ps-5">
          <div className="row">
            <div className="col-md-8">
              <h4>Coupon</h4>
              <form
                className='mb-5'
                onSubmit={handleSubmit}
              >
                <div className="form-group mb-3">
                  <label className='text-muted'>Name</label>
                  <input
                    type="text"
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                  />
                </div>

                <div className="form-group mb-3">
                  <label className='text-muted'>Discount</label>
                  <input
                    type="text"
                    className='form-control'
                    onChange={(e) => setDiscount(e.target.value)}
                    value={discount}
                    required
                  />
                </div>

                <div className="form-group d-flex flex-column mb-5">
                  <label className='text-muted'>Expiry</label>
                  <DatePicker
                    className='form-control w-100'
                    selected={expiry}
                    required
                    onChange={(date) => setExpiry(date)}
                  />
                </div>
                <button
                  className='btn btn-outline-primary'
                >
                  Save

                </button>
              </form>

              <div>
                <h4>{coupons.length} coupons</h4>

                <table
                  className='table table-bordered'
                >
                  <thead className='table-light'>
                    <tr>
                      <th scope='col'>
                        Name
                      </th>
                      <th scope='col'>
                        Expiry
                      </th>
                      <th scope='col'>
                        Discount
                      </th>
                      <th scope='col'>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      coupons.map((c) => (
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>{new Date(c.expiry).toDateString()}</td>
                          <td>{c.discount}</td>
                          <td>
                            <DeleteOutlined
                              className='text-danger'
                              onClick={() => handleRemove(c._id)}
                            />
                          </td>

                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCouponPage;
