import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Register() {
  // user data
  let user = {
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: ""
  };

  // from router dom to navigate user to login after register 
  const navigate = useNavigate();


  // Register new user  /////////////////////////////////////////////
  async function registerNewUser(userData) {

    // try and catch if you are not sure if there will be an error with api 
    try {
    let { data } = await axios.post( "https://ecommerce.routemisr.com/api/v1/auth/signup", userData );


      // go to login page 
      if(data.message == "success") {

          navigate('/login');

      }
      // catch the error 
    } catch(err) {
      // console.log(err);

      $('.errMsg').fadeIn(1000, function() {
        setTimeout(() => {

          $('.errMsg').fadeOut(500);
        }, 5000);
      });

    }

  }


  // library to handle form with an object, validation
  let formik = useFormik({
    initialValues: user,
    // when submit the form this method triggers 
    onSubmit: function (user) {

  
      // send data and register in api 
      registerNewUser(user);
    },

    validate: function (values) {
      let errors = {};

      if (values.name.length < 3 || values.name.length > 16) {
        errors.name =
          " user name can not be less than 3 chars and less than 16";
      }

      if (
        values.email.includes("@") == false ||
        values.email.includes(".com") == false
      ) {
        errors.email = " Email must be valid ";
      }

      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = " Phone number is invalid !";
      }

      // pass         !values.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      if (values.password.length < 4 || values.password.length > 16) {
        errors.password =
          "Minimum eight characters and max 16 , at least one uppercase letter, one lowercase letter and one number ";
      }

      if (values.password !== values.rePassword) {
        errors.rePassword = "Passwords does not match!";
      }
      return errors;
    },
  });



  return (
    <>


          <Helmet>
                  <title> Register </title>
          </Helmet>


    <div style={{'display':'none'}} className="loadingScreen text-light justify-content-center align-items-center "> <i class="fa-solid fa-spinner fa-spin"></i> </div>
      <div className="container py-5">
        <h2 className="m-4 ms-0"> Registration Form </h2>


        <div style={{'display':'none'}} className="errMsg alert alert-danger text-center"> Email Already In Use </div>
        
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger"> {formik.errors.name}</div>
          ) : (
            ""
          )}
          <label htmlFor="email" className="mb-2 mt-4">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger"> {formik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="phone" className="mb-2 mt-4">
            {" "}
            Phone{" "}
          </label>
          <input
            id="phone"
            type="text"
            className="form-control"
            placeholder="Enter Your Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger"> {formik.errors.phone}</div>
          ) : (
            ""
          )}
          <label htmlFor="password" className="mb-2 mt-4">
            {" "}
            password{" "}
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter Your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger"> {formik.errors.password}</div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword" className="mb-2 mt-4">
            {" "}
            Confirm password{" "}
          </label>
          <input
            id="rePassword"
            type="password"
            className="form-control"
            placeholder="Confirm password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger">{formik.errors.rePassword}</div>
          ) : (
            ""
          )}
          <button type="submit" className="btn btn-outline-primary mt-4">
            {" "}
            Register{" "}
          </button>
        </form>
      </div>
    </>
  );
}
