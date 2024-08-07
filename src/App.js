import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/home/Home';
import { AddProduct } from './pages/addproduct/AddProduct';
import { Addpage } from './pages/addpage/Addpage';
import { Barcode } from './pages/barcode/Barcode';
import { Login } from './pages/login/Login';
import { Order } from './pages/order/Order';
import { PreviewProduct } from './pages/previewproducts/PreviewProduct';
import MyOrder from './pages/order/MyOrder';
import CartView from './pages/cartview/Cartview';
import { Editpage } from './pages/addpage/Editpage';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Location from './pages/location/Location';
import Shopproduct from './pages/shops/Shopproduct';
import { Warehouse } from './pages/barcode/Warehouse';
import { WarehousePage } from './pages/addpage/Wareadd';
import { Message } from './pages/messages/Message';
import Editlocation from './pages/editlocation/Editlocation';
import EditLocationPage from './pages/editlocation/EditLocationPage';

function App() {
  const {user} = useContext(AuthContext)



  return (
    <BrowserRouter>
      {user && <Routes>
        <Route path='/login/' element={<Login/>} />
        <Route path='/chat/' element={<Message/>} />
        <Route path='/addproduct/scan/' element={<Barcode/>} />
        <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>} />
            <Route path='/addproduct/' element={<AddProduct/>} />
            <Route path='/locations/' element={<Location/>} />
            <Route path='/edtilacationpage/'>
              <Route path=':id' element={<EditLocationPage/>} />
            </Route> 

            <Route path='/editlocations/' element={<Editlocation/>} />
            <Route path='/warehouse/' element={<Warehouse/>} />
            <Route path='/addproduct/addpage/'>
              <Route path=':id' element={<Addpage/>} />
            </Route>
            <Route path='/addproduct/editpage/'>
              <Route path=':id' element={<Editpage/>} />
            </Route>
            <Route path='/addproduct/preview/' element={<PreviewProduct/>} />
            <Route path='/orders/' element={<MyOrder/>} />
            <Route path='/orders/single/'>
              <Route path=':id' element={<CartView/>} />
            </Route>
            <Route path='/shop/'>
              <Route path=':id' element={<Shopproduct/>} />
            </Route>
            <Route path='/addwarehouse/'>
              <Route path=':id' element={<WarehousePage/>} />
            </Route>

        </Route>
      </Routes>}
      {!user && <Routes>
        <Route path='/login/' element={<Login/>} />
        <Route path='/addproduct/scan/' element={<Login/>} />
        <Route path='/' element={<Login/>}>
            <Route index element={<Login/>} />
            <Route path='/addproduct/' element={<Login/>} />
            <Route path='/locations/' element={<Location/>} />
            <Route path='/addproduct/addpage/'>
              <Route path=':id' element={<Login/>} />
            </Route>
            <Route path='/addproduct/editpage/'>
              <Route path=':id' element={<Login/>} />
            </Route>
            <Route path='/addproduct/preview/' element={<Login/>} />
            <Route path='/orders/' element={<Login/>} />
            <Route path='/orders/single/'>
              <Route path=':id' element={<Login/>} />
            </Route>
        </Route>
      </Routes>}
    </BrowserRouter>
  );
}

export default App;
