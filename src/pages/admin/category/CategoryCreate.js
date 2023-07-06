import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {
  createCategory,
  getCategories,
  removeCategory
} from "../../../utils/categories";
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector(state => ({...state}))
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories();
  }, [])

  const loadCategories = () => getCategories().then(c => {
    setCategories(c.data)
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({name}, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is created`);
        loadCategories();
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      })
  }

  const handleRemove = async (slug) => {
    setLoading(true)
    removeCategory(slug, user.token)
      .then(res => {
        setLoading(false);
        toast.error(`Deleted ${res.data.name}`);
        loadCategories();
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
              <h4>Create category</h4>
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
                { categories.filter(searched(keyword)).map((c) => (
                  <div
                    className="alert alert-info d-inline-flex align-items-center gap-3 mb-0 p-2"
                    key={c._id}
                  >
                    {c.name}
                    <Link
                      className="d-flex align-items-center"
                      to={`/admin/category/${c.slug}`}
                    >
                      <EditOutlined
                        className="text-dark"
                      />
                    </Link>
                    <span
                      className="d-flex align-items-center"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleRemove(c.slug)}
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

export default CategoryCreate;
