import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {
  getCategories,
} from "../../../utils/categories";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory
} from "../../../utils/sub";
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector(state => ({...state}))
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [category, setCategory] = useState('');

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, [])

  const loadCategories = () => getCategories().then(c => {
    setCategories(c.data)
  })

  const loadSubCategories = () => getSubCategories().then(s => {
    setSubCategories(s.data)
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubCategory({name, parent: category}, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is created`);
        loadSubCategories();
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      })
  }

  const handleRemove = async (slug) => {
    setLoading(true)
    removeSubCategory(slug, user.token)
      .then(res => {
        setLoading(false);
        toast.error(`Deleted ${res.data.name}`);
        loadSubCategories();
      })
      .catch(err => {
        if (err.response.status === 400) {
          toast.error(err.response.data);
        }
      })
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: 'calc(100vh - 47px)' }}>
        <div className="col-md-2 border border-top-0 border-bottom-0 border-start-o">
          <AdminNav />
        </div>
        <div className="col pt-4 ps-5">
          <div className="row">
            <div className="col-md-8">
              <h4>Create sub category</h4>
              <div className="form-group">
                <label>Parent Category</label>
                <select
                  name="category"
                  className='form-select mb-4'
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Please category option</option>
                  {
                    categories.length > 0 &&
                    categories.map((c) => (<option key={c._id} value={c._id}>{c.name}</option>))
                  }
                </select>
              </div>
              <CategoryForm
                name={name}
                handleSubmit={handleSubmit}
                setName={setName}
                loading={loading}
              />

              <LocalSearch
                keyword={keyword}
                setKeyword={setKeyword}
              />

              <hr/>
              <div className="d-flex gap-3 flex-wrap">
                { subCategories.filter(searched(keyword)).map((s) => (
                  <div
                    className="alert alert-info d-inline-flex align-items-center gap-3 mb-0 p-2"
                    key={s._id}
                  >
                    {s.name}
                    <Link
                      className="d-flex align-items-center"
                      to={`/admin/sub/${s.slug}`}
                    >
                      <EditOutlined
                        className="text-dark"
                      />
                    </Link>
                    <span
                      className="d-flex align-items-center"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRemove(s.slug)}
                    >
                      <DeleteOutlined
                        className="text-dark"
                      />
                    </span>
                  </div>
                )) }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCreate;
