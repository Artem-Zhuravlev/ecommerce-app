import React, { useState, useEffect } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../utils/product";
import { getCategories } from "../utils/categories";
import { getSubCategories } from "../utils/sub";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {DollarOutlined, DownSquareOutlined, StarOutlined} from "@ant-design/icons";
import Star from "../components/forms/Star";
const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS']);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState(['Black', 'Brown', 'Silver', 'White', 'Blue']);
  const [color, setColor] = useState('');
  const [shipping, setShipping] = useState('');

  const dispatch = useDispatch();
  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  useEffect(() => {
    loadAllProducts();
    getCategories()
      .then(res => setCategories(res.data))
    getSubCategories()
      .then(res => setSubs(res.data))
  }, []);
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setCategoryIds([]);
    setPrice(value);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    setTimeout(() => {
      setOk(!ok);
    }, 300)
  }

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setShipping('');
    const inTheState = [...categoryIds];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked);

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);

    fetchProducts({ category: inTheState });
  }

  const showCategories = () => categories.map((c) => (
    <div className='pb-2 ps-4 pe-4' key={c._id}>
      <Checkbox
        value={c._id}
        name='category'
        onChange={handleCheck}
        checked={categoryIds.includes(c._id)}
      >
        {c.name}
      </Checkbox>
    </div>
  ));

  const handleSub = (sub) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setStar('');
    setSub(sub);
    setBrand('');
    setShipping('');
    setColor('');
    fetchProducts({ sub })
  }

  const showSubs = () => subs.map((s) => (
    <button
      key={s._id}
      className='p-2 m-1 badge bg-secondary border-0' key={s._id}
      onClick={() => handleSub(s)}
    >
      {s.name}
    </button>
  ));

  const handleStarClick = (num) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setBrand('');
    setShipping('');
    setColor('');
    fetchProducts({ stars: num })
  }

  const showStars = () => (
    <div className='pb-2 ps-4 pe-4'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  )

  const showBrands = () => brands.map(b => (
    <Radio
      key={b}
      value={b}
      name={b}
      onChange={handleBrand}
      checked={b === brand}
      className='pb-2 ps-2 pe-2'
    >
      {b}
    </Radio>
  ))

  const handleBrand = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setColor('');
    setShipping('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
  }

  const showColors = () => colors.map(c => (
    <Radio
      key={c}
      value={c}
      name={c}
      onChange={handleColor}
      checked={c === color}
      className='pb-2 ps-2 pe-2'
    >
      {c}
    </Radio>
  ));

  const handleColor = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setShipping('');
    setColor(e.target.value);
    fetchProducts({ color: e.target.value });
  }

  const showShipping = () => (
    <>
      <Checkbox
        className='pb-2 ps-4 pe-4'
        onChange={handleShippingChange}
        value='Yes'
        checked={shipping === 'Yes'}
      >
        Yes
      </Checkbox>
      <Checkbox
        className='pb-2 ps-4 pe-4'
        onChange={handleShippingChange}
        value='No'
        checked={shipping === 'No'}
      >
        No
      </Checkbox>
    </>
  )

  const handleShippingChange = (e) => {
    setSub('');
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' }
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor('');
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: 'calc(100vh - 47px)' }}>
        <div className="col-md-3 mt-4 border border-top-0 border-bottom-0 border-start-o">
          <h4>Search/Filter</h4>
          <hr/>
          <Menu
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
            mode='inline'>
            <SubMenu
              key='1'
              title={
                <span className='d-flex align-items-center'>
                  <DollarOutlined />
                  <h6 className='h6 ms-3 mb-0'>Price</h6>
                </span>
              }
            >
              <div>
                <Slider
                  className='ms-4 me-4'
                  tooltip={{ formatter: (v) => `$${v}` }}
                  range
                  value={price}
                  max='4999'
                  onChange={handleSlider}
                />
              </div>
            </SubMenu>
            <SubMenu
              key='2'
              title={
                <span className='d-flex align-items-center'>
                  <DownSquareOutlined />
                  <h6 className='h6 ms-3 mb-0'>Categories</h6>
                </span>
              }
            >
              <div>
                { showCategories() }
              </div>
            </SubMenu>
            <SubMenu
              key='3'
              title={
                <span className='d-flex align-items-center'>
                  <StarOutlined />
                  <h6 className='h6 ms-3 mb-0'>Ratings</h6>
                </span>
              }
            >
              <div>
                { showStars() }
              </div>
            </SubMenu>

            <SubMenu
              key='4'
              title={
                <span className='d-flex align-items-center'>
                  <StarOutlined />
                  <h6 className='h6 ms-3 mb-0'>Sub categories</h6>
                </span>
              }
            >
              <div>
                { showSubs() }
              </div>
            </SubMenu>

            <SubMenu
              key='5'
              title={
                <span className='d-flex align-items-center'>
                  <StarOutlined />
                  <h6 className='h6 ms-3 mb-0'>Brands</h6>
                </span>
              }
            >
              <div className='d-flex flex-column'>
                { showBrands() }
              </div>
            </SubMenu>

            <SubMenu
              key='6'
              title={
                <span className='d-flex align-items-center'>
                  <StarOutlined />
                  <h6 className='h6 ms-3 mb-0'>Colors</h6>
                </span>
              }
            >
              <div className='d-flex flex-column'>
                { showColors() }
              </div>
            </SubMenu>

            <SubMenu
              key='7'
              title={
                <span className='d-flex align-items-center'>
                  <StarOutlined />
                  <h6 className='h6 ms-3 mb-0'>Shipping</h6>
                </span>
              }
            >
              <div className='d-flex flex-column'>
                { showShipping() }
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className="col-md-9 mt-4">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}
          <hr/>

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
