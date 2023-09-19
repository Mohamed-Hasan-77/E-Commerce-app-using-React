import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cartContext } from "../Context/CartContext";


export default function Navbar( {crrUser, clearUserData}) {


const {userCartItems} = useContext(cartContext);


  const navigate = useNavigate();

  function logOutUser() {
    clearUserData();
    navigate('./login');
  }



  return (
    <>
      <nav style={{'position': 'sticky', 'top': '0','zIndex': '100', 'backgroundColor': '#ffffffc4', 'backdropFilter': 'blur(2px)'}} className="navbar navbar-expand-lg  shadow  ">
        <div className="container ">
          <Link className="navbar-brand text-black fs-4 fw-bold" to="/home">
            {/* <img src={Logo} alt="freshcart logo" /> */}
            <span className=""> <i className="fa-solid fa-cart-shopping text-primary me-2"></i> Fresh Cart </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-dar navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {crrUser? <>
                <li className={`nav-item navbarActiveL `}>
                    <Link className="nav-link "  aria-current="page" to="/home" > Home</Link> 
                </li>
                <li className="nav-item navbarActiveL">
                    <Link className="nav-link  " to="/brands"> Brands </Link>
                </li>
                <li className="nav-item navbarActiveL">
                    <Link className="nav-link " to="/categories"> Categories </Link>
                </li>
                <li className="nav-item navbarActiveL">
                    <Link className="nav-link  position-relative " to="/cart"> Cart 
                      {userCartItems? <span  className="position-absolute top-0  start-100 translate-middle p-2 bg-danger border border-light rounded-circle "> </span> : ""} 
                    </Link>
                </li>
              
              </> : <>
              <li className={`nav-item navbarActiveL `}>
                    <Link className="nav-link  text-black"  aria-current="page" to="/home" > Home</Link> 
                </li>
                <li className="nav-item navbarActiveL ">
                    <Link className="nav-link text-black" to="/brands"> Brands </Link>
                </li>
                <li className="nav-item navbarActiveL ">
                    <Link className="nav-link text-black" to="/categories"> Categories </Link>
                </li>
              
              </>}
                
            </ul>


              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  {crrUser? <>
                                <li className="nav-item">
                                  
                              </li>

                              <li className="nav-item">
                                  
                                  
                                  <div className="btn-group d-block ">
                                  <button type="button" className="btn p-0  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                  <i className="fa-solid fa-user fw-bold"></i> {crrUser.name}
                                  </button>
                                  <ul className="dropdown-menu">
                                    <li><span className="dropdown-item" > <Link className="text-decoration-none text-black"   to="/profile" >  Profile </Link> </span></li>
                                    {/* <li><span className="dropdown-item " ><Link className="text-decoration-none text-black position-relative "   to="/cart" >  Cart {userCartItems? <span style={{'font-size': '11px'}} className="position-absolute top-0 ms-3 start-100 translate-middle p-2 bg-danger border border-light rounded-circle "> </span> : ""} </Link>  </span></li> */}
                                    <li><span className="dropdown-item" ><Link className="text-decoration-none text-black"   to='/allorders' >  Track orders </Link>   </span></li>
                                    <li><span className="dropdown-item" ><Link className="text-decoration-none text-black"   to="/favorites" >  Wishlist </Link>  </span></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><span className=" dropdown-item" style={{"cursor" : "pointer"}}  onClick={logOutUser}> <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</span> </li>
                                  </ul>
                                </div>


                              </li>
                            </> : <>
                                <li className="nav-item">
                                    <Link className="nav-link active " aria-current="page" to="/login"> Login </Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link " to="/register"> Register </Link>
                                </li>
                            </>}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
