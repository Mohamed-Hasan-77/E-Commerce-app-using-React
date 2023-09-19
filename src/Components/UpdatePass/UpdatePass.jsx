import axios from "axios";
import React from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function UpdatePass( ) {


  // console.log(getUserData());
  // user data


  // from router dom to navigate user to login after register 
  const navigate = useNavigate();



  async function updateMyPassword() {

    document.querySelector('.confirm').classList.remove("fa-circle-check");
    document.querySelector('.confirm').classList.add("fa-spinner");
    document.querySelector('.confirm').classList.add('fa-spin');
  
    try {
      const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        "email":document.querySelector('#email').value,
        "newPassword": document.querySelector('#new').value
    })
    // console.log(data);
    
    $('.successful').fadeIn(1000, function() {
      setTimeout(() => {
        $('.successful').fadeOut(1000);
      }, 2000);
    });
    
    navigate('/login');

  
    } catch(err) {
  
      // console.log(err);
  
      $('.errMsg').fadeIn(1000, function() {
        setTimeout(() => {

          $('.errMsg').fadeOut(500);
        }, 5000);
      });

        document.querySelector('.confirm').classList.remove("fa-spinner");
        document.querySelector('.confirm').classList.remove('fa-spin');
        document.querySelector('.confirm').classList.add("fa-circle-check");
    }
  
  }





  return (
    <>

          <Helmet>
                  <title> Reset Password </title>
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

            <h3 className="  ms-0 text-primary fw-bold"> Reset Password </h3>


                <div style={{'display':'none'}} className="errMsg alert alert-danger text-center"> Please enter a valid email or Password  </div>
                <form >
                          <label className='mt-3 mb-1' htmlFor="email"> Email  </label>
                          <input className='form-control' type="email" name="email" id="email" />

                          <label className='mt-3 mb-1' htmlFor="New"> New Password </label>
                          <input className='form-control' type="password" name="New" id="new" />

                          <button type='button' onClick={updateMyPassword}  className='btn btn-primary w-100 mt-4' > <i className=" confirm fa-solid fa-circle-check"></i> <span > Confirm New Password </span>  </button>


                      </form>


                  
            </div>
          </div>
      </div>
    </>
  );
}
