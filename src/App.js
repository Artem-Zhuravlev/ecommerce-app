import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./utils/auth";
import {LoadingOutlined} from "@ant-design/icons";

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const History = lazy(() => import("./pages/user/History"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const CategoryCreate = lazy(() => import("./pages/admin/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import("./pages/admin/category/CategoryUpdate"));
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy(() => import("./pages/admin/product/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const CreateCouponPage = lazy(() => import("./pages/admin/coupon/CreateCouponPage"));

const Product = lazy(() => import("./pages/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Card = lazy(() => import("./pages/Card"));
const SideDrawer = lazy(() => import("./components/drawer/SideDrawer"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
          })
          .catch((err) => console.log(err))
      }
    })
    // cleanup
    return () => unsubscribe()
  }, [dispatch]);

  return (
    <Suspense fallback={
      <div className='col text-center p-5'>
        <LoadingOutlined />
      </div>
    }>
      <Header />
      <ToastContainer />
      <SideDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/complete" element={<RegisterComplete />} />
        <Route path="/forgot/password" element={<ForgotPassword />} />
        <Route path="/user/history" element={<UserRoute />}>
          <Route path="/user/history" element={<History />} />
        </Route>
        <Route path="/user/password" element={<UserRoute />}>
          <Route path="/user/password" element={<Password />} />
        </Route>
        <Route path="/user/wishlist" element={<UserRoute />}>
          <Route path="/user/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/admin/dashboard" element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/admin/category" element={<AdminRoute />}>
          <Route path="/admin/category" element={<CategoryCreate />} />
        </Route>
        <Route path="/admin/category" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/category/:slug"
            element={<CategoryUpdate
            />} />
        </Route>
        <Route path="/admin/sub" element={<AdminRoute />}>
          <Route path="/admin/sub" element={<SubCreate />} />
        </Route>
        <Route path="/admin/sub" element={<AdminRoute />}>
          <Route
            exact
            path="/admin/sub/:slug"
            element={<SubUpdate />}
          />
        </Route>
        <Route path="/admin/product" element={<AdminRoute />}>
          <Route path="/admin/product" element={<ProductCreate />} />
        </Route>
        <Route path="/admin/product/:slug" element={<AdminRoute />}>
          <Route path="/admin/product/:slug" element={<ProductUpdate />} />
        </Route>
        <Route path="/admin/products" element={<AdminRoute />}>
          <Route path="/admin/products" element={<AllProducts />} />
        </Route>
        <Route path="/admin/coupon" element={<CreateCouponPage />}>
          <Route path="/admin/coupon" element={<CreateCouponPage />} />
        </Route>

        <Route path="/product/:slug" element={<Product />} />
        <Route path="/category/:slug" element={<CategoryHome />} />
        <Route path="/sub/:slug" element={<SubHome />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Card />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Suspense>
  )
}

export default App;
