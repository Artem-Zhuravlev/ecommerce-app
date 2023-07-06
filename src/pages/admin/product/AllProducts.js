  import React, { useEffect, useState } from 'react';
  import AdminNav from "../../../components/nav/AdminNav";
  import { getProductsByCount } from "../../../utils/product";
  import AdminProductCard from "../../../components/cards/AdminProductCard";
  import { removeProduct } from "../../../utils/product";
  import {useSelector} from "react-redux";
  import {toast} from "react-toastify";

  const AllProducts = () => {
  const { user } = useSelector(state => ({...state}))
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(100)
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      })
  }

  const handleRemove = (slug) => {
    const answer = window.confirm('Delete ?')
    if (answer) {
      removeProduct(slug, user.token)
        .then(res => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`)
        })
        .catch(err => {
          if(err.response.status === 400 ) toast.error(err.response.data);
          console.log(err)
        })
    }
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ minHeight: 'calc(100vh - 47px)' }}>
        <div className="col-md-2 border border-top-0 border-bottom-0 border-start-o">
          <AdminNav />
        </div>

        <div className="col pt-4 ps-5">
          { loading ? (<h4>Loading ... </h4>) : (<h4>All products</h4>) }
          <div className="row">
            <div className="col-12">
              <div className="row">
                { products.map(product => (
                  <div className='col-md-3 mb-3'>
                    <AdminProductCard
                      product = {product}
                      key={product._id}
                      handleRemove={handleRemove}
                    />
                  </div>)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AllProducts;
