import React, { useState } from 'react'
import { Select } from "antd";
import FileUpload from "./FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
  setValues,
  categories,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory
}) => {
  const {
    title,
    description,
    price,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
    category
  } = values;

  const [loading, setLoading] = useState(false)

  return (
    <form onSubmit={handleSubmit} className="row">
      <div className="form-group mb-4 col-md-4">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-4 col-md-4">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="form-control"
          value={description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-4  col-md-4">
        <label>Price</label>
        <input
          type="number"
          name="price"
          className="form-control"
          value={price}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-4  col-md-4">
        <label>Shipping</label>
        <select
          value={shipping === 'Yes' ? 'Yes' : 'No'}
          name="shipping"
          className="form-select"
          onChange={handleChange}
        >
          <option>Please select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div className="form-group mb-4  col-md-4">
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          className="form-control"
          value={quantity}
          onChange={handleChange}
        />
      </div>
      <div className="form-group mb-4  col-md-4">
        <label>Color</label>
        <select
          value={color}
          name="color"
          className="form-select"
          onChange={handleChange}
        >
          <option>Please select</option>
          { colors.map(optionsColor => <option key={optionsColor} value={optionsColor}>{optionsColor}</option>) }
        </select>
      </div>
      <div className="form-group mb-4  col-md-4">
        <label>Brand</label>
        <select
          value={brand}
          name="brand"
          className="form-select"
          onChange={handleChange}
        >
          <option>Please select</option>
          { brands.map(optionsBrand => <option key={optionsBrand} value={optionsBrand}>{optionsBrand}</option>) }
        </select>
      </div>
      <div className="form-group mb-4  col-md-4">
        <label>Category</label>
        <select
          name="category"
          className='form-select mb-4'
          onChange={handleCategoryChange}
          value={selectedCategory ? selectedCategory : category._id}
        >
          <option>{category ? category.name : 'Please select category'}</option>
          {
            categories.length > 0 &&
            categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))
          }
        </select>


        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={arrayOfSubs}
            onChange={(value) => setArrayOfSubs(value)}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      </div>
      <div className="form-group mb-4 col-12">
        <FileUpload
          values={values}
          setValues={setValues}
          setLoading={setLoading}
        />
      </div>
      <div className="col- 12">
        <button
          className="btn btn-outline-info"
          disabled={loading}
        >{
          loading ? ( <LoadingOutlined /> ) : 'Save'
        }</button>
      </div>
    </form>
  )}

export default  ProductUpdateForm;
