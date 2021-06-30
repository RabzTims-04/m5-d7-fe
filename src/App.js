import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { BrowserRouter,Route } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Details from './components/Details';
import AddProduct from './components/AddProduct';

function App() {
  
  return (
    <BrowserRouter>
    <NavBar/>
  
    <Route exact path="/" render={(routerProps)=> <Home {...routerProps} />} />

    <Route exact path="/details/:id" render={(routerProps)=> <Details {...routerProps} />}/>

    <Route exact path="/newProduct" render={(routerProps)=> <AddProduct {...routerProps} />}/>

    <Footer/>
  </BrowserRouter>
  );
}

export default App;
