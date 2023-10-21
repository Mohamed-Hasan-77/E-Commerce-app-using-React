import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import CartContextProvider from "../Context/CartContext";


export default function Layout(  {crrUser, clearUserData}) {
  return (
    <>

    <div className="free  text-white bg-primary fs-6 text-center py-1"> Now for Limited time free shipping on all orders save up to <span className="text-warning fw-bold"> 150$</span> </div>
    <CartContextProvider>  <Navbar clearUserData ={clearUserData}  crrUser = {crrUser}  /> </CartContextProvider>  

      <Outlet />


      {/* <footer    className="p-4 bg-dark shadow  text-white position-relative ">


        <div  className="container d-flex">

              <div className="footHed w-50">
                  <h2 className="fw-bold"> <i class="fa-solid fa-cart-shopping text-primary"></i> Fresh Cart </h2>
                  <p style={{'fontSize': '12px'}} > Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt quaerat accusantium consectetur earum, doloremque necessitatibus eos eligendi porro ab. Ipsum?</p>
              </div>
              <div className=" d-flex justify-content-between align-items-baseline  w-50">
              <div className="inputs d-flex ">
                    <input
                    type="text"
                    className="form-control w-50 "
                    name="email"
                    placeholder="enter your name"
                  />
                  <input
                    type="email"
                    className="form-control w-50  "
                    name="email"
                    placeholder="enter your email"
                  />
                  <button className="btn btn-primary  w-50 ">
                    Send Message
                  </button>
                </div>

          </div>
        </div>


        <div className="container mb-3 mt-3 flex-wrap border-top border-bottom border-white border-2 py-4 d-flex ms-auto justify-content-md-around align-items-center">
          <div className="left">
            <ul className="list-unstyled d-flex mb-0 ">
              <li className="me-3">
                <h6>payment partners</h6>
              </li>
              <li className="me-2">
                <h6>
                  <i class="fa-brands fa-paypal"></i>
                </h6>
              </li>
              <li className="me-2">
                <h6>
                  <i class="fa-solid fa-money-bill"></i>
                </h6>
              </li>
              <li className="me-2">
                <h6>
                  <i class="fa-brands fa-cc-mastercard"></i>
                </h6>
              </li>
            </ul>
          </div>
          <div className="right  d-flex flex-wrap flex-md-nowrap justify-content-space-around align-items-center">
            <h6 className="ms-2"> Get Deliveries with Fresh Cart </h6>
            <button className="btn btn-primary btn-lg mx-md-2 my-2">
              <i class="fa-brands fa-app-store me-2"></i>
              Avilable on App Store
            </button>
            <button className="btn btn-primary btn-lg ">
              <i class="fa-brands fa-google-play me-2"></i>
              Get from Google play
            </button>
          </div>
        </div>
      </footer> */}



<footer style={{'borderTopLeftRadius': '100px', 'borderTopRightRadius': '100px'}} className="bg-dark mt-5 text-white ">
  <div className="container p-5 pb-2 ">
    <div className="row ">
      <div className="col-md-6">
        <div className="d-flex align-items-center">
          <i className="fa-solid fa-cart-shopping  text-primary fs-3 me-2 "></i>
          <h2 className="font-brand"> Fresh Cart Store</h2>
        </div><p className="fst-italic">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde hic voluptatem quaerat tempore dignissimos? Non nesciunt magnam deleniti distinctio ex quas dolorem. Repellendus consectetur, recusandae placeat suscipit eum magni ratione!</p>
      </div>
      <div className="col-md-6">
        <div className="row gy-3">
        <div className="col-lg-4 align-self-end">
          <ul style={{'listStyle': 'none'}} className="m-0 d-flex d-lg-block justify-content-around">
            {/* <li><a href="" className="nav-link badge bg-primary fs-6 my-1"><i className="fa-brands fa-facebook-f"></i> <span className=""> Face Book</span></a></li> */}
            <li><a href="https://github.com/Mohamed-Hasan-77" className="nav-link badge bg-secondary mb-2 fs-6 bg-black text-white py-2 me-2 px-3 "><i className="fa-brands fa-github "></i> <span className=""> GitHub</span></a></li>
            <li><a href="https://www.linkedin.com/in/mohamed-hasan-962a5a204/" className="nav-link badge bg-light text-primary mb-2  fs-6 py-2"><i className="fa-brands fa-linkedin "></i> <span className=""> Linked In</span></a></li>
          </ul>
        </div>
          <div className="col-lg-8 text-center">
            <h2>Contact Us ..</h2>
          <form>
            <div className="row"><div className="col-6">
              <input type="text" placeholder="Name" className="form-control mb-1"/>
                <input type="tel" placeholder="Phone" className="form-control mb-1"/>
                  </div>
                  <div className="col-6"><textarea placeholder="Message"  className="form-control mb-1" rows="1"></textarea>
                    <button type="button" className="btn btn-primary w-100">Send</button>
                  </div>
              </div>
          </form>
          </div>
          </div>
      </div>
    </div>
      <div className="border-bottom border-light "></div>
      <div className="container mt-3">
        <div className="  text-center">
          <div >Copyright © 2023 All Rights Reserved For Route Center</div>
          <div ><p className="text-danger"> Created By <span className="fw-bold"> Mohamed Hasan </span>  </p> </div>
          
        </div>
      </div>
    </div>
  </footer>
      
    </>
  );
}
