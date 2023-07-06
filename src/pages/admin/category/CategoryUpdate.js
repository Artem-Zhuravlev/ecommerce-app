import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useNavigate, useParams  } from 'react-router-dom';
import { useSelector } from 'react-redux'
import {
  getCategory,
  updateCategory
} from "../../../utils/categories";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useSelector(state => ({...state}))
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () => getCategory(slug).then(c => {
    setName(c.data.name)
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug,{ name }, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is updated`);
        navigate('/admin/category');
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      })
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
              <h4>Update category</h4>
              <CategoryForm
                name={name}
                handleSubmit={handleSubmit}
                setName={setName}
                loading={loading}
              />
              <hr/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryUpdate;
