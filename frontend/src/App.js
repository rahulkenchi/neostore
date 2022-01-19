import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Suspense, lazy } from 'react'
import { Spinner } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Footer = lazy(() => import('./component/Footer'));
const NavigationBar = lazy(() => import('./component/NavigationBar'))
const Login = lazy(() => import('./component/Login'))
const Registeration = lazy(() => import('./component/Registeration'))
const RecoverPassword = lazy(() => import('./component/RecoverPassword'));
const Product = lazy(() => import('./component/Product'));
const ChangePassword = lazy(() => import('./component/ChangePassword'));
const MyAccount = lazy(() => import('./component/MyAccount'));
const Profile = lazy(() => import('./component/Profile'));
const AddNewAddress = lazy(() => import('./component/AddNewAddress'));
const Order = lazy(() => import('./component/Order'));
const Checkout = lazy(() => import('./component/Checkout'));
const ErrorBoundary = lazy(() => import('./component/ErrorBoundary'));
const Dashboard = lazy(() => import('./component/Dashboard'))
const ProductDetail = lazy(() => import('./component/ProductDetail'))
const Cart = lazy(() => import("./component/Cart"))
const OrderAddress = lazy(() => import('./component/OrderAddress'))
const Invoice = lazy(() => import('./component/Invoice'))
const Notfound = lazy(() => import('./component/Notfound'))

function App() {
  const loading = <div className="text-center"><Spinner animation="border" /></div>

  return (
    <BrowserRouter>
      <Suspense fallback={loading}><NavigationBar /></Suspense>
      <Suspense fallback={loading}>
        <div className='py-3'>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registeration />} />
            <Route path="/recoverpassword" element={<RecoverPassword />} />
            <Route path="/product" element={<Product />} />
            <Route path="/productdetail" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orderaddress" element={<OrderAddress />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/myaccount" element={<MyAccount />} >
              <Route path="" element={<Profile />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="addnewaddress" element={<AddNewAddress />} />
              <Route path="address" element={<Checkout />} />
              <Route path="order" element={<Order />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </div>
      </Suspense>
      <Suspense fallback={loading}><Footer /></Suspense>
    </BrowserRouter>
  );
}

export default App;
