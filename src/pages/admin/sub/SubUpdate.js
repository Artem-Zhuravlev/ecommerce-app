import React, { useState, useEffect } from 'react';
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {
  getCategories,
} from "../../../utils/categories";
import {
  updateSubCategory,
  getSubCategory
} from "../../../utils/sub";
import {useNavigate, useParams} from 'react-router-dom';
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useSelector(state => ({...state}))
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, [])

  const loadCategories = () => getCategories().then(c => {
    setCategories(c.data)
  })

  const loadSubCategory = () => getSubCategory(slug).then(s => {
    setName(s.data.name);
    setParent(s.data.parent)
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubCategory(slug,{name, parent}, user.token)
      .then(res => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is created`);
        navigate('/admin/sub');
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
              <h4>Update sub category</h4>
              <div className="form-group">
                <label>Parent Category</label>
                <select
                  name="category"
                  className='form-select mb-4'
                  onChange={(e) => setParent(e.target.value)}

                >
                  <option>Please category option</option>
                  {
                    categories.length > 0 &&
                    categories.map((c) => (
                      <option
                        key={c._id}
                        value={c._id}
                        selected={c._id === parent}
                      >
                        {c.name}
                      </option>
                    ))
                  }
                </select>
              </div>
              <CategoryForm
                name={name}
                handleSubmit={handleSubmit}
                setName={setName}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubUpdate;
