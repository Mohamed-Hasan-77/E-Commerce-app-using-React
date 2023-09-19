import axios from "axios";

import React, { useRef } from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ForgetPass( {getUserData, crrUser}) {


  // console.log(getUserData());
  // user data


  // from router dom to navigate user to login after register 
  const navigate = useNavigate();

  const userEmail = useRef(null);
  const userRestCode = useRef(null);


  async function forgotPass() {
    // console.log(userEmail.current.value);


    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
      "email": userEmail.current.value
  })
  document.querySelector('.secondForm').style.display = 'block'
    } catch(err) {
      // console.log(err);
      $('.errMsgEmail').fadeIn(1000, function() {
        setTimeout(() => {

          $('.errMsgEmail').fadeOut(500);
        }, 5000);
      });
    }
  }



  async function cofirmCode() {
    try {
      const {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
      "resetCode": userRestCode.current.value
  })
  console.log(data);

  if(data.status == "Success") {

    navigate('/resetpassword')
  }

    } catch(err) {
      // console.log(err);
      $('.errMsgCode').fadeIn(1000, function() {
        setTimeout(() => {

          $('.errMsgCode').fadeOut(500);
        }, 5000);
      });
    }

  }




  return (
    <>

          <Helmet>
                  <title> Login </title>
          </Helmet>


      <div className="container py-5 ">
          <div className="row ">
              <div className="col-md-5 ms-3  border-end border-2 border-dark">

                <h3 className="fw-bold text-primary"> Welcome To Fresh Cart Store </h3>
                <p className="text-secondary mt-4 pe-5"> 
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Maiores in dolores ratione quas deleniti,
                      accusantium inventore facilis blanditiis voluptatibus doloribus cupiditate accusamus
                      dolore deserunt laboriosam cum praesentium ipsum voluptas eius? 
                </p>
              </div>


            <div className="col-md-6 ms-3">

            <h3 className="  ms-0 text-primary fw-bold"> Forgot My Password </h3>


                <div style={{'display':'none'}} className="errMsgEmail alert alert-danger text-center"> Please enter a valid email   </div>

                <form >

                  <label htmlFor="email" className="mb-2 mt-4"> Email </label>

                  <input ref={userEmail}   id="email"   type="email" className="form-control" placeholder="Enter Your Email"     />

                  

                  <button onClick={ forgotPass}  type="submit" className="btn btn-outline-primary mt-4"> send Code  </button>
                </form>


                  <form style={{'display': 'none'}} className="secondForm" >
                        <div style={{'display':'none'}} className="errMsgCode alert alert-danger text-center"> Please enter a valid confirmation code </div>
                      <label htmlFor="email" className="mb-2 mt-4"> Confirmation Code  </label>
                      <input ref={userRestCode}   id="email"   type="text" className="form-control" placeholder="Enter Your Confirmation Code"     />

                      <button onClick={ cofirmCode}  type="submit" className="btn btn-outline-primary mt-4"> confirm Code  </button>
                  </form>
            </div>
          </div>
      </div>
    </>
  );
}
