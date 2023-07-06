import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubCategories } from "../../utils/sub";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories()
      .then(c => {
        setSubs(c.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const showSubs = () => subs.map((s) => (
    <div
      className='col-md-3'
      key={s._id}
    >
      <Link
        className='d-block btn btn-outline-primary btn-lg btn-block btn-raised mb-3'
        to={`/sub/${s.slug}`}
      >
        {s.name}
      </Link>
    </div>
  ))

  return (
    <div className="container">
      <div className="row">
        { loading ? (
          <h4 className='text-center'>Loading...</h4>
        ) : showSubs() }
      </div>
    </div>
  )
}

export default SubList;
