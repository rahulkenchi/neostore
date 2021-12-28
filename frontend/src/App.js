import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './component/Footer';
import NavigationBar from './component/NavigationBar';
import Login from './component/Login';
function App() {

  let a = {
    table: 'table1',
    comments: [{ key: 1 }],
    join: function () { return this.comments.reduce((sum, ele) => sum + ele, 0) }
  }

  return (
    <div >
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
