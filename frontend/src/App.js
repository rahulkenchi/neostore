import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
const Footer = React.lazy(() => import('./component/Footer'));
const NavigationBar = React.lazy(() => import('./component/NavigationBar'))
const Login = React.lazy(() => import('./component/Login'))
const Registeration = React.lazy(() => import('./component/Registeration'))
const RecoverPassword = React.lazy(() => import('./component/RecoverPassword'));
const Product = React.lazy(() => import('./component/Product'));
const ChangePassword = React.lazy(() => import('./component/ChangePassword'));
const MyAccount = React.lazy(() => import('./component/MyAccount'));
const Profile = React.lazy(() => import('./component/Profile'));
const AddNewAddress = React.lazy(() => import('./component/AddNewAddress'));
const Order = React.lazy(() => import('./component/Order'));
const Checkout = React.lazy(() => import('./component/Checkout'));
const ErrorBoundary = React.lazy(() => import('./component/ErrorBoundary'));
const Dashboard = React.lazy(() => import('./component/Dashboard'))



function App() {

  return (
    <Suspense fallback={<div>Loading2...</div>}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading2...</div>}><NavigationBar /></Suspense>
        <Suspense fallback={<div>Loading2...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registeration />} />
            <Route path="/recoverpassword" element={<RecoverPassword />} />
            <Route path="/product" element={<Product />} />
            <Route path="/myaccount" element={<MyAccount />} >
              <Route path="" element={<Profile />} />
              <Route path="changepassword" element={<ChangePassword />} />
              <Route path="addnewaddress" element={<AddNewAddress />} />
              <Route path="address" element={<Checkout />} />
              <Route path="order" element={<Order />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
            {/* <Route path="*" element={<ChangePassword />} /> */}
          </Routes>
        </Suspense>
        <Suspense fallback={<div>Loading3...</div>}><Footer /></Suspense>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
