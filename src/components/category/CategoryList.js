import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from "../../utils/categories";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then(c => {
        setCategories(c.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const showCategories = () => categories.map((c) => (
    <div
      className='col btn btn-outline-primary btn-lg btn-block btn-raised m-3'
      key={c._id}
    >
      <Link
        to={`/category/${c.slug}`}
      >
        {c.name}
      </Link>
    </div>
  ))

  return (
    <div className="container">
      <div className="row">
          { loading ? (
            <h4 className='text-center'>Loading...</h4>
          ) : showCategories() }
      </div>
    </div>
  )
}

export default CategoryList;
