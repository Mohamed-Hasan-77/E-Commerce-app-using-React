
import React, { useEffect, useState } from "react";
import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import err from "./finalProject assets/error.svg"
import Brands from "./Components/Brands/Brands";
import ProDetails from "./Components/ProDetails/ProDetails";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import Profile from "./Components/Profile/Profile";
import jwtDecode from "jwt-decode";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import CategoryProducts from "./Components/CategoryProducts/CategoryProducts";
import CartContextProvider from "./Components/Context/CartContext";
import Favorites from "./Components/Favorites/Favorites";
import Payment from './Components/Payment/Payment';
import Orders from './Components/Orders/Orders';
import OrderDetails from "./Components/ordersDetails/OrderDetails";
import { Offline } from "react-detect-offline";
import ForgetPass from "./Components/ForgetPass/ForgetPass";
import UpdatePass from "./Components/UpdatePass/UpdatePass";





export default function App() {

// current User
  const [crrUser, setCrrUser] = useState(null);

  function getUserData() {
    const userData = jwtDecode(localStorage.getItem('tkn'));

    setCrrUser(userData);
  }



  function ProtectedRoute({children}) {

    if(crrUser == null) {

      return <Navigate to='/login' />
    } else {

      return <>
        {children}
      </>
    }
  }





  function clearUserData() {
    localStorage.removeItem("tkn");
    setCrrUser(null);
  }


  useEffect(function() {
    if(localStorage.getItem('tkn') != null && crrUser == null ) {
      getUserData();
    } 
  } ,[]);


  const router = createHashRouter([
    {
      path: "",
      element: <Layout clearUserData= {clearUserData}  crrUser = {crrUser}/>    ,
      children: [
        { path: "home", element: <CartContextProvider> <Home crrUser = {crrUser} /> </CartContextProvider> },
        { path: "/", element: <CartContextProvider> <Home /> </CartContextProvider> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
        { path: "categoryProducts/:id", element: <CategoryProducts /> },
        { path: "profile", element: <ProtectedRoute> <Profile crrUser = {crrUser} clearUserData ={clearUserData} /> </ProtectedRoute>  },
        { path: "payment", element: <ProtectedRoute> <CartContextProvider> <Payment /> </CartContextProvider> </ProtectedRoute>  },
        { path: "brandProducts/:id", element: <BrandProducts /> },
        { path: "favorites", element: <ProtectedRoute> <Favorites  />  </ProtectedRoute>  },
        { path: "OrderDetails", element: <ProtectedRoute> <OrderDetails  />  </ProtectedRoute>  },
        { path: "allorders", element: <ProtectedRoute> <Orders crrUser = {crrUser}  />  </ProtectedRoute>  },
        { path: "Prodetails/:id", element:  <CartContextProvider> <ProDetails crrUser = {crrUser}/> </CartContextProvider>  },
        { path: "cart/", element: <ProtectedRoute> <CartContextProvider> <Cart/> </CartContextProvider> </ProtectedRoute> },
        { path: "login", element: <Login getUserData = {getUserData}  crrUser = {crrUser} /> },
        { path: "fogotpassword", element: <ForgetPass  /> },
        { path: "resetpassword", element: <UpdatePass  /> },
        { path: "register", element: <Register /> },
        {
          path: "*",
          element: (
            <div className=" d-flex vh-100 vw-100 justify-content-center align-items-center">
              <img
                className="img-fluid "
                // src={require("./finalProject assets/error.svg")}
                src={err}
                alt=""
              />
            </div>
          ),
        },
      ],
    },
  ]);

  return (
    <>

      <Offline>

          <div style={{'zIndex': '100000'}} className="errorConnect rounded position-fixed left-0 bottom-0 mb-5 px-4 py-2 fw-bold bg-danger text-white ms-3">
                <i class="fa-solid fa-circle-exclamation fa-shake me-2"></i>
                Connection Error 

          </div>

      </Offline>

      <RouterProvider router={router} />
    </>
  );
}
