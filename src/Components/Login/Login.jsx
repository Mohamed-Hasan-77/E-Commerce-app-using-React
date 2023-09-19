import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import $ from 'jquery';
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login( {getUserData, crrUser}) {


  // console.log(getUserData());
  // user data
  let user = {
  email: "",
    password: "",

  };

  // from router dom to navigate user to login after register 
  const navigate = useNavigate();



  if(crrUser !== null ) {
    setTimeout(() => {
      navigate('/home');
    }, 100)
  }



  async function loginUser(userData) {

    // try and catch if you are not sure if there will be an error with api 
    try {
    let { data } = await axios.post( "https://ecommerce.routemisr.com/api/v1/auth/signin", userData );


      // go to login page 
      if(data.message == "success") {
        localStorage.setItem('tkn' , data.token);
        getUserData();

          navigate('/home');

      }
      // catch the error 
    } catch(err) {
      // console.log(err.response);
      $('.errMsg').fadeIn(1000, function() {
        setTimeout(() => {

          $('.errMsg').fadeOut(500);
        }, 5000);
      });

    }

  }


  //  handle form with an object, validation
  let formik = useFormik({
    initialValues: user,
      // when submitting the form this method triggers 
      onSubmit: function (user) {


      // send data and register in api 
      loginUser(user);
    },

    validate: function (values) {
      let errors = {};

      if (
        values.email.includes("@") == false ||
        values.email.includes(".com") == false
      ) {
        errors.email = " email must be valid ";
      }

      if (values.password.length < 4 || values.password.length > 10) {
        errors.password =
          "Minimum eight characters and max 16 ";
      }

      return errors;
    },
  });


  return (
    <>

          <Helmet>
                  <title> Login </title>
          </Helmet>



    <div style={{'display':'none'}} className="loadingScreen text-light justify-content-center align-items-center "> <i class="fa-solid fa-spinner fa-spin"></i> </div>

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

            <h3 className="  ms-0 text-primary fw-bold"> Login </h3>


                <div style={{'display':'none'}} className="errMsg alert alert-danger text-center"> Email or Password is not valid </div>

                <form onSubmit={formik.handleSubmit}>

                  <label htmlFor="email" className="mb-2 mt-4"> Email </label>

                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />

                  {formik.errors.email && formik.touched.email ? ( <div className="alert alert-danger"> {formik.errors.email}</div> ) : ("")}

                  <label htmlFor="password" className="mb-2 mt-4">  password </label>

                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter Your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (<div className="alert alert-danger"> {formik.errors.password}</div>) : ("")}

                  <div className="d-flex mt-4 align-items-center justify-content-between">
                      <button type="submit" className="btn btn-outline-primary "> Login </button>
                      <p className=" text-end"> <Link to="/fogotpassword">  Forgot Password  </Link> </p>
                  </div>
                </form>
            </div>
          </div>
      </div>
    </>
  );
}
