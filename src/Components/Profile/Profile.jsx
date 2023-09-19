
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../loadingScreen/LoadingScreen';
import $ from 'jquery'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';



export default function Profile({crrUser, clearUserData}) {


const navigate = useNavigate();

function logOutUser() {
  clearUserData();
  navigate('/login');
}

const [userDetail, setUserDetail ]  = useState(null);



async function getUserDetails() {
    
  try {
    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${crrUser.id}` );

  
  setUserDetail(data.data);


  } catch(err) {
    $('.wrong').fadeIn(1000, function() {
    
      setTimeout(() => {
          $('.wrong').fadeOut(1000);
      }, 2000);
      });
  }
}


async function updateUserPassword() {

  document.querySelector('.confirm').classList.remove("fa-circle-check");
  document.querySelector('.confirm').classList.add("fa-spinner");
  document.querySelector('.confirm').classList.add('fa-spin');

  try {
    const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', 
    {
      "currentPassword":document.querySelector('#old').value,
      "password":document.querySelector('#new').value,
      "rePassword":document.querySelector('#rePass').value
  }, {headers: {'token': localStorage.getItem('tkn')}})

    if(data.message == "success") {
      document.querySelector('#old').value = "";
      document.querySelector('#new').value = "";
      document.querySelector('#rePass').value = "";

      $('.successful').fadeIn(1000, function() {
        setTimeout(() => {
            $('.successful').fadeOut(1000);
            logOutUser();
        }, 2000);
        });


    } 

  } catch(err) {

    // console.log(err);

    $('.wrong').fadeIn(1000, function() {
      setTimeout(() => {
          $('.wrong').fadeOut(1000);
      }, 2000);
      });
      document.querySelector('.confirm').classList.remove("fa-spinner");
      document.querySelector('.confirm').classList.remove('fa-spin');
      document.querySelector('.confirm').classList.add("fa-circle-check");
  }

}


async function updateUserData() {

  document.querySelector('.confirmData').classList.remove("fa-circle-check");
  document.querySelector('.confirmData').classList.add("fa-spinner", 'fa-spin');

  try {
    const {data} = await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', 
    {
      "name":document.querySelector('#name').value,
      "email":document.querySelector('#email').value,
      "phone":document.querySelector('#phone').value,
  }, {headers: {'token': localStorage.getItem('tkn')}})


    if(data.message == "success") {
      document.querySelector('#old').value = "";
      document.querySelector('#new').value = "";
      document.querySelector('#rePass').value = "";

      $('.successful').fadeIn(1000, function() {
        setTimeout(() => {
            $('.successful').fadeOut(1000);
            logOutUser();
        }, 2000);
        });

    } 

  } catch(err) {

    // console.log(err);

    $('.wrong').fadeIn(1000, function() {
      setTimeout(() => {
          $('.wrong').fadeOut(1000);
      }, 2000);
      });
      document.querySelector('.confirmData').classList.remove("fa-spinner", 'fa-spin');
      document.querySelector('.confirmData').classList.add("fa-circle-check");
  }

}






// function uploadImage(e, id) {
//   let myImg = e.target.files[0];
//   let imgArr = {};
//   imgArr.userimg = myImg;
//   console.log('myImg: ',imgArr);

//   localStorage.setItem('userImg' , JSON.stringify(myImg));

//   console.log(JSON.parse(localStorage.getItem('userImg')));

//   let uploadedImage = "";
//       const reader =new FileReader();
//       reader.addEventListener("load" , ()=>{
//         uploadedImage = reader.result;
//         document.querySelector('.UserImg').style.cssText = 'background-size: cover; padding: 2px; width: 150px; height: 150px; border-radius: 50%; background-position: center '
//         document.querySelector('.UserImg').style.backgroundImage = `url(${uploadedImage})`
//       });
//       reader.readAsDataURL(myImg);
// }




  useEffect(function() {
    getUserDetails(crrUser._id);
  } , []);



  return <>



  {userDetail?   <div className="container py-5">

  <Helmet>
          <title> {userDetail.name} </title>
  </Helmet>

    <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 successful rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-thumbs-up fa-bounce text-success"></i> Your data has been Successfully updated  </div> 
    <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened  </div>



    <div className="row align-items-end">
        <div className="col-md-4 d-flex flex-column justify-content-center fw-bold">

        <div style={{'width': 'fit-content'}}  className="userIcon w-100 text-center px-5  fs-4"> 
            <img style={{'width': '200px', 'height': '150px'}} className='  img-fluid border-4 ' src={require('../../finalProject assets/images/male-user-placeholder.png')} alt="user Img" />
            <h3 className='mt-3 text-center' >{userDetail.name} </h3>
          </div>

          <div className="list-group" id="list-tab" role="tablist">
            <a className="list-group-item list-group-item-action   active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home"> <i className="fa-solid fa-user me-2"></i>  Account Details</a>
            <a className="list-group-item list-group-item-action  " id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile"><i className="fa-solid fa-gear  me-2"></i>   Account Setting</a>
            <a className="list-group-item list-group-item-action  " id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages"><i className="fa-regular fa-pen-to-square me-2"></i>   Update Data</a>
          </div>
        </div>


        <div className="col-md-8 mt-3">
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active " id="list-home" role="tabpanel" aria-labelledby="list-home-list"> 
              <ul className="list-group">
                  <li className="list-group-item">  Name : {userDetail.name}</li>
                  <li className="list-group-item"> Email : {userDetail.email}</li>
                  <li className="list-group-item">  Phone : {userDetail.phone}</li>
              </ul>
            </div>
            <div className="tab-pane fade  " id="list-profile" role="tabpanel" aria-labelledby="list-profile-list"> 
              <ul className="list-group">
                    <li className="list-group-item">
                      <h4 className=' text-center p-1 bg-dark rounded text-white'> Update Your Password </h4>
                      <form >
                          <label className='mt-3 mb-1' htmlFor="Old"> Old Password  </label>
                          <input className='form-control' type="password" name="Old" id="old" />

                          <label className='mt-3 mb-1' htmlFor="New"> New Password </label>
                          <input className='form-control' type="password" name="New" id="new" />

                          <label className='mt-3 mb-1' htmlFor="RePass">  RePassword </label>
                          <input className='form-control' type="password" name="RePass" id="rePass" />
                          <button type='button' onClick={updateUserPassword}  className='btn btn-primary w-100 mt-4' > <i className=" confirm fa-solid fa-circle-check"></i> <span > Confirm New Password </span>  </button>


                      </form>
                    </li>
                    
                </ul>
            </div>
            <div className="tab-pane fade   " id="list-messages" role="tabpanel" aria-labelledby="list-messages-list"> 
            <ul className="list-group">
                    <li className="list-group-item">
                      <h4 className=' text-center p-1 bg-dark rounded text-white'> Update Your Data </h4>
                      <form >
                          <label className='mt-3 mb-1' htmlFor="name"> Your Name  </label>
                          <input className='form-control' type="text" name="name" id="name" />

                          <label className='mt-3 mb-1' htmlFor="email"> New email </label>
                          <input className='form-control' type="email" name="email" id="email" />

                          <label className='mt-3 mb-1' htmlFor="phone">  New phone Number </label>
                          <input className='form-control' type="text" name="phone" id="phone" />
                          <button type='button' onClick={updateUserData}  className='btn btn-primary w-100 mt-4' > <i className="confirmData fa-solid fa-circle-check"></i> <span > Confirm Data </span>  </button>

                      </form>
                    </li>
                    
                </ul>
            </div>
          </div>
        </div>
    </div>

    
  </div> : <LoadingScreen/>}

  





  </>
  
}
