
import React from 'react'
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
const Home = () => {
  return (
    <>
      <div className='p-5 mb-4 bg-light rounded-3 text-center text-danger'>
        <h1>
          <Jumbotron
            text={['New Arrivals', 'Best sellers', 'Latest Products']}
          />
        </h1>
      </div>
      <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light text-secondary">
        New arrivals
      </h4>
      <NewArrivals />
      <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light text-secondary">
        Best sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light text-secondary">
        Categories
      </h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 mb-5 display-6 bg-light text-secondary">
        Subs
      </h4>
      <SubList />
    </>
  );
}

export default Home
