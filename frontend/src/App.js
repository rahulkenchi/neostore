import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './component/Footer';
import NavigationBar from './component/NavigationBar';
import Login from './component/Login';
import Registeration from './component/Registeration';
function App() {

  let a = {
    product: "productname",
    stars: [{ key: 1 }],
    join: function () { return this.stars.reduce((sum, ele) => sum + ele, 0) }
  }

  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Registeration />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
