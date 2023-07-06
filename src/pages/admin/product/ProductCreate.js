import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {
  createProduct
} from "../../../utils/product";
import {
  getCategories,
  getCategorySubs
} from "../../../utils/categories";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

const initalState = {
  title: '',
  description: '',
  categories: [],
  price: 0,
  category: '',
  subs: [],
  shipping: '',
  quantity: 0,
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue' ],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: ''
}
const ProductCreate = () => {
  const [values, setValues] = useState(initalState);
  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadCategories();
  }, [])

  const loadCategories = () => getCategories().then(c => {
    setValues({ ...values, categories: c.data })
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
    createProduct(values, user.token)
      .then(res => {
        console.log(res)
        window.alert(`${res.data.title} is created`);
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data)
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then(res => {
        setSubOptions(res.data)
      })
    setShowSub(true);
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: 'calc(100vh - 47px)' }}>
        <div className="col-md-2 border border-top-0 border-bottom-0 border-start-o">
          <AdminNav />
        </div>
        <div className="col pt-4 ps-5">
          <h4>Product create</h4>
          <hr/>
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  )
}
export default ProductCreate;
