import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from 'react-redux'
import { useParams  } from 'react-router-dom';
import { getProduct, updateProduct } from "../../../utils/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import {getCategories, getCategorySubs} from "../../../utils/categories";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const initalState = {
  title: '',
  description: '',
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
const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [values, setValues] = useState(initalState);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    loadProduct()
    loadCategories()
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then(p => {
        setValues({...values, ...p.data })
        getCategorySubs(p.data.category._id)
          .then(res => {
            setSubOptions(res.data);
          })
        let arr = []
        p.data.subs.map(s => {
          arr.push(s._id)
        })
        setArrayOfSubs((prev) => arr)
      })
  }

  const loadCategories = () => {
    getCategories().then(c => {
      setCategories(c.data)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then(res => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        navigate('/admin/products');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.err);
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });

    setSelectedCategory(e.target.value)

    getCategorySubs(e.target.value)
      .then(res => {
        setSubOptions(res.data)
      })

    if (values.category._id === e.target.value) {
      loadProduct()
    }

    setArrayOfSubs([])
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: 'calc(100vh - 47px)' }}>
        <div className="col-md-2 border border-top-0 border-bottom-0 border-start-o">
          <AdminNav />
        </div>
        <div className="col pt-4 ps-5">
          <h4>Product update</h4>
          <hr/>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            setValues={setValues}
            categories={categories}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  )
}
export default ProductUpdate;
