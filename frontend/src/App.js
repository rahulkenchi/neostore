import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './component/Footer';
import NavigationBar from './component/NavigationBar';

function App() {

  let a = {
    table: 'table1',
    comments: [{ key: 1 }],
    join: function () { return this.comments.reduce((sum, ele) => sum + ele, 0) }
  }

  return (
    <div >
      {console.log(a.join())}
      <NavigationBar />
      <Footer />
    </div>
  );
}

export default App;
