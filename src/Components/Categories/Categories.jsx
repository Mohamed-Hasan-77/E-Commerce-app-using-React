import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from '../loadingScreen/LoadingScreen';
import { Link } from "react-router-dom";
import MainHeading from '../MainHeading/MainHeading';
import { Helmet } from 'react-helmet';
import $ from 'jquery'


export default function Categories() {

    const pageTitle = "Categories";

    const [allCategories, setAllCategories] =  useState(null);

    async function getAllCategories() {

        try{
        const {data} =  await axios.get("https://ecommerce.routemisr.com/api/v1/Categories");
        setAllCategories(data.data);
        } catch(err) {
        // console.log(err);
        $('.wrong').fadeIn(1000, function() {
    
            setTimeout(() => {
                $('.wrong').fadeOut(1000);
            }, 2000);
            });
        }

    }

    useEffect(function() {

        getAllCategories()

    }, [])

    return  <>


                <Helmet>
                        <title> Categories </title>
                </Helmet>
            {allCategories ?   <div className="container mt-5">
            <div style={{'display': 'none', 'zIndex': '10000', 'width': 'fit-content' }}  className=" shadow mb-4 mx-3 wrong rounded px-3 py-2 position-fixed bg-white bottom-0  start-0 text-center "> <i className="fa-solid fa-circle-xmark text-danger"></i> something wrong happened </div>   
                <MainHeading pageCategories = {pageTitle}/>
                <div className="row">

                {allCategories.map(function(Category, idx)  { 
                return <div key={idx} className=" col-md-3 ">
                    <Link className="text-decoration-none" to={`/categoryProducts/${Category._id}`} >
                        <div className="brand mb-5 rounded shadow ">
                            <div  style={{"height" : "250px", "overflow" : 'hidden', "padding":"10px"}}>
                            <img className='w-100' src ={Category.image} alt='brand'/>
                            </div>
                            <h4 className='fw-bold text-center p-2 text-white bg-dark' > {Category.name} </h4>
                        </div>
                        </Link>
                    </div> })}

                    </div>

            </div> : <LoadingScreen/>}

    </>

}
