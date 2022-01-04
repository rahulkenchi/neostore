import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './component/Footer';
import NavigationBar from './component/NavigationBar';
import Login from './component/Login';
import Registeration from './component/Registeration';
import RecoverPassword from './component/RecoverPassword';
import Product from './component/Product';
import ChangePassword from './component/ChangePassword';
function App() {

  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registeration />} />
          <Route path="/recoverpassword" element={<RecoverPassword />} />
          <Route path="/product" element={<Product />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          {/* <Route path="*" element={<ChangePassword />} /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
